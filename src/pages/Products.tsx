import Breadcrumbs from '@/components/Breadcrumbs'
import ProductItem from '@/components/ProductItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Products = () => {
	const [products, setProducts] = useState([])
	const getData = async () => {
		const res = await axios.get('https://fakestoreapi.com/products')
		setProducts(res.data)
	}
	useEffect(() => {
		getData()
	}, [])
	return (
		<div className='h-fit'>
			<Breadcrumbs />
			<div className='grid  grid-cols-5 gap-4 p-4'>
				{products.map((item: any) => (
					<div key={item.id} className='mx-auto'>
						<ProductItem  {...item} />
					</div>
				))}
			</div>
		</div>
	)
}

export default Products
