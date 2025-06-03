import React from 'react'

import { ICategory } from '@/types/ICategory'

import Badge from './Badge'

type Props = {
	categories: ICategory[]
	selectedCategory: string
	onSelect: (name: string) => void
}

const CategoriesSection: React.FC<Props> = ({ categories, selectedCategory, onSelect }) => {
	const containerRef = React.useRef<HTMLDivElement>(null)
	return (
		<div className='w-full py-4'>
			{/* Header */}
			<div className=' mb-4'>
				<Badge badge='Categories' />
				<div className='flex justify-between gap-3 mt-5'>
					<h2 className='text-4xl font-semibold'>Browse By Category</h2>

					{
						<div className='flex gap-2'>
							<button className='bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition text-sm font-medium'>
								View All
							</button>
						</div>
					}
				</div>
			</div>

			{/* Category List */}
			<div ref={containerRef} className='flex gap-4 overflow-x-auto pb-2 scrollbar-hide'>
				{categories.map(cat => (
					<button
						key={cat.name}
						onClick={() => onSelect(cat.name)}
						className={`w-32 flex flex-col items-center justify-center border rounded-md px-4 py-6 text-sm transition-all
			  ${selectedCategory === cat.name
								? 'bg-red-500 text-white border-red-500'
								: 'bg-white text-black border-gray-300 hover:border-red-400'
							}
			`}>

						<div>{cat.name}</div>
					</button>
				))}
			</div>
		</div>
	)
}

export default CategoriesSection
