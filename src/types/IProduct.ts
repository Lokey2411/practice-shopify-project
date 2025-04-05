import { ICategory } from './ICategory'

type TSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface IProduct {
	_id: string
	name: string
	categories: ICategory[]
	images: string[]
	price: string
	sizes: TSize[]
	colors: string[]
	description: string
}
