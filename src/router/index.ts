import cartRouter from './cart.route'
import category from './categories.route'
import productRouter from './products.route'
import userRouter from './users.route'

const routes = [
	{
		path: '/users',
		router: userRouter,
	},
	{
		path: '/categories',
		router: category,
	},
	{
		path: '/carts',
		router: cartRouter,
	},
	{
		path: '/products',
		router: productRouter,
	},
]
export default routes
