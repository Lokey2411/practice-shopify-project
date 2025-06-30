import { Badge, AutoComplete, Avatar, Dropdown } from 'antd';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
	HeartOutlined,
	ShoppingCartOutlined,
	UserOutlined,
	LogoutOutlined,
	CloseCircleOutlined,
	ShoppingOutlined,
	SearchOutlined,
	MenuOutlined,
	DownOutlined,
} from '@ant-design/icons';
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import useNotification from 'antd/es/notification/useNotification';
import { useFetch } from '@/hooks/useFetch';
import { IProduct } from '@/types/IProduct';
import { useApi } from '@/context/ApiContext';
import { useUser } from '@/context/UserContext';
import CategoryMenu from '@/components/CategoryMenu';

const navigationLabels = [
	{ isLogin: true, path: '/', display: 'Home' },
	{ isLogin: true, path: '/products', display: 'Products' },
	{ isLogin: true, path: '/about', display: 'About' },
	{ isLogin: true, path: '/contact', display: 'Contact' },
	{ isLogin: false, path: '/signup', display: 'Sign Up' },
];

export default function Header() {
	const { pathname } = useLocation();
	const navigate = useNavigate();
	const [notification, contextHolder] = useNotification();
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const { data: products, error, loading } = useFetch<IProduct[]>('/products');
	const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
	const { wishlist, orders, refetchWishlist } = useApi();
	const [showCategoryMenu, setShowCategoryMenu] = useState(false);
	const hideTimeout = useRef<NodeJS.Timeout | null>(null);
	const { cart } = useApi();
	const cartCount = cart.reduce((sum, order) => sum + (Array.isArray(order.products) ? order.products.reduce((sum, product) => sum + (product.quantity || 1), 0) : 0), 0);
	const { user } = useUser();

	console.log('wishlist:', wishlist);
	console.log('orders:', orders);

	const wishlistCount = Array.isArray(wishlist)
		? wishlist.reduce((sum, item) => sum + (item.quantity || 1), 0)
		: 0;
	console.log('wishlist:', wishlist, 'wishlistCount:', wishlistCount);

	useEffect(() => {
		setIsLoggedIn(!!localStorage.getItem('token'));
	}, []);

	useEffect(() => {
		if (error) {
			notification.error({
				message: 'Error Loading Products',
				description: 'Unable to fetch products. Please try again later.',
			});
		}
	}, [error]);

	useEffect(() => {
		if (searchValue.trim() === '') {
			setFilteredProducts([]);
		} else {
			const lowerSearch = searchValue.toLowerCase();
			const filtered = products?.filter((product) =>
				product.name.toLowerCase().includes(lowerSearch) ||
				product.author.toLowerCase().includes(lowerSearch) ||
				(product.publisher && product.publisher.toLowerCase().includes(lowerSearch))
			) || [];
			setFilteredProducts(filtered);
		}
	}, [searchValue, products]);

	const onChange = (value: string) => {
		navigate(`/detail/${value}`);
		setSearchValue('');
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

	const navilabel = navigationLabels.filter(({ isLogin }) => isLogin === isLoggedIn);

	const options =
		filteredProducts.length > 0
			? filteredProducts.map((item) => ({
				label: (
					<div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
							{item.name.charAt(0).toUpperCase()}
						</div>
						<div className="flex-1">
							<div className="font-medium text-gray-900 text-sm">{item.name}</div>
							<div className="text-xs text-gray-500">{item.author}{item.publisher ? ' • ' + item.publisher : ''}</div>
						</div>
					</div>
				),
				value: item._id,
			}))
			: products?.map((item) => ({
				label: (
					<div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
						<div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">
							{item.name.charAt(0).toUpperCase()}
						</div>
						<div className="flex-1">
							<div className="font-medium text-gray-900 text-sm">{item.name}</div>
							<div className="text-xs text-gray-500">{item.author}{item.publisher ? ' • ' + item.publisher : ''}</div>
						</div>
					</div>
				),
				value: item._id,
			})) || [];

	const avatarUrl = user?.avatar
		? user.avatar.startsWith('http')
			? user.avatar
			: `http://localhost:8000${user.avatar}`
		: '/default-avatar.png';

	const handleMouseEnter = () => {
		if (hideTimeout.current) clearTimeout(hideTimeout.current);
		setShowCategoryMenu(true);
	};

	const handleMouseLeave = () => {
		hideTimeout.current = setTimeout(() => setShowCategoryMenu(false), 200);
	};

	const userMenuItems = [
		{
			key: 'profile',
			icon: <UserOutlined className="text-blue-500" />,
			label: 'Quản lý tài khoản',
			onClick: () => navigate('/user/profile'),
		},
		{
			key: 'orders',
			icon: <ShoppingOutlined className="text-green-500" />,
			label: 'Đơn hàng của tôi',
			onClick: () => navigate('/my-orders'),
		},
		{
			key: 'canceled',
			icon: <CloseCircleOutlined className="text-red-500" />,
			label: 'Đơn đã huỷ',
			onClick: () => navigate('/user/orders?status=canceled'),
		},
		{
			type: 'divider' as const,
		},
		{
			key: 'logout',
			icon: <LogoutOutlined className="text-gray-500" />,
			label: 'Đăng xuất',
			onClick: logout,
		},
	];

	return (
		<header className="w-full bg-white/90 shadow border-b border-blue-100 sticky top-0 z-50" style={{ height: '68px' }}>
			{contextHolder}
			<div className="max-w-7xl mx-auto px-4 flex items-center h-full">
				{/* Left: Logo + Slogan */}
				<Link to="/" className="flex items-center gap-2 min-w-[180px]">
					<img
						src="https://th.bing.com/th/id/OIP.A_PLQqVtcpU7IwQbby_POwHaHa?rs=1&pid=ImgDetMain&cb=idpwebpc2"
						alt="logo"
						className="w-12 h-12 rounded-xl shadow border-2 border-blue-200"
					/>
					<div className="flex flex-col">
						<span className="text-xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-wide">
							BookShop
						</span>
						<span className="text-xs text-gray-400 -mt-1">Your Reading Journey</span>
					</div>
				</Link>

				{/* Center: Menu */}
				<nav className="flex-1 flex justify-center items-center gap-1">
					{navilabel.map((item) => (
						<Link
							key={item.path}
							to={item.path}
							className={clsx(
								'px-4 py-2 rounded-full text-base font-medium transition-all duration-200',
								pathname === item.path
									? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow'
									: 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
							)}
						>
							{item.display}
						</Link>
					))}
					{/* Danh mục Dropdown */}
					<div
						className="relative"
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
					>
						<button className="flex items-center gap-2 px-4 py-2 rounded-full font-semibold bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 hover:from-blue-200 hover:to-purple-200 border border-blue-100 shadow-sm">
							<MenuOutlined className="text-base" />
							<span>Danh mục</span>
							<DownOutlined className="text-xs" />
						</button>
						{showCategoryMenu && (
							<div className="absolute left-0 top-full z-50 mt-2 animate-fade-in">
								<CategoryMenu />
							</div>
						)}
					</div>
				</nav>

				{/* Right: Search + User Actions */}
				<div className="flex items-center gap-2 min-w-[320px] justify-end">
					{/* Search Bar */}
					{isLoggedIn && (
						<div className="w-48">
							<AutoComplete
								value={searchValue}
								onChange={setSearchValue}
								onSelect={onChange}
								options={options}
								className="w-full"

								notFoundContent={loading ? 'Loading...' : 'Không tìm thấy kết quả'}
							>
								<div className="relative">
									<input
										className="w-full pl-10 pr-3 py-2 rounded-full border border-blue-100 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-200 bg-white text-sm shadow-sm"
										placeholder="Tìm kiếm..."
									/>
									<SearchOutlined className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 text-base" />
								</div>
							</AutoComplete>
						</div>
					)}
					{/* Wishlist */}
					<Link to="/wishlist" className="relative group">
						<Badge
							count={wishlistCount}
							showZero={false}
							size="small"
							style={{
								backgroundColor: '#ff4d4f',
								color: '#fff',
								boxShadow: '0 0 0 2px #fff',
								fontWeight: 600,
							}}
							offset={[-2, 2]}
						>
							<HeartOutlined className="text-2xl text-pink-500 group-hover:text-pink-600 transition-colors duration-200" />
						</Badge>
					</Link>
					{/* Cart */}
					<Link to="/cart" className="relative group">
						<Badge
							count={cartCount}
							showZero
							size="small"
							style={{
								backgroundColor: '#ff4d4f',
								color: '#fff',
								boxShadow: '0 0 0 2px #fff',
								fontWeight: 600,
							}}
							offset={[-2, 2]}
						>
							<ShoppingCartOutlined className="text-2xl text-blue-500 group-hover:text-blue-600 transition-colors duration-200" />
						</Badge>
					</Link>
					{/* User Avatar & Menu */}
					<Dropdown
						menu={{ items: userMenuItems }}
						placement="bottomRight"
						trigger={['click']}
						overlayClassName="user-dropdown"
					>
						<div className="flex items-center gap-1 cursor-pointer">
							<Avatar
								src={avatarUrl}
								size={36}
								className="border border-blue-100 shadow-sm"
								onError={() => false}
							/>
							<div className="hidden md:block">
								<div className="text-xs font-medium text-gray-700">{user?.name || 'User'}</div>
							</div>
						</div>
					</Dropdown>
				</div>
				{/* Mobile menu button (optional, có thể bổ sung sau nếu cần) */}
			</div>
		</header>
	);
}
