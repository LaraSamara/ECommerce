import React from 'react'
import { getProductDetails } from '../../../actions/product.action';
import { IProductDetails } from '../../../types/productDetails.model';
import ProductDetails from '../../../../components/ProductDetails/ProductDetails';

const page = async ({ params }: { params: { id: string } }) => {
    const { id } = await params;
    const product = await getProductDetails(id)

    return (
        <div>
            <ProductDetails productDetails={product?.data as IProductDetails} />
        </div>
    )
}

export default page
