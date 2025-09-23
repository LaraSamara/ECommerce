import { decode } from "next-auth/jwt";
import { cookies } from "next/headers.js"

export const getToken = async () => {
    const cookieName = process.env.NODE_ENV === "production"
        ? "__Secure-next-auth.session-token"
        : "next-auth.session-token";
    const encodedToken = (await cookies()).get(cookieName)?.value;
    const decodedToken = await decode({ token: encodedToken, secret: process.env.AUTH_SECRET! });
    return decodedToken?.token;
}