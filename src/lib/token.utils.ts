import { decode } from "next-auth/jwt";
import { cookies } from "next/headers.js"

export const getToken = async () => {
    const cookieName = process.env.NEXTAUTH_COOKIE_NAME!;
    const encodedToken = (await cookies()).get(cookieName)?.value;
    const decodedToken = await decode({ token: encodedToken, secret: process.env.AUTH_SECRET! });
    return decodedToken?.token;
}