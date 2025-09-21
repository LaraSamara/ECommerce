"use server";
import axios from "axios";
import { getToken } from "../../lib/token.utils";
import { IOrder } from "../types/order.model";


async function createCashOrder(cartId: string, shippingAddress: IOrder) {
    try {
        const token = await getToken();
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            { shippingAddress },
            {
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

async function createCardOrder(cartId: string, shippingAddress: IOrder) {
    try {
        const token = await getToken();
        const response = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            { shippingAddress },
            {
                headers: { token: token as string }
            });
        return {
            data: response.data.session,
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

export { createCashOrder, createCardOrder };