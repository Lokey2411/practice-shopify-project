import { Image } from 'antd'
import login from '@/assets/images/login.jpg'
import { GoogleOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import Breadcrumbs from '@/components/Breadcrumbs'
const Signup = () => {
	return (
		<div>
			<Breadcrumbs />
			<div className='px-app py-6'>
				<div className='flex justify-between items-center gap-10'>
					<div className='flex-2'>
						<Image src={login} alt='Signup' preview={false} sizes='full' className='object-cover' />
					</div>
					<div className='flex flex-1 flex-col gap-6'>
						<h1 className='text-3xl font-medium'>Create an account</h1>
						<p>Enter your details below</p>
						<form action='' className='flex flex-col gap-y-6'>
							<input placeholder='Your Name *' className='border-b w-full py-2 ' type='text' required />
							<input placeholder='Your Email or Phone Number' className='border-b w-full py-2 ' type='email' required />
							<input placeholder='Your Password *' className='border-b w-full py-2 ' type='password' required />
							<div className='flex flex-col gap-4 mt-2'>
								<button className='bg-button-2-bg cursor-pointer text-white px-6 py-3 rounded hover:bg-button-hover-1-bg transition text-sm font-medium'>
									Create an account
								</button>
								<div className='flex items-center justify-center gap-6 cursor-pointer bg-white text-text-2 px-6 py-3 rounded transition text-sm font-medium border border-gray-300'>
									<GoogleOutlined style={{ color: 'red', fontSize: 20 }} />
									<p>Sign up with Google</p>
								</div>
							</div>
						</form>
						<div className='flex items-center justify-center gap-2 mt-4'>
							<p className='text-center text-text-2'>Already have an account?</p>{' '}
							<Link to={'/login'} className='border-b pb-0.5 cursor-pointer'>
								Login
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signup
