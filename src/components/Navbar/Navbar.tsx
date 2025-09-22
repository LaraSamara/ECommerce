"use client";
import React from 'react';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from 'next/link.js';
import { Heart, ShoppingCart, LogOut } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { usePathname } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useCartContext } from '../../app/context/cartContext';
import { useWishlist } from '../../app/context/wishlistProvider';
import { Badge } from '../ui/badge';
import toast from 'react-hot-toast';

const Navbar = () => {
    const pathname = usePathname();
    const session = useSession();
    const { cartProducts } = useCartContext();
    const { products } = useWishlist();
    const active = (route: string) => {
        return pathname == route;
    }

    return (
        <>
            <NavigationMenu className='max-w-full md:flex-row flex-col  mx-auto p-5 flex gap-8 justify-between shadow-sm shadow-gray-400'>
                <NavigationMenuList className='max-w-7xl m-auto'>
                    <NavigationMenuItem className='text-2xl tracking-tighter font-semibold'>E-Commerce</NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList className='flex gap-5'>
                    <NavigationMenuItem>
                        <Link href="/" className={`${active("/") ? "nav-active" : "nav-link"}`}>Home</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/products" className={`${active("/products") ? "nav-active" : "nav-link"}`}>Products</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/categories" className={`${active("/categories") ? "nav-active" : "nav-link"}`}>Categories</Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/brands" className={`${active("/brands") ? "nav-active" : "nav-link"}`}>Brands</Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
                <NavigationMenuList className='flex'>
                    {session.data ? (
                        <>
                            <NavigationMenuItem className='mr-2'>
                                <Link href="/cart">
                                    <div className="relative">
                                        <Badge className="text-md bg-blue-600 text-white  h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute top-[-20px] left-[-8px]">
                                            {cartProducts?.length || 0}
                                        </Badge>
                                        <ShoppingCart className={pathname === "/cart" ? "text-blue-600" : "text-gray-700"} />
                                    </div>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/wishlist">
                                    <div className="relative">
                                        <Badge className="text-md bg-red-600 text-white  h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute top-[-20px] left-[-8px]">
                                            {products?.length || 0}
                                        </Badge>
                                        <Heart className={pathname === "/wishlist" ? "text-red-600" : "text-gray-700"} />
                                    </div>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Button
                                    className='shadow-none cursor-pointer'
                                    onClick={() => {
                                        signOut({ callbackUrl: "/signin" })
                                        toast.success("Success...")
                                    }}
                                >
                                    <LogOut className="text-gray-700" />
                                </Button>
                            </NavigationMenuItem>
                        </>
                    ) : <>
                        <NavigationMenuItem>
                            <Link href="/signup" className='mr-4'> Register</Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                            <Link href="/signin"> Signin </Link>
                        </NavigationMenuItem>
                    </>
                    }
                </NavigationMenuList>
            </NavigationMenu>
        </>
    )
}

export default Navbar;
