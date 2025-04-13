import Breadcrumbs from '@/components/Breadcrumbs'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

const NotFound = () => {
	return (
		<div>
			<Breadcrumbs />
			<div className='h-screen flex flex-col items-center justify-center'>
				<h1 className='text-6xl font-bold text-text-2 mb-4'>404 Not Found</h1>
				<p className='text-lg text-text-2 mb-6'>Your visited page not found. You may go home page.</p>
				<Link to='/'>
					<Button type='primary' danger size='large' className='bg-button-2-bg hover:bg-button-hover-1-bg border-none'>
						Back to home page
					</Button>
				</Link>
			</div>
		</div>
	)
}

export default NotFound
