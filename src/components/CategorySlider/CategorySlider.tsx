"use client";
import React from 'react'
import { ICategory } from '../../app/types/category.type';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Category from '../Category/Category';

interface ICategorySliderProps {
    categories: ICategory[]
}

const CategorySlider = ({ categories }: ICategorySliderProps) => {
    return (
        <>
            <div className="max-w-fit m-auto">
                <h2 className='text-center text-5xl font-semibold tracking-tighter pb-3 border-b-2 border-gray-400 mb-6'>Categories</h2>
            </div>
            <Swiper
                slidesPerView={5}
                spaceBetween={20}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {categories.map((category: ICategory) =>
                    <SwiperSlide key={category._id}>
                        <Category category={category} />
                    </SwiperSlide>
                )}

            </Swiper>
        </>
    )
}

export default CategorySlider;
