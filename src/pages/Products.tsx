import Breadcrumbs from '@/components/Breadcrumbs'
import ProductItem from '@/components/ProductItem'
import { IProduct } from '@/types/IProduct'
import axios from 'axios'
import { useEffect, useState } from 'react'

const Products = () => {
	const [products, setProducts] = useState<IProduct[]>([])
	const getData = async () => {
		const res = await axios.get('https://fakestoreapi.com/products')
		setProducts(
			res.data.map((data: any) => ({
				images: [data.image],
				name: data.title,
				_id: data.id,
				price: `${data.price}`,
				categories: [],
				sizes: [],
				colors: [],
				description: data.description,
			})),
		)
	}
	useEffect(() => {
		getData()
	}, [])
	return (
		<div className='h-fit mb-5'>
			<Breadcrumbs />
			<div className='mx-app'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{products.map(item => (
						<ProductItem key={item._id} {...item} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Products
