import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { getCart } from "../actions/cart.action";
import { ICartProduct } from "../types/cart.type";

interface ICartContextType {
    cartProducts: ICartProduct[];
    totalCartPrice: number;
    cartId: string;
    setCartProducts: React.Dispatch<React.SetStateAction<ICartProduct[]>>;
}

const cartContext = createContext<ICartContextType>({ cartProducts: [], setCartProducts: () => { }, totalCartPrice: 0, cartId: '' });

export default function CartContextProvider({ children }: { children: ReactNode }) {
    const [cartProducts, setCartProducts] = useState<ICartProduct[]>([]);
    const [totalCartPrice, setTotalCartPrice] = useState<number>(0);
    const [cartId, setCartId] = useState<string>('');

    async function fetchCartProducts() {
        const products = await getCart();
        setTotalCartPrice(products?.data.totalCartPrice);
        setCartId(products?.data._id);
        setCartProducts(products?.data.products);
    }

    useEffect(() => {
        fetchCartProducts();
    }, [])


    return (
        <cartContext.Provider value={{ cartProducts, setCartProducts, totalCartPrice, cartId }}>
            {children}
        </cartContext.Provider>
    );
}

export function useCartContext() {
    return useContext(cartContext);
}
