import { Image } from 'antd'

import login from '../assets/login.jpg'
import { GoogleOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
const Signup = () => {
	const navigate = useNavigate()
	return (
		<div className='px-app py-6'>
			<div className='flex justify-between items-center p-6'>
				<div>
					<Image src={login} alt='Signup' preview={false} width={805} height={781} className='object-cover' />
				</div>
				<div className='flex flex-col gap-6 w-96'>
					<h1 className='text-3xl font-medium'>Create an account</h1>
					<p>Enter your details below</p>
					<form action='' className='flex flex-col'>
						<input placeholder='Your Name *' className='border-b w-full py-2 my-4' />
						<input placeholder='Your Email or Phone Number' className='border-b w-full py-2 my-4' />
						<input placeholder='Your Password *' className='border-b w-full py-2 my-4' />
						<div className='flex flex-col gap-4 mt-6'>
							<button className='bg-button-2-bg text-white px-6 py-3 rounded hover:bg-red-600 transition text-sm font-medium'>
								Create an account
							</button>
							<div className='flex items-center justify-center gap-6 bg-white text-black px-6 py-3 rounded hover:bg-gray-100 transition text-sm font-medium border border-gray-300'>
								<GoogleOutlined style={{ color: 'red', fontSize: 20 }} />
								<p>Sign up with Google</p>
							</div>
						</div>
					</form>
					<div className='flex items-center justify-center gap-2 mt-4'>
						<p className='text-center text-slate-500'>Already have an account?</p>{' '}
						<span onClick={() => navigate('/login')} className='border-b pb-0.5 cursor-pointer'>
							Login
						</span>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Signup
