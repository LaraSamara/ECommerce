"use client"
import React from 'react';
import { Heart, ShoppingCart, ZoomIn } from 'lucide-react';
import { IProduct } from '../../app/types/product.type';
import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import Image from 'next/image.js';
import { StarRating } from 'react-flexible-star-rating';
import Link from 'next/link.js';
import { addToCart, getCart } from '../../app/actions/cart.action';
import { useCartContext } from '../../app/context/cartContext';
import { addToWishlist } from '../../app/actions/wishlist.action';
import { useWishlist } from '../../app/context/wishlistProvider';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation.js';

interface IProductProps {
    product: IProduct;
}

const Product = ({ product }: IProductProps) => {
    const { products, setProducts } = useWishlist();
    const { setCartProducts } = useCartContext();
    const session = useSession();
    const router = useRouter();

    const handleAddToCart = async () => {
        if (!session.data) {
            router.push('/login')
        } else {
            await addToCart(product._id);
            const products = await getCart();
            setCartProducts(products?.data.products);
            toast.success("Product Added Successfully");
        }
    }

    const handleAddToWishlist = async () => {
        if (!session.data) {
            router.push('/login')
        } else {
            await addToWishlist(product._id);
            const newWishlist = [...products, product];
            setProducts(newWishlist);
            toast.success("Product Added Successfully");
        }
    }

    return (
        <Card className='pt-0 border-0 shadow-none gap-1 relative group overflow-hidden'>
            <div className="absolute z-2 flex flex-col gap-2 transition-right duration-500 right-[-60px] top-8 group-hover:right-8">
                <button className='p-1 bg-gray-100 hover:bg-gray-300 transition-color duration-500 cursor-pointer'
                    onClick={handleAddToWishlist}
                >
                    <Heart
                        fill={products.find(p => p._id == product.id) ? "red" : "transparent"}
                        color={products.find(p => p._id == product.id) ? "red" : "black"}
                    />
                </button>
                <button
                    className='p-1 bg-gray-100 hover:bg-gray-300 transition-color duration-500 cursor-pointer'
                    onClick={handleAddToCart}>
                    <ShoppingCart
                    />

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
                <p className='text-xs text-gray-400'>{product.description.split(" ").slice(0, 4).join(" ")}</p>
                <StarRating initialRating={Math.floor(product.ratingsAverage)} dimension={5} />
                <p className='font-semibold'>{product.price} ILS</p>
            </CardFooter>
        </Card>
    )
}

export default Product;
