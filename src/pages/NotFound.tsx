import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div>
			<Breadcrumbs />
			<div className='h-screen flex flex-col items-center justify-center'>
				<h1 className='text-6xl font-bold text-black mb-4'>404 Not Found</h1>
				<p className='text-lg text-gray-600 mb-6'>Your visited page not found. You may go home page.</p>
				<Link to='/'>
					<Button type='primary' danger size='large' className='bg-red-600 hover:bg-red-700 border-none'>
						Back to home page
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
