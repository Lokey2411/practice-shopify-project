import React, { useContext, useEffect, useMemo, useState } from 'react'
import { ICategory } from './../types/ICategory'
import axios from 'axios'
import Slider from '@/components/Slider'
import ProductSection from '@/components/ProductSection'
import CategoriesSection from '@/components/CategoriesSection'
import { IProduct } from '@/types/IProduct'
import { useNavigate } from 'react-router-dom'
import FeaturesSectionAntd from '@/components/FeaturesSectionAntd'
import CountdownHero from '@/components/CountdownHero'
import { ShopContext } from '@/context/ProductContext'
import { useFetch } from '@/hooks/useFetch'
import { Skeleton } from 'antd'

const Home = () => {
	const {data: products} = useFetch<IProduct[]>('/products');
	const {data: categories} = useFetch<ICategory[]>('/categories')
	const navigate = useNavigate()
	
	const product = useMemo(()=>{
		return products?.slice(0,3) ?? [];
	},[products])
	if(!products || !categories) return<Skeleton active />

	return (
		<div className='!pt-10 !pb-4 !px-app  py-6'>
			<div className='flex justify-between md:flex-row '>
				{/* Category sidebar */}
				<div className='w-64 bg-white border-r-2 border-secondary-text'>
					<h3 className='text-lg font-semibold mb-3'>Danh mục</h3>
					<ul className='space-y-2'>
						{categories.map((item, index) => (
							<li key={index} className='text-gray-700 hover:text-black cursor-pointer'>
								{item.name}
							</li>
						))}
					</ul>
				</div>

				{/* Carousel area */}
				<div className='w-full md:w-5/6 bg-white shadow-md rounded-md overflow-hidden'>
					<Slider />
				</div>
			</div>
			<ProductSection
				title='Flash Sales'
				badge='Today’s'
				showViewAll={true}
				onViewAllClick={() => {
					navigate('/products')
				}}
				products={product}
			/>
			<hr className='my-8' />
			<CategoriesSection categories={categories} selectedCategory={''} onSelect={() => {}} />
			<ProductSection
				title='Best Selling Products'
				badge='This Month'
				showViewAll={true}
				onViewAllClick={() => {
					navigate('/products')
				}}
				products={product}
			/>
			<CountdownHero />
			<ProductSection
				title='Best Selling Products'
				badge='This Month'
				showViewAll={true}
				onViewAllClick={() => {
					navigate('/products')
				}}
				products={product}
			/>
			<FeaturesSectionAntd />
		</div>
	)
}

export default Home
