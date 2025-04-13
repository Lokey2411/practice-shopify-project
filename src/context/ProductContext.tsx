import Http from '@/services/Api'
import { ICategory } from '@/types/ICategory'
import { IProduct } from '@/types/IProduct'
import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
export const ShopContext = createContext()
interface ShopContextType {
	products: IProduct[]
	categories: ICategory[]
  loading: boolean
  }
const ProductContext = ({ children }) => {
	const [categories, setCategories] = useState<ICategory[]>([])
	const [products, setProducts] = useState<IProduct[]>([])
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categoryResponse, productResponse] = await Promise.all([
					Http.get('/categories'),
					Http.get('/products'),
				])

				setCategories(categoryResponse.data.data)
				setProducts(productResponse.data.data)
			} catch (error) {
				console.error('Error fetching data:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchData()
	}, [])

	return <ShopContext.Provider value={{ categories, products, loading }}>{children}</ShopContext.Provider>
}
export default ProductContext;
