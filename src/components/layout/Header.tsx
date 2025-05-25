import { Dropdown, Flex, Input, Menu, MenuProps } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { DownOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { FaUserCircle } from 'react-icons/fa';
import clsx from 'clsx';
import { useState, useEffect } from 'react';
import useNotification from 'antd/es/notification/useNotification';
import { useFetch } from '@/hooks/useFetch'
import { IProduct } from '@/types/IProduct'

const navigationLabels = [
	{
		path: '/',
		display: 'Home',
	},
	{
		path: '/contact',
		display: 'Contact',
	},
	{
		path: '/products',
		display: 'Products',
	},
	{
		path: '/about',
		display: 'About',
	},
	{
		path: '/signup',
		display: 'Sign Up',
	},
];

const iconClassName = 'text-2xl !text-black';

export default function Header() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [notification, contextHolder] = useNotification();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const { data: products } = useFetch<IProduct[]>(`/products?name=${encodeURIComponent(searchValue)}`);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setIsLoggedIn(true);
		}
	}, []);

	const handleLogout = () => {
		localStorage.removeItem('token');
		setIsLoggedIn(false);
		notification.success({
			message: 'Logout successful',
			description: 'You have been logged out. Redirecting to login...',
		});
		setTimeout(() => {
			navigate('/login');
		}, 2000);
	};

	const languageItems: MenuProps['items'] = [
		{
			key: '1',
			label: <Link to="/vi">Tiếng Việt</Link>,
		},
	];

	const navigationItems: MenuProps['items'] = navigationLabels.map(item => ({
		key: item.path,
		label: (
			<Link to={item.path} className={'text-base'}>
				{item.display}
			</Link>
		),
		className: clsx('hover:after:!border-[rgba(0,0,0,0.5)]', {
			'after:!border-[rgba(0,0,0,0.5)]': pathname === item.path,
		}),
	}));

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);
	};
	const userMenuItems: MenuProps['items'] = [
		...(isLoggedIn
			? [
				{
					key: '1',
					label: <Link to="/profile">Profile</Link>,
				},
				{
					key: '2',
					label: <span onClick={handleLogout}>Logout</span>,
				},

				{
					key: '3',
					label: <Link to="/orders">Orders</Link>,
				},
			]
			: [
				{
					key: '3',
					label: <Link to="/login">Login</Link>,
				},
				{
					key: '4',
					label: <Link to="/signup">Sign Up</Link>,
				},
			]),
	];

	return (
		<header className="sticky top-0 inset-x-0 z-50 shadow-md">
			{contextHolder}
			<Flex className="!py-3 w-full !px-app bg-black" align="center" justify="space-between">
				<div className="w-25"></div>
				<Flex gap={8} align="center" className="">
					<p className="text-primary-text text-md">
						Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
					</p>
					<Link to="/" className="!text-white hover:!text-primary-text !underline">
						Shop Now
					</Link>
				</Flex>
				<Dropdown className="text-white w-25 justify-end" menu={{ items: languageItems }}>
					<Flex gap={5}>
						<p>English</p>
						<DownOutlined className="text-white" />
					</Flex>
				</Dropdown>
			</Flex>
			<Flex className="!pt-10 !pb-4 !px-app bg-white" justify="space-between" align="flex-end">
				<h1 className="font-Inter text-2xl font-bold leading-full cursor-pointer">BookStore</h1>
				<div className="self-end">
					<Menu items={navigationItems} mode="horizontal" color="rgba(0,0,0,0.5)" className="!border-b-0" />
				</div>
				<Flex gap={24} align="center" className="!py-1">
					<div style={{ position: 'relative', width: '100%' }}>
						<Input
							suffix={<SearchOutlined />}
							placeholder="What are you looking for?"
							classNames={{
								input: 'text-md',
							}}
							className="!bg-secondary-bg"
							value={searchValue}
							onChange={handleSearchChange}
							onBlur={() => setSearchValue('')}
						/>
						{products && products.length > 0 && searchValue && (
							<div
								style={{
									position: 'absolute',
									top: '100%',
									left: 0,
									right: 0,
									background: 'white',
									border: '1px solid #eee',
									zIndex: 100,
									maxHeight: 300,
									overflowY: 'auto',
									boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
								}}
							>
								{products.map((product: IProduct) => (
									<Link
										key={product._id}
										to={`/detail/${product._id}`}
										style={{
											display: 'block',
											padding: '8px 16px',
											color: '#333',
											textDecoration: 'none',
										}}
									>
										{product.name}
									</Link>
								))}
							</div>
						)}
					</div>
					<Flex gap={16} align="center">
						<Link to="/wishlist" className="">
							<HeartOutlined className={iconClassName} />
						</Link>
						<Link to="/cart">
							<ShoppingCartOutlined className={iconClassName} />
						</Link>
						<Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
							<Flex onClick={(e) => e.preventDefault()} className="cursor-pointer">
								<FaUserCircle
									className={clsx(
										iconClassName,
										'rounded-full transition-all duration-300 hover:text-blue-500 hover:shadow-md',
										{
											'text-blue-500': isLoggedIn, // Màu xanh dương khi đăng nhập
											'text-black': !isLoggedIn, // Màu đen khi đăng xuất
										}
									)}
								/>
							</Flex>
						</Dropdown>
					</Flex>
				</Flex>
			</Flex>
		</header>
	);
}