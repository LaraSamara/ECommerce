"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IProductDetails } from '../../app/types/productDetails.model';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image.js';
import { StarRating } from 'react-flexible-star-rating';
import toast from 'react-hot-toast';
import { useCartContext } from '../../app/context/cartContext';
import { addToCart, getCart } from '../../app/actions/cart.action';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation.js';

interface IProductDetailsProps {
    productDetails: IProductDetails
}

const ProductDetails = ({ productDetails }: IProductDetailsProps) => {
    const { setCartProducts } = useCartContext();
    const session = useSession();
    const router = useRouter();

    const handleAddToCart = async () => {
        if (!session.data) {
            router.push('/login')
        } else {
            await addToCart(productDetails._id);
            const products = await getCart();
            setCartProducts(products?.data.products);
            toast.success("Product Added Successfully");
        }
    }
    return (
        <div className='max-w-[80%] m-auto flex justify-between items-start py-10 my-10'>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper w-[50%]"
            >
                {productDetails?.images.map((image: string) =>
                    <SwiperSlide key={image}>
                        <div className="relative w-full h-[300px] bg-white">
                            <Image
                                src={image}
                                alt={image}
                                fill
                                className='w-100 object-contain'
                            />
                        </div>
                    </SwiperSlide>
                )}

            </Swiper>
            <div className="w-[40%] flex flex-col gap-2 text-lg">
                <h3 className='tracking-tight'>{productDetails.title}</h3>
                <p className='text-sm text-gray-400'>{productDetails.description}</p>
                <p className='mt-3'>{productDetails.category.name}</p>
                <div className="flex justify-between">
                    <p className='font-semibold'>{productDetails.price} ILS</p>
                    <div className="flex gap-2">
                        <p className='font-semibold'>{productDetails.ratingsAverage}</p>
                        <StarRating initialRating={Math.floor(productDetails.ratingsAverage)} dimension={5} />
                    </div>
                </div>
                <button onClick={handleAddToCart} className='bg-green-500 text-white rounded-sm py-1 cursor-pointer'>Add To Cart</button>
            </div>
        </div>
    )
}

export default ProductDetails
