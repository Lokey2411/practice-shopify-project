import React from 'react'
import { useNavigate } from 'react-router-dom'
import login from '../assets/login.jpg'
import { Image } from 'antd'
const Login = () => {
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
						<input placeholder='Your Email or Phone Number' className='border-b w-full py-2 my-4' />
						<input placeholder='Password' className='border-b w-full py-2 my-4' />
						
						<div className='flex justify-between gap-4 mt-6'>
							<button className='bg-button-2-bg text-white w-36 px-6 py-3 rounded hover:bg-red-600 transition text-sm font-medium'>
								Login
							</button>
              <button className='text-button-2-bg'>Foget Password?</button>
						</div>
					</form>
					
					
				</div>
			</div>
		</div>
	)
}

export default Login
