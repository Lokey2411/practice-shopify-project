import Breadcrumbs from '@/components/Breadcrumbs'
import ProductItem from '@/components/ProductItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {
	const [products, setProducts] = useState<any[]>([])
	const getData = async () => {
		const res = await axios.get('https://fakestoreapi.com/products')
		setProducts(res.data)
	}
	useEffect(() => {
		getData()
	}, [])
	return (
		<div className='h-fit mb-5'>
			<Breadcrumbs />
			<div className='container mx-auto px-4'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{products.map(item => (
						<ProductItem key={item.id} {...item} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Products;
