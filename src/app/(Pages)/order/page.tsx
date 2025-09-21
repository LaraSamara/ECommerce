"use client";
import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form"
import { Input } from '../../../components/ui/input';
import { IOrder } from '../../types/order.model';
import { createCardOrder, createCashOrder } from '../../actions/order.action';
import { useCartContext } from '../../context/cartContext';
import { useRouter } from 'next/navigation.js';
import { Label } from "@/components/ui/label"
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import toast from 'react-hot-toast';

interface Inputs extends IOrder {
}

enum PAYMENT_TYPE {
    CASH = "cash",
    CARD = "card",
}

const page = () => {
    const [paymentType, setPaymentType] = useState<PAYMENT_TYPE>();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();
    const { cartId, setCartProducts } = useCartContext();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (paymentType == PAYMENT_TYPE.CASH) {
            const response = await createCashOrder(cartId, data);
            if (response?.status === 201) {
                setCartProducts([]);
                toast.success("Success...");
                router.push('/');
            }
        } else {
            const response = await createCardOrder(cartId, data);
            console.log("🚀 ~ onSubmit ~ response:", response)
            if (response?.status === 200) {
                window.location.href = response.data.url;
            }
        }
    }

    return (
        <div className='max-w-[50%] m-auto my-10'>
            <h1 className='text-start mb-6 text-3xl font-bold tracking-tighter'>Payment</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="my-3">
                    <Input
                        type="text"
                        placeholder="Details"
                        {...register("details")}
                    />
                    {errors.details && <span className='text-sm text-red-500'>{errors.details.message}</span>}
                </div>

                <div className="my-3">
                    <Input
                        type="text"
                        placeholder="Phone"
                        {...register("phone")}
                    />
                    {errors.phone && <span className='text-sm text-red-500'>{errors.phone.message}</span>}
                </div>

                <div className="my-3">
                    <Input
                        type="text"
                        placeholder="City"
                        {...register("city")}
                    />
                    {errors.city && <span className='text-sm text-red-500'>{errors.city.message}</span>}
                </div>

                <div className="my-3">
                    <RadioGroup onValueChange={(value: PAYMENT_TYPE) => setPaymentType(value)} className='flex gap-4'>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value={PAYMENT_TYPE.CASH} id="cash" />
                            <Label htmlFor="cash">Cash</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value={PAYMENT_TYPE.CARD} id="card" />
                            <Label htmlFor="card">Card</Label>
                        </div>
                    </RadioGroup>
                </div>

                <button className='bg-black text-white rounded-sm py-1 px-3 mt-3 cursor-pointer'>
                    Pay Now
                </button>
            </form>
        </div>
    )
}

export default page;
