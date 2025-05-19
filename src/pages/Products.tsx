import Breadcrumbs from '@/components/Breadcrumbs'
import ProductItem from '@/components/ProductItem'
import { useFetch } from '@/hooks/useFetch'
import { IProduct } from '@/types/IProduct'
import { Link } from 'react-router-dom'

const Products = () => {
	const { data: products } = useFetch<IProduct[]>('/products');
	console.log(products);

	return (
		<div className='h-fit mb-5'>
			<Breadcrumbs />
			<div className='mx-app'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{products?.map(item => (
						
							<ProductItem {...item} />
					
					))}
				</div>
			</div>
		</div>
	)
}

export default Products
