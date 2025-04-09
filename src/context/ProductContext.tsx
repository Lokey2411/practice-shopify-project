import axios from 'axios'
import { createContext, useEffect, useState } from 'react'
export const ShopContext = createContext()

const ProductContext = ({ children }) => {
	const [categories, setCategories] = useState([])
	const [products, setProducts] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const categoryResponse = await axios.get('https://be-kappa-sand.vercel.app/services/api/categories')
				const productResponse = await axios.get('https://fakestoreapi.com/products')

				setCategories(categoryResponse.data.data)
				setProducts(productResponse.data)
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