import cartRouter from './cart.route'
import category from './categories.route'
import productRouter from './products.route'
import userRouter from './users.route'
import orderRoute from './orders.route'
import saleRouter from './sales.route'
import sliderRouter from './slider.route'
import reviewRouter from './review.route'

const routes = [
	{
		path: '/carts',
		router: cartRouter,
	},
	{
		path: '/categories',
		router: category,
	},
	{
		path: '/orders',
		router: orderRoute,
	},
	{
		path: '/products',
		router: productRouter,
	},
	{
		path: '/reviews',
		router: reviewRouter,
	},
	{
		path: '/sales',
		router: saleRouter,
	},
	{
		path: '/sliders',
		router: sliderRouter,
	},
	{
		path: '/users',
		router: userRouter,
	},
]
export default routes
