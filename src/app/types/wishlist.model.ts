import { ICategory } from "./category.type";
import { ISubCategory } from "./product.type";

export interface IWishlistProduct {
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
    category: ICategory
    subcategory: ISubCategory[];
    brand: ICategory;
    ratingsAverage: number;
    ratingsQuantity: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
