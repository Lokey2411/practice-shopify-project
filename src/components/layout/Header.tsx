import { Badge, Dropdown, Flex, Menu, Select } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined, HeartOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import useNotification from 'antd/es/notification/useNotification';
import { useFetch } from '@/hooks/useFetch';
import { IProduct } from '@/types/IProduct';
const navigationLabels = [
	{ isLogin: true, path: '/', display: 'Home' },
	{ isLogin: true, path: '/contact', display: 'Contact' },
	{ isLogin: true, path: '/products', display: 'Products' },
	{ isLogin: true, path: '/about', display: 'About' },
	{ isLogin: false, path: '/signup', display: 'Sign Up' },
];

const iconClassName = 'text-2xl !text-black';

export default function Header() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [notification, contextHolder] = useNotification();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
	const { data: products } = useFetch<IProduct[]>('/products');
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [cartCount, setCartCount] = useState(0);
	const key = 'updatable';

	useEffect(() => {
		if (searchValue.trim() === '') {
			setFilteredProducts([]);
			setShowDropdown(false);
		} else {
			const filtered = products?.filter(product =>
				product.name.toLowerCase().includes(searchValue.toLowerCase())
			);
			setFilteredProducts(filtered || []);
			setShowDropdown(true);
		}
	}, [searchValue, products]);


	const onChange = (value: string) => {
		navigate(`/detail/${value}`)
	};

	const logout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
		navigate('/login');
		notification.success({
			message: 'Logout Successful',
			description: 'You have successfully logged out.',
		})
	}

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	const navilabel = navigationLabels
		.filter(({ isLogin }) => isLogin === isLoggedIn)



	return (
		<header className="w-full shadow px-6 py-4 z-50 sticky top-0 bg-white">
			{contextHolder}
			<Flex justify="space-between" align="center">
				<div className="flex items-center gap-6">
					<Link to="/" className="text-2xl font-bold text-black">
						Logo
					</Link>
					{navilabel.map((item) => (
						<div>
							<Link
								key={item.path}
								to={item.path}
								className={clsx(
									'text-base text-gray-700 hover:text-blue-600 transition-colors',
									pathname === item.path && 'text-blue-600 font-semibold'
								)}
							>
								{item.display}
							</Link>
						</div>
					))}


				</div>

				{isLoggedIn && (
					<>
						<div className="relative" ref={dropdownRef}>
							<Select
								placeholder="Search books..."
								showSearch
								onChange={onChange}
								optionFilterProp="label"
								className="w-64"
								options={
									products
										? products.map(item => ({
											label: item.name,
											value: item._id,
										}))
										: []
								}
							/>
						</div>

						<div className="flex gap-4 items-center">
							<Link to="/WishList">
								<Badge count={0} showZero>
									<HeartOutlined className={iconClassName} />
								</Badge>
							</Link>
							<Link to="/cart">
								<Badge count={cartCount} showZero>
									<ShoppingCartOutlined className={iconClassName} />
								</Badge>
							</Link>
							<Dropdown
								overlay={
									<Menu>
										<Menu.Item key="profile">
											<Link to="/profile">Profile</Link>
										</Menu.Item>
										<Menu.Item key="logout" onClick={logout}>
											Logout
										</Menu.Item>
									</Menu>
								}
							>
								<div className="cursor-pointer flex items-center gap-1">
									<UserOutlined className={iconClassName} />
									<DownOutlined className="text-sm" />
								</div>
							</Dropdown>
						</div>
					</>
				)}


			</Flex>
		</header>
	);
}
