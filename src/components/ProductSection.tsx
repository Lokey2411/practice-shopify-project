import React from 'react'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import {  Button } from 'antd'
import { IProduct } from '@/types/IProduct'
import ProductItem from '@/components/ProductItem'
import Badge from './Badge'

type ProductSectionProps = {
	title: string
	badge?: string
	showViewAll?: boolean
	onViewAllClick?: () => void
	products: IProduct[]
}

const ProductSection: React.FC<ProductSectionProps> = ({
	title,
	badge,
	showViewAll = true,
	onViewAllClick,
	products,
}) => {
	return (
		<section className='w-full px-4 py-6'>
			{/* Header */}
			<div className='mb-4'>
				{badge && <Badge badge={badge} />}

				<div className='flex justify-between items-center gap-3'>
					<h2 className='text-2xl sm:text-3xl font-semibold'>{title}</h2>

					<div className='flex gap-2'>
						<Button shape='circle' icon={<ArrowLeftOutlined />} className='arrow-btn' />
						<Button shape='circle' icon={<ArrowRightOutlined />} className='arrow-btn' />
					</div>
				</div>
			</div>

			{/* Product Grid */}
			<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mx-auto'>
				{products.slice(0, 4).map(product => (
					<ProductItem key={product._id} {...product} />
				))}
			</div>

			{/* View All */}
			{showViewAll && (
				<div className='mt-6 flex justify-center'>
					<button
						onClick={onViewAllClick}
						className='bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition text-sm font-medium'>
						View All Products
					</button>
				</div>
			)}
		</section>
	)
}

export default ProductSection
