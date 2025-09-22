"use client";
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from '../../../../components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type Inputs = {
    email: string
}

const Page = () => {
    const route = useRouter();
    const schema = z
        .object({
            email: z
                .string()
                .email("Not a valid email")
                .nonempty("Email is required"),
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", data);
            if (response.status == 200) {
                route.push("/resetCode");
                toast.success("Rest Code sent Successfully..");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message || 'Something happened !!');

            }
        }
    }

    return (
        <div className='max-w-[50%] m-auto my-10'>
            <h1 className='text-start mb-6 text-3xl font-bold tracking-tighter'>Reset Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3">
                    <Input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                    />
                    {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
                </div>

                <button className='bg-black text-white rounded-sm py-1 px-3 mt-3 cursor-pointer'>
                    Reset Password
                </button>
            </form>
        </div>
    )
}

export default Page;
