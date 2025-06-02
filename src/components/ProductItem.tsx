import React from 'react'
import { HeartOutlined, EyeOutlined } from '@ant-design/icons'
import { Image, notification } from 'antd'
import { IProduct } from '@/types/IProduct'
import { Link } from 'react-router-dom'
import Http from '@/services/Api'
import moment from 'moment'

const iconClassName = 'bg-white rounded-full shadow-md hover:bg-gray-100 size-7 cursor-pointer grid place-items-center'

const ProductItem: React.FC<IProduct> = ({
	name,
	price,
	images,
	_id,
	author,
	publisher,
	publishedDate,
	numPage
}) => {
	const [api, contextHolder] = notification.useNotification();
	const key = `add-to-cart-${_id}`;

	const addToCart = async (e: React.MouseEvent) => {
		e.preventDefault();
		try {
			api.open({
				key,
				message: 'Thêm vào giỏ hàng...',
				description: `Thêm ${name} vào giỏ hàng của bạn.`,
			});

			// Gọi API thêm vào giỏ, nếu đã có thì tăng số lượng
			const res = await Http.post('/carts', {
				products: [{ productId: _id, quantity: 1 }], // quantity: 1 mỗi lần nhấn
				price,
				address: ''
			});

			if (res.status !== 200) {
				throw new Error('Lỗi khi thêm vào giỏ hàng ');
			}

			api.open({
				key,
				message: 'Thêm giỏ hàng',
				description: `${name} Đã thêm vào giỏ hàng.`,
			});
		} catch (error) {
			api.error({
				message: 'Failed to add',
				description: 'There was an issue adding the product.',
			});
		}
	};

	return (
		<>
			{contextHolder}
			<Link
				to={`/detail/${_id}`}
				className="bg-white rounded-lg shadow p-4 flex flex-col h-full"
			>
				<div className="relative w-full aspect-[3/4] mb-4 overflow-hidden rounded-md">
					<Image
						src={images?.[0]}
						alt={name}
						preview={false}
						className="w-full h-full object-cover"
					/>
					<div className="absolute top-2 right-2 flex flex-col gap-2">
						<span className={iconClassName}><HeartOutlined /></span>
						<span className={iconClassName}><EyeOutlined /></span>
					</div>
				</div>

				<div className="flex-1 flex flex-col justify-between">
					<div>
						<h3 className="text-base font-semibold text-gray-900 line-clamp-2">{name}</h3>
						<p className="text-sm text-gray-500 mt-1">{author}</p>
						<p className="text-sm text-gray-500">{publisher}</p>
						<p className="text-sm text-gray-500">
							{moment(publishedDate).format('YYYY')} • {numPage} trang
						</p>
					</div>

					<div className="mt-3 flex justify-between items-center">
						<span className="text-lg font-bold text-red-600">{price.toLocaleString()}₫</span>
						<button
							onClick={addToCart}
							className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
						>
							Thêm vào giỏ
						</button>
					</div>
				</div>
			</Link>
		</>
	);
};

export default ProductItem;
