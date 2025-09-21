import { decode } from "next-auth/jwt";
import { cookies } from "next/headers.js"

export const getToken = async() => {
    const encodedToken = (await cookies()).get("next-auth.session-token")?.value;
    const decodedToken = await decode({token: encodedToken, secret: process.env.AUTH_SECRET!});
    return decodedToken?.token;
}