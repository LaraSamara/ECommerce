"use client";
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from '../../../../components/ui/input';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from 'next-auth/react';
import Link from 'next/link.js';

type Inputs = {
    email: string
    password: string
}

const Page = () => {
    const route = useRouter();
    const schema = z
        .object({
            email: z
                .string()
                .email("Not a valid email")
                .nonempty("Email is required"),
            password: z
                .string()
        });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>({ resolver: zodResolver(schema) });
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });
            if (response?.ok) {
                toast.success("Welcome....");
                route.push("/");
            }
        }
        catch (error: unknown) {
            console.log("🚀 ~ onSubmit ~ error:", error)
        }
    }

    return (
        <div className='max-w-[50%] m-auto my-10'>
            <h1 className='text-start mb-6 text-3xl font-bold tracking-tighter'>Sign In</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <Link href="forgetPassword" className="mt-1">Forget Password</Link>
                </div>

                <button className='bg-black text-white rounded-sm py-1 px-3 mt-3 cursor-pointer'>
                    Sign In
                </button>
            </form>
        </div>
    )
}

export default Page;
