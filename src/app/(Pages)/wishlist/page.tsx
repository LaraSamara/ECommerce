"use client";
import React from "react";
import { useWishlist } from "../../context/wishlistProvider";
import WishlistProduct from "../../../components/WishlistProduct/WishlistProduct";
import { removeWishlistProduct } from "../../actions/wishlist.action";
import { IProduct } from "../../types/product.type.js";
import toast from "react-hot-toast";

const Page = () => {
    const { products, setProducts } = useWishlist();

    const handleRemoveProduct = async (id: string) => {
        const response = await removeWishlistProduct(id);
        if (response?.status == 200) {
            const newProduct = products.filter(prod => prod._id !== id);
            setProducts(newProduct);
            toast.success("Product Removed Successfully");
        }
    }

    return (
        <div className="bg-gray-200">
            <div className="overflow-hidden rounded-md max-w-[80%] m-auto min-h-[87vh]">
                {products?.length > 0 ? (
                    <div className="grid justify-center gap-4 bg-gray-200 py-10 lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1">
                        {products?.map((product: IProduct) => (
                            <WishlistProduct
                                key={product._id}
                                product={product}
                                handleRemoveProduct={handleRemoveProduct}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10">
                        No products found
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
