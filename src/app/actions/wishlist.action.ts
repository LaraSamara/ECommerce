"use server";
import axios from "axios";
import { getToken } from "../../lib/token.utils";


async function getWishlist() {
    try {
        const token = await getToken();
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
            headers: { token: token as string }
        });
        return {
            data: response.data.data,
            message: response.data.message,
            status: response.status,
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                message: error?.response?.data?.message || 'Something happened !!',
                status: error?.response?.status,
                data: [],
            }
        }
    }
}

async function addToWishlist(productId: string) {
    try {
        const token = await getToken();
        const response = await axios.post("https://ecommerce.routemisr.com/api/v1/wishlist",
            { productId },
            {
                headers: { token: token as string },
            }
        );
        return {
            data: response.data.data,
            message: response.data.message,
            status: response.status,
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                message: error?.response?.data?.message || 'Something happened !!',
                status: error?.response?.status,
                data: [],
            }
        }
    }
}

async function removeWishlistProduct(id: string) {
    try {
        const token = await getToken();
        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
            {
                headers: { token: token as string },
            }
        );
        return {
            data: response.data.data,
            message: response.data.message,
            status: response.status,
        }
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            return {
                message: error?.response?.data?.message || 'Something happened !!',
                status: error?.response?.status,
                data: [],
            }
        }
    }
}


export { getWishlist, addToWishlist, removeWishlistProduct };