"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import CartContextProvider from "./cartContext";
import { WishlistProvider } from "./wishlistProvider";
import { Toaster } from "react-hot-toast";

export function AuthProvider({ children }: { children: ReactNode }) {
    return (
        <SessionProvider>
            <CartContextProvider>
                <WishlistProvider>
                    {children}
                </WishlistProvider>
            </CartContextProvider >
            <Toaster />
        </SessionProvider>
    );
}