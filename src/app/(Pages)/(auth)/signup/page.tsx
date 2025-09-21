"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from '../../../../components/ui/input';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

type Inputs = {
    name: string
    email: string
    password: string
    rePassword: string
    phone: string
}

const page = () => {
    const [error, setError] = useState("");
    const route = useRouter();
    const schema = z
        .object({
            name: z
                .string()
                .nonempty("Name is required")
                .min(3, "Name must be at least 3 characters"),
            email: z
                .string()
                .email("Not a valid email")
                .nonempty("Email is required"),
            password: z
                .string()
                .min(6, "Password must be at least 6 characters")
                .max(20, "Password must be at most 20 characters")
                .regex(
                    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&]).{6,20}$/,
                    "Password must contain uppercase, lowercase, number, and special character"
                ),
            rePassword: z.string(),
            phone: z.string().regex(/^\d{10,14}$/, "Phone must be 10 to 14 digits"),
        })
        .refine((data) => data.password === data.rePassword, {
            message: "Passwords do not match",
            path: ["rePassword"],
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", data);
            if (response.data.message == "success") {
                route.push("/signin");
                toast.success("You Registered Successfully..");
            }
            setError(response.data.message);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                setError(error?.response?.data?.message || 'Something happened !!');
                toast.error(error?.response?.data?.message || 'Something happened !!');

            }
        }
    }

    return (
        <div className='max-w-[50%] m-auto my-10'>
            <h1 className='text-start mb-6 text-3xl font-bold tracking-tighter'>Sign Up</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <span className='text-sm text-red-500'>{error}</span>}
                <div className="my-3">
                    <Input
                        type="text"
                        placeholder="Username"
                        {...register("name")}
                    />
                    {errors.name && <span className='text-sm text-red-500'>{errors.name.message}</span>}
                </div>
                <div className="my-3">
                    <Input
                        type="email"
                        placeholder="Email"
                        {...register("email")}
                    />
                    {errors.email && <span className='text-sm text-red-500'>{errors.email.message}</span>}
                </div>

                <div className="my-3">
                    <Input
                        type="password"
                        placeholder="Password"
                        {...register("password")}
                    />
                    {errors.password && <span className='text-sm text-red-500'>{errors.password.message}</span>}
                </div>

                <div className="my-3">
                    <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...register("rePassword")}
                    />
                    {errors.rePassword && <span className='text-sm text-red-500'>{errors.rePassword.message}</span>}
                </div>

                <div className="my-3">
                    <Input
                        type="text"
                        placeholder="Phone Number"
                        {...register("phone")}
                    />
                    {errors.phone && <span className='text-sm text-red-500'>{errors.phone.message}</span>}
                </div>

                <button className='bg-black text-white rounded-sm py-1 px-3 mt-3 cursor-pointer'>
                    Sign Up
                </button>
            </form>
        </div>
    )
}

export default page;
