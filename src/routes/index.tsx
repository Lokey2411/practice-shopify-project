import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutApp from '@/components/layout/LayoutApp'
import Products from '@/pages/Products'
import About from '@/pages/About'
import PrivateRoute from '@/components/PrivateRoute'
import Cart from '@/pages/Cart'
import WishList from '@/pages/WishList'
import Contact from '@/pages/Contact'
import Signup from '@/pages/Signup'
import NotFound from '@/pages/NotFound'
import Login from '@/pages/Login'
import Home from '@/pages/Home'
import DetailProduct from '@/pages/DetailProduct'
import Profile from '@/pages/Profile'
import CheckoutForm from '@/pages/CheckoutForm'


export default function AppRouter() {
	return (
		<BrowserRouter>
			<Routes>

				<Route path='/' element={<LayoutApp />}>
					<Route
						index
						element={
							<Home />
						}
					/>
					<Route path='/products' element={<Products />} />
					<Route path='/about' element={<About />} />
					<Route path='/contact' element={<Contact />} />
					<Route path='/wishlist' element={<WishList />} />
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
					<Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
					<Route path='/detail/:id' element={<DetailProduct></DetailProduct>} />
					<Route path='*' element={<NotFound />} />
					<Route path="/checkout" element={<CheckoutForm />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}
