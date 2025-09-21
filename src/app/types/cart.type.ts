import { IProduct } from "./product.type.js";

export interface ICartProduct {
	_id: string;
	product: IProduct;
	count: number;
	price: number;
}

export interface ICart {
	_id: string;
	cartOwner: string;
	products: ICartProduct[];
	totalCartPrice: number;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
