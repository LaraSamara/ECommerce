import axios from "axios";

async function getCategories() {
    try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
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

export default getCategories;