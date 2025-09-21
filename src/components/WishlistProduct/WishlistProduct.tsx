"use client";
import React from 'react';
import { ShoppingCart, ZoomIn } from 'lucide-react';
import { IProduct } from '../../app/types/product.type';
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import Image from 'next/image.js';
import Link from 'next/link.js';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { addToCart, getCart } from '../../app/actions/cart.action';
import { useCartContext } from '../../app/context/cartContext';
import toast from 'react-hot-toast';

interface IProductProps {
    product: IProduct;
    handleRemoveProduct: (id: string) => void;
}

const WishlistProduct = ({ handleRemoveProduct, product, }: IProductProps) => {
    const { setCartProducts } = useCartContext();

    const handleAddToWishlist = async () => {
        await addToCart(product._id);
        const products = await getCart();
        setCartProducts(products?.data.products);
        toast.success("Product Added Successfully");
    }

    return (
        <Card className='pt-0 border-0 shadow-none gap-1 relative group overflow-hidden'>
            <div className="absolute z-2 flex flex-col gap-2 transition-right duration-500 right-[-60px] top-8 group-hover:right-8">
                <Button
                    onClick={() => handleRemoveProduct(product._id)}
                    className='cursor-pointer p-1 bg-gray-100 hover:bg-gray-300 transition-color duration-500'>
                    <Badge className="text-2xl  h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">
                        x
                    </Badge>
                </Button>
                <button
                    className='p-1 bg-gray-100 hover:bg-gray-300 transition-color duration-500 cursor-pointer'
                    onClick={handleAddToWishlist}>
                    <ShoppingCart />

                </button>
                <button className='p-1 bg-gray-100 hover:bg-gray-300 transition-color duration-500 cursor-pointer'>
                    <Link href={`/products/${product._id}`}>
                        <ZoomIn />
                    </Link>
                </button>
            </div>
            <CardContent className=''>
                <div className="relative w-full h-[200px] bg-white">
                    <Image
                        src={product.imageCover}
                        alt={product.title}
                        fill
                        className='w-100 object-contain'
                    />
                </div>
            </CardContent>
            <CardFooter className='flex flex-col items-start gap-1 font-medium text-sm'>
                <h3 className='tracking-tight'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                <p className='font-semibold'>{product.price} ILS</p>
            </CardFooter>
        </Card>
    )
}

export default WishlistProduct;
