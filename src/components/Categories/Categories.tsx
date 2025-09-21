import React from 'react';
import getCategories from '../../app/actions/category.action';
import CategorySlider from '../CategorySlider/CategorySlider';

const Categories = async () => {
    const response = await getCategories();

    return (
        <div className='my-10 py-5 max-w-7xl m-auto'>
            <CategorySlider categories={response?.data} />
        </div>
    )
}

export default Categories;
