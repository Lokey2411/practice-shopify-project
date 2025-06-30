import Breadcrumbs from '@/components/Breadcrumbs'
import ProductItem from '@/components/ProductItem'
import { useFetch } from '@/hooks/useFetch'
import { IProduct } from '@/types/IProduct'
import { Link, useLocation } from 'react-router-dom'

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

const Products = () => {
	const { data: products } = useFetch<IProduct[]>('/products');
	const query = useQuery();
	const categoryId = query.get("category");

	// Nếu sản phẩm có trường categories là mảng id
	const filteredProducts = categoryId
		? products?.filter(
			p => Array.isArray(p.categories) && p.categories.some(cat => cat._id?.toString() === categoryId)
		)
		: products;

	// Nếu sản phẩm có trường categories là mảng object:
	// const filteredProducts = categoryId
	//     ? products?.filter(
	//         p => Array.isArray(p.categories) && p.categories.some(cat => cat._id?.toString() === categoryId)
	//     )
	//     : products;

	return (
		<div className='h-fit mb-5'>
			<Breadcrumbs />
			<div className='mx-app'>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
					{filteredProducts?.map(item => (
						<ProductItem key={item._id || item._id} {...item} />
					))}
				</div>
			</div>
		</div>
	)
}

export default Products
