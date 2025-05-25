import React from 'react'
import { HeartOutlined, EyeOutlined } from '@ant-design/icons'
import { Image, notification } from 'antd'
import { IProduct } from '@/types/IProduct'
import { Link } from 'react-router-dom'
import Http from '@/services/Api'

const iconClassName = 'bg-white rounded-full shadow-md hover:bg-gray-100 size-7 cursor-pointer grid place-items-center'

const ProductItem: React.FC<IProduct> = ({ name, price, images, _id }) => {
	const [api, contextHolder] = notification.useNotification();
	const key = `add-to-cart-${_id}`;

	const addToCart = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			api.open({
				key,
				message: 'Adding to cart...',
				description: `Adding ${name} to your cart.`,
			});

			const res = await Http.post('/carts', {
				products: [{ productId: _id, quantity: 1 }],
				price,
				address: ''
			});

			if (res.status !== 200) {
				throw new Error('Error adding to cart');
			}

			api.open({
				key,
				message: 'Added to cart',
				description: `${name} has been added to your cart.`,
			});
		} catch (error) {
			api.open({
				key,
				message: 'Add to cart failed',
				description: (error as Error).message || 'An error occurred.',
			});
		}
	};

	return (
		<Link to={`/detail/${_id}`} className="block">
			{contextHolder}
			<div className="relative">
				<Image src={images?.[0]} alt={name} preview={false} className="rounded-md" />
				<div className="absolute top-2 right-2 flex flex-col gap-1">
					<div className={iconClassName}><HeartOutlined /></div>
					<div className={iconClassName}><EyeOutlined /></div>
				</div>
			</div>
			<h3 className="mt-2 font-semibold">{name}</h3>
			<p className="text-gray-500">{price.toLocaleString()}₫</p>
			<button
				onClick={addToCart}
				className="mt-2 w-full bg-black text-white py-1 rounded hover:opacity-80"
			>
				Add to cart
			</button>
		</Link>
	);
};

export default ProductItem;
