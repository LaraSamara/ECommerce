"use client";
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image.js';

const MainSwiper = () => {
    return (
        <>
            <Swiper
                spaceBetween={30}
                effect={'fade'}
                navigation={true}
                pagination={{
                    clickable: true,
                }}
                modules={[EffectFade, Navigation, Pagination]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div className="relative w-full h-[510px]">
                        <Image src="/swiper/1.jpg" alt='image 1' fill sizes='100vw' className='object-cover' />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-[510px]">
                        <Image src="/swiper/2.jpg" alt='image 2' fill sizes='100vw' className='object-cover' />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-[510px]">
                        <Image src="/swiper/3.jpg" alt='image 3' fill sizes='100vw' className='object-cover' />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-[510px]">
                        <Image src="/swiper/4.png" alt='image 4' fill sizes='100vw' className='object-cover' />
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative w-full h-[510px]">
                        <Image src="/swiper/5.png" alt='image 5' fill sizes='100vw' className='object-cover' />
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    )
}

export default MainSwiper;
