import { ICategory } from "./category.type";

export interface ISubCategory extends Omit<ICategory, 'image'> {
    category: string;
}

export interface IProduct {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    sold: number;
    imageCover: string;
    images: string[];
    category: ICategory;
    subcategory: ISubCategory[];
    brand: ICategory;
    ratingsAverage: number;
    ratingsQuantity: number;
    createdAt: string;
    updatedAt: string;
}
