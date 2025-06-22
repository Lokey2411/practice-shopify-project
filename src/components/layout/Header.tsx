import { Badge, Dropdown, Flex, Menu, Select, Button } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	HeartOutlined,
	ShoppingCartOutlined,
	UserOutlined,
	LogoutOutlined,
	CloseCircleOutlined,
	ShoppingOutlined,
} from '@ant-design/icons';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import useNotification from 'antd/es/notification/useNotification';
import { useFetch } from '@/hooks/useFetch';
import { IProduct } from '@/types/IProduct';

const profileControlClassName = 'text-white hover:text-blue-300';

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
	const { data: products, error } = useFetch<IProduct[]>('/products');
	const dropdownRef = useRef<HTMLDivElement>(null);
	const [showDropdown, setShowDropdown] = useState(false);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		if (error) {
			notification.error({
				message: 'Error Loading Products',
				description: 'Unable to fetch products. Please try again later.',
			});
		}
	}, [error, notification]);

	useEffect(() => {
		if (searchValue.trim() === '') {
			setFilteredProducts([]);
			setShowDropdown(false);
		} else {
			const filtered = products?.filter((product) =>
				product.name.toLowerCase().includes(searchValue.toLowerCase())
			);
			setFilteredProducts(filtered || []);
			setShowDropdown(true);
		}
	}, [searchValue, products]);

	const onChange = (value: string) => {
		navigate(`/detail/${value}`);
	};

	const logout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
		navigate('/login');
		notification.success({
			message: 'Logout Successful',
			description: 'You have successfully logged out.',
		});
	};

	useEffect(() => {
		if (localStorage.getItem('token')) {
			setIsLoggedIn(true);
		} else {
			setIsLoggedIn(false);
		}
	}, []);

	const navilabel = navigationLabels.filter(({ isLogin }) => isLogin === isLoggedIn);

	return (
		<header className="w-full shadow px-6 py-4 z-50 sticky top-0 bg-white">
			{contextHolder}
			<Flex justify="space-between" align="center">
				<div className="flex items-center gap-6">
					<Link to="/" className="text-2xl font-bold text-black">
						Logo
					</Link>
					{navilabel.map((item) => (
						<div key={item.path}>
							<Link
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
										? products.map((item) => ({
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
							<div className="size-8 group relative">
								<img
									src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
									alt="avatar"
									className="size-full rounded-full"
									onError={(e) => {
										e.currentTarget.src = 'https://via.placeholder.com/150'; // Fallback nếu ảnh không tải được
									}}
								/>
								<div
									className="absolute top-full rounded shadow-lg hidden group-hover:flex group-hover:animate-fly-in right-0 flex-col gap-4 p-5"
									style={{
										backgroundColor: 'rgba(0, 0, 0, 0.4)',
										backdropFilter: 'blur(150px)',
									}}
								>
									<Button href="/profile" icon={<UserOutlined />} className={profileControlClassName}>
										Manage Account
									</Button>
									<Button
										href="/user/orders"
										onClick={() => navigate('/user/orders')} // Sử dụng navigate thay vì reload
										icon={<ShoppingOutlined />}
										className={profileControlClassName}
									>
										My Order
									</Button>
									<Button
										href="/user/orders?status=canceled"
										onClick={() => navigate('/user/orders?status=canceled')}
										icon={<CloseCircleOutlined />}
										className={profileControlClassName}
									>
										My Cancellations
									</Button>
									<Button
										icon={<LogoutOutlined />}
										className={profileControlClassName}
										onClick={logout}
									>
										Logout
									</Button>
								</div>
							</div>
						</div>
					</>
				)}
			</Flex>
		</header>
	);
}