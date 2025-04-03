import { Dropdown, Flex, Input, Menu, MenuProps } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { DownOutlined, HeartOutlined, SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import clsx from 'clsx';

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
		path:'/products',
		display: 'Products',
	},
	{
		path: '/about',
		display: 'About',
	},
	{
		path: '/sign-up',
		display: 'Sign Up',
	},
	
]

const iconClassName = 'text-2xl !text-black'

export default function Header() {
	const { pathname } = useLocation()
	const languageItems: MenuProps['items'] = [
		{
			key: '1',
			label: <Link to='/vi'>Tiếng Việt</Link>,
		},
	]
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
	}))
	return (
		<header className='sticky top-0 inset-x-0 z-50 shadow-md '>
			<Flex className='!py-3 w-full !px-app bg-black' align='center' justify='space-between'>
				<div className='w-25'></div>
				<Flex gap={8} align='center' className=''>
					<p className='text-primary-text text-md'>
						Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
					</p>
					<Link to='/' className='!text-white hover:!text-primary-text  !underline'>
						Shop Now
					</Link>
				</Flex>
				<Dropdown className='text-white w-25 justify-end' menu={{ items: languageItems }}>
					<Flex gap={5}>
						<p>English</p>
						<DownOutlined className='text-white' />
					</Flex>
				</Dropdown>
			</Flex>
			<Flex className='!pt-10 !pb-4 !px-app bg-white' justify='space-between' align='flex-end'>
				<h1 className='font-Inter text-2xl font-bold leading-full cursor-pointer '>Exclusive</h1>
				<div className='self-end'>
					<Menu items={navigationItems} mode='horizontal' color='rgba(0,0,0,0.5)' className='!border-b-0' />
				</div>
				<Flex gap={24} align='center' className='!py-1'>
					<Input
						suffix={<SearchOutlined />}
						placeholder='What are you looking for?'
						classNames={{
							input: 'text-md',
						}}
						className='!bg-secondary-bg'
					/>
					<Flex gap={16} align='center'>
						<Link to='/wishlist' className=''>
							<HeartOutlined className={iconClassName} />
						</Link>
						<Link to='/cart'>
							<ShoppingCartOutlined className={iconClassName} />
						</Link>
					</Flex>
				</Flex>
			</Flex>
		</header>
	)
}
