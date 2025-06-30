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
import CheckoutForm from '@/pages/CheckoutForm'
import Wishlist from '@/pages/WishList'
import CheckoutPage from '@/pages/CheckoutForm'
import Orders from '@/components/Order'
import UserProfilePage from '@/pages/Profile';
import UserOrders from '@/pages/UserOrders';
import UserOrderDetail from '@/pages/UserOrderDetail';
import { UserProvider } from '@/context/UserContext'
import ChatWidget from '@/components/ChatWidget'

export default function AppRouter() {
	const userId = "user-id-demo"; // Lấy từ context/auth nếu có
	return (
		<UserProvider>
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
						<Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
						<Route path='/detail/:id' element={<DetailProduct></DetailProduct>} />
						<Route path='*' element={<NotFound />} />
						<Route path="/orders/:id/checkout" element={<CheckoutPage />} />
						<Route path="/checkout" element={<CheckoutForm />} />

						<Route path="/wishlist" element={<Wishlist />} />
						<Route path="/orders/:id" element={<PrivateRoute><Orders /></PrivateRoute>} />
						<Route path='/user/profile' element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />

						{/* User Order Management Routes */}
						<Route path='/user/orders' element={<PrivateRoute><UserOrders /></PrivateRoute>} />
						<Route path='/user/orders/:id' element={<PrivateRoute><UserOrderDetail /></PrivateRoute>} />

					</Route>
				</Routes>
				<ChatWidget userId={userId} />
			</BrowserRouter>
		</UserProvider>
	)
}
