import React from 'react'
import { HeartOutlined, EyeOutlined } from '@ant-design/icons'
import { Image } from 'antd'
import { colors } from '@/commons/colors'

type ProductItemProps = {
	title: string
	price: number
	image: string
}

const ProductItem: React.FC<ProductItemProps> = ({ title, price, image }) => {
	return (
		<div className='max-w-xs sm:w-60 md:w-72 group bg-white rounded-lg shadow-lg p-3'>
			<div className='relative'>
				
				<div className='absolute top-2 right-2 flex flex-col gap-2 z-10'>
					<button aria-label='Like' className='bg-white p-1 rounded-full shadow-md hover:bg-gray-100'>
						<HeartOutlined style={{ fontSize: 20 }} />
					</button>
					<button aria-label='View details' className='bg-white p-1 rounded-full shadow-md hover:bg-gray-100'>
						<EyeOutlined style={{ fontSize: 20 }} />
					</button>
				</div>

				
				<div className='w-full aspect-square'>
					<Image
						width={264}
						height={300}
						preview={false}
						className='w-full h-full object-cover rounded-md'
						src={image}
						alt={title}
						loading='lazy'
					/>
				</div>

				
				<button
					className='absolute bottom-0 left-0 right-0 w-full text-[16px] bg-black p-2 text-white text-2xl font-bold 
          opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300'>
					Add to cart
				</button>
			</div>

			
			<div className='mt-2 text-center'>
				<p className='font-medium line-clamp-2 text-ellipsis my-1 min-h-[50px]'>{title}</p>
				<p className='my-1 text-[16px] font-medium' style={{ color: colors['button-2-bg'] }}>
					{price}$
				</p>
			</div>
		</div>
	)
}

export default ProductItem
