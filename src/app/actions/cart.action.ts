"use server";
import axios from "axios";
import { getToken } from "../../lib/token.utils";


async function getCart() {
    try {
        const token = await getToken();
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
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

async function addToCart(productId: string) {
    try {
        const token = await getToken();
        const response = await axios.post("https://ecommerce.routemisr.com/api/v1/cart",
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

async function updateCartQuantity(id: string, count: number) {
    try {
        const token = await getToken();
        const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
            { count },
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

async function removeCartProduct(id: string) {
    try {
        const token = await getToken();
        const response = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
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

export { getCart, addToCart, updateCartQuantity, removeCartProduct };