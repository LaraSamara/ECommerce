"use client"
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useCartContext } from '../../context/cartContext';
import { ICartProduct } from '../../types/cart.type';
import Image from 'next/image.js';
import { Button } from '../../../components/ui/button';
import { getCart, removeCartProduct, updateCartQuantity } from '../../actions/cart.action';
import { Badge } from "@/components/ui/badge"
import { useRouter } from 'next/navigation.js';
import toast from 'react-hot-toast';

const Page = () => {
    const { cartProducts, setCartProducts, totalCartPrice } = useCartContext();
    const router = useRouter();

    const handleQuantity = async (id: string, count: number) => {
        const response = await updateCartQuantity(id, count);
        setCartProducts(response?.data.products);
    }

    const handleRemoveProduct = async (id: string) => {
        await removeCartProduct(id);
        const products = await getCart();
        setCartProducts(products?.data.products);
        toast.success("Product Remove Successfully");
    }

    return (
        <div className="overflow-hidden rounded-md max-w-[80%] m-auto my-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className='p-6 text-center font-bold'>Product</TableHead>
                        <TableHead className='p-6 text-center font-bold'>Price</TableHead>
                        <TableHead className='p-6 text-center font-bold'>Quantity</TableHead>
                        <TableHead className='p-6 text-center font-bold'>Subtotal</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {cartProducts?.length > 0 ? (
                        <>
                            {cartProducts?.map((product: ICartProduct) => (
                                <TableRow key={product._id}>
                                    <TableCell className='p-6 text-center font-semibold'>
                                        <div className="flex gap-2 items-center justify-center">
                                            <div className="relative h-[60px] w-[60px]">
                                                <Button
                                                    onClick={() => handleRemoveProduct(product.product._id)}
                                                    className='cursor-pointer absolute z-1 left-[-12px] top-[-14px] p-0 shadow-none'>
                                                    <Badge className=" border border-black bg-black text-white h-5 min-w-5 rounded-full px-1 font-mono tabular-nums hover:text-black hover:bg-white">
                                                        x
                                                    </Badge>
                                                </Button>
                                                <Image
                                                    fill
                                                    src={product.product.imageCover}
                                                    alt={product.product.title}
                                                />
                                            </div>
                                            <div className="">
                                                {product.product.title.split(" ").slice(0, 2).join(" ")}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className='p-6 text-center font-semibold'>{product.price}</TableCell>
                                    <TableCell className='p-6 text-center font-semibold'>
                                        <Button
                                            onClick={() => handleQuantity(product.product._id, product.count + 1)}
                                            className='cursor-pointer border border-gray-700 hover:bg-gray-200 hover:border-gray-700' size="sm">
                                            +
                                        </Button>
                                        <span className='mx-1 text-md'> {product.count} </span>
                                        <Button
                                            onClick={() => handleQuantity(product.product._id, product.count - 1)}
                                            className='cursor-pointer border border-gray-700 hover:bg-gray-200 hover:border-gray-700' size="sm" >
                                            -
                                        </Button>
                                    </TableCell>
                                    <TableCell className='p-6 text-center font-semibold'>
                                        {product.count * product.price}
                                        <span className='font-bold ml-2'>ILS</span>
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className='py-3 bg-gray-200'>
                                <TableCell className="text-center font-medium py-4">
                                    Total Price
                                </TableCell>
                                <TableCell colSpan={2} className="text-center font-medium py-4">
                                    {totalCartPrice} ILS
                                </TableCell>
                                <TableCell colSpan={4} className="text-center font-medium py-4">
                                    <Button
                                        className='bg-black text-white rounded-sm py-1 px-3 mt-3 cursor-pointer'
                                        onClick={() => router.push('/order')}>
                                        Order Now
                                    </Button>
                                </TableCell>
                            </TableRow>
                        </>
                    )
                        : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center font-medium py-4">
                                    Your Cart is Empty :(
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>
        </div>
    )
}

export default Page;
