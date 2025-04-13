import login from '@/assets/images/login.jpg'
import Breadcrumbs from '@/components/Breadcrumbs'
import { Image } from 'antd'
const Login = () => {
	return (
		<div>
			<Breadcrumbs />
			<div className='px-app py-6'>
				<div className='flex justify-between items-center gap-10'>
					<div className='flex-2'>
						<Image src={login} alt='Signup' preview={false} sizes='full' />
					</div>
					<div className='flex flex-1 flex-col gap-6 w-96'>
						<h1 className='text-3xl font-medium'>Create an account</h1>
						<p>Enter your details below</p>
						<form action='' className='flex flex-col'>
							<input type='email' placeholder='Your Email or Phone Number' className='border-b w-full py-2 my-4' />
							<input type='password' placeholder='Password' className='border-b w-full py-2 my-4' />

							<div className='flex justify-between gap-4 mt-6'>
								<button className='bg-button-2-bg text-white w-36 px-6 py-3 rounded cursor-pointer hover:bg-button-hover-1-bg transition text-sm font-medium'>
									Login
								</button>
								<p className='text-button-2-bg cursor-pointer'>Foget Password?</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
