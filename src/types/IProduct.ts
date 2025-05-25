import { ICategory } from './ICategory'


export interface IProduct {
	_id: string;
	name: string;
	categories: ICategory[];
	images: string[];
	price: string;
	isDeleted: boolean;
	createdAt: string;
	updatedAt: string;
	author: string;
	numPage: number;
	publishedDate: string;
	publisher: string;
}
