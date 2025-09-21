"use client";
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { getProducts } from '../../app/actions/product.action'
import Product from '../Product/Product';
import { IProduct } from '../../app/types/product.type';

const Products = () => {
    const [search, setSearch] = useState<string>("");
    const [products, setProducts] = useState<IProduct[]>([]);
    const [AllProducts, setAllProducts] = useState<IProduct[]>([]);

    const fetchProducts = async () => {
        const response = await getProducts();
        setAllProducts(response?.data);
    }

    useEffect(() => {
        const newProducts = AllProducts.filter((p: IProduct) =>
            p.title.includes(search) || p.description.includes(search));
        setProducts(newProducts);
    }, [search, AllProducts]);

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className='bg-gray-50 py-3'>
            <div className="max-w-[50%] m-auto my-12">
                <Input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)} placeholder="Type to Search..." />
            </div>
            <div className="grid grid-cols-4 gap-2 max-w-[85%] m-auto">
                {products.map((product: IProduct) =>
                    <Product
                        key={product.id}
                        product={product}
                    />)}
            </div>
        </div>
    )
}

export default Products
