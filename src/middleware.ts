import { NextRequest, NextResponse } from "next/server.js";

export function middleware(request: NextRequest) {
    const token = request.cookies.get("next-auth.session-token")?.value;
    if(!token) {
        return NextResponse.redirect(new URL('/signin', request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: ['/cart/:path*', '/wishlist/:path*']
}