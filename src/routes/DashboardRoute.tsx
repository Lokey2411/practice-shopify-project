import { ThemedLayoutV2, ThemedSiderV2 } from '@refinedev/antd'
import { NavigateToResource } from '@refinedev/react-router'
import { Outlet, Route, Routes } from 'react-router'
import { CategoryCreate, CategoryEdit, CategoryList, CategoryShow } from '../pages/categories'
import { UserCreate, UserEdit, UserList, UserShow } from '../pages/users'
import { ErrorComponent } from '@refinedev/core'
import { Header } from '@/components'
import { ProductCreate, ProductEdit, ProductList, ProductShow } from '@/pages/products'
import { SliderList, SliderCreate, SliderEdit, SliderShow } from '@/pages/sliders'
import { OrderList, OrderShow } from '@/pages/orders'

const DashboardRoute = () => {
	return (
		<Routes>
			<Route
				element={
					<ThemedLayoutV2 Header={() => <Header />} Sider={props => <ThemedSiderV2 {...props} fixed />}>
						<Outlet />
					</ThemedLayoutV2>
				}>
				<Route index element={<NavigateToResource resource='categories' />} />
				<Route path='/categories'>
					<Route index element={<CategoryList />} />
					<Route path='create' element={<CategoryCreate />} />
					<Route path='edit/:id' element={<CategoryEdit />} />
					<Route path='show/:id' element={<CategoryShow />} />
				</Route>
				<Route path='/products'>
					<Route index element={<ProductList />} />
					<Route path='create' element={<ProductCreate />} />
					<Route path='edit/:id' element={<ProductEdit />} />
					<Route path='show/:id' element={<ProductShow />} />
				</Route>
				<Route path='/users'>
					<Route index element={<UserList />} />
					<Route path='create' element={<UserCreate />} />
					<Route path='edit/:id' element={<UserEdit />} />
					<Route path='show/:id' element={<UserShow />} />
				</Route>
				<Route path='/sliders'>
					<Route index element={<SliderList />} />
					<Route path='create' element={<SliderCreate />} />
					<Route path='edit/:id' element={<SliderEdit />} />
					<Route path='show/:id' element={<SliderShow />} />
				</Route>
				<Route path='/orders'>
					<Route index element={<OrderList />} />
					<Route path='show/:id' element={<OrderShow />} />
				</Route>

				<Route path='*' element={<ErrorComponent />} />
			</Route>
		</Routes>
	)
}

export default DashboardRoute
