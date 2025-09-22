import React from 'react';
import getCategories from '../../actions/category.action';
import Category from '../../../components/Category/Category';
import { ICategory } from '../../types/category.type';

const Page = async () => {
    const categories = await getCategories();

    return (
        <div className='grid gap-4 my-10 max-w-[85%] m-auto lg:grid-cols-4 sm:grid-cols-2 xs:grid-cols-1'>
            {categories?.data?.map((category: ICategory) =>
                <div key={category._id} className='flex flex-col justify-center items-center'>
                    <Category category={category} />
                </div>
            )}

        </div>
    )
}

export default Page;
