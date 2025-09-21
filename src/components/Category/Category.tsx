import Image from 'next/image.js';
import React from 'react';
import { ICategory } from '../../app/types/category.type';

interface ICategoryProps {
    category: ICategory
}

const Category = ({category}: ICategoryProps) => {
    return (
        <>
            <div className="relative w-full h-[250px]">
                <Image
                    src={category.image}
                    alt={category.name}
                    className='object-fill'
                    priority
                    loading='eager'
                    fill
                    sizes='100vw'
                />
            </div>
            <p className='text-center text-xl font-semibold tracking-tighter pt-2'>
                {category.name}
            </p>
        </>
    )
}

export default Category;
