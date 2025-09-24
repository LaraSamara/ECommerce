"use client";
import { getWishlist } from "../actions/wishlist.action";
import { createContext, useContext, useEffect, useState } from "react";
import { IProduct } from "../types/product.type";
import { useSession } from "next-auth/react";

interface IWishlistContextType {
    products: IProduct[];
    setProducts: React.Dispatch<React.SetStateAction<IProduct[]>>;
}

export const wishListContext = createContext<IWishlistContextType>({ products: [], setProducts: () => { } });

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const { data: session } = useSession();

    const handleWishlist = async () => {
        const response = await getWishlist();
        setProducts(response?.data);
    }

    useEffect(() => {
        handleWishlist();
    }, [session]);

    return (
        <wishListContext.Provider value={{ products, setProducts }}>
            {children}
        </wishListContext.Provider>
    )
}

export function useWishlist() {
    return useContext(wishListContext);
}