"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from '../../../../components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from 'next-auth/react';
import Link from 'next/link.js';

type Inputs = {
    resetCode: string;
}

const page = () => {
    const route = useRouter();
    const schema = z
        .object({
            resetCode: z
                .string()
                .nonempty("Reset Code is required"),
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data);
            if (response.status == 200) {
                route.push("/resetPassword");
                toast.success("Passed Successfully ..");
            }
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                toast.error(error?.response?.data?.message || 'Something happened !!');

            }
        }
    }

    return (
        <div className='max-w-[50%] m-auto my-10'>
            <h1 className='text-start mb-6 text-3xl font-bold tracking-tighter'>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3">
                    <Input
                        type="text"
                        placeholder="Reset Code"
                        {...register("resetCode")}
                    />
                    {errors.resetCode && <span className='text-sm text-red-500'>{errors.resetCode.message}</span>}
                </div>

                <button className='bg-black text-white rounded-sm py-1 px-3 mt-3 cursor-pointer'>
                    Reset Password
                </button>
            </form>
        </div>
    )
}

export default page;
