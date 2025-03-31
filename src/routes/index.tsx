import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutApp from '@/components/layout/LayoutApp'
import Products from '@/pages/Products'
import About from '@/pages/About'
import PrivateRoute from '@/components/PrivateRoute'
import Cart from '@/pages/Cart'
import WishList from '@/pages/WishList'
import Contact from '@/pages/Contact'

export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<LayoutApp />}>
					<Route
						index
						element={
							<div className='min-h-screen'>
								<h1 className='text-3xl'>Hello</h1>
							</div>
						}
					/>
					<Route path='/products' element={<Products />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/wishlist' element={<WishList />} />
					<Route path='/' element={<PrivateRoute />}>
						<Route path='/cart' element={<Cart />} />
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
