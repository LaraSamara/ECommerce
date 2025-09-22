import { NextRequest, NextResponse } from "next/server.js";

export function middleware(request: NextRequest) {
    const cookieName =  process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";
    const token = request.cookies.get(cookieName)?.value;
    if (!token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/cart/:path*', '/wishlist/:path*']
}