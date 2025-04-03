import React, { useState } from 'react'
import { CiHeart } from 'react-icons/ci'
import { LuEye } from 'react-icons/lu'
const ProductItem = ({ title, price, image }) => {
	const [hover, setHover] = useState(false)
	return (
		<div className='w-[270px] h-[350px]'>
			<div className='relative'>
				<div className='absolute top-2 right-2 flex gap-2'>
					<div className='flex flex-col gap-2'>
						<button className='bg-white p-1 rounded-full shadow-md'>
							<CiHeart size={20} color='black' />
						</button>
						<button className='bg-white p-1 rounded-full shadow-md'>
							<LuEye size={20} color='black' />
						</button>
					</div>
				</div>
				<img
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
					className='w-full h-[250px] object-cover'
					src={image}
					alt=''
				/>
				{hover ? (
					<button className='absolute bottom-0 left-0 right-0 w-full text-[16px] bg-black p-2  text-white text-2xl font-bold'>
						Add to cart
					</button>
				) : (
					''
				)}
			</div>
			<div className='mt-2'>
				<p className='font-medium line-clamp-2 text-ellipsis my-1'>{title}</p>
				<p className='my-1 text-[16px] font-medium text-red-400'>{price}$</p>
			</div>
		</div>
	)
}

export default ProductItem
