import login from '@/assets/images/login.jpg'
import Breadcrumbs from '@/components/Breadcrumbs'
import Http from '@/services/Api'
import { Button, ButtonProps, Image, Input } from 'antd'
import useNotification from 'antd/es/notification/useNotification'
import { useState } from 'react'
const Login = () => {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
		username: '',
	})
	const [notification, contextHolder] = useNotification()
	const handleLogin: ButtonProps['onClick'] = e => {
		e.preventDefault()
		Http.post('/users/user/login', formState)
			.then(res => {
				if (res.status !== 200) {
					throw new Error('Error logging in')
				} else {
					localStorage.setItem('token', res.data.token)
					console.log('Token saved:', res.data.token)
					notification.success({
						message: 'Success Log in',
						description: 'You have successfully logged in',
					})
					// window.location.href = '/'
				}
			})
			.catch(error => {
				console.error(error)
				notification.error({
					message: 'Error Log in',
					description: error.message,
				})
			})
	}
	return (
		<div>
			{contextHolder}
			<Breadcrumbs />
			<div className='px-app py-6'>
				<div className='flex justify-between items-center gap-10'>
					<div className='flex-2'>
						<Image src={login} alt='Signup' preview={false} sizes='full' />
					</div>
					<div className='flex flex-1 flex-col gap-6 w-96'>
						<h1 className='text-3xl font-medium'>Create an account</h1>
						<p>Enter your details below</p>
						<form className='flex flex-col gap-4'>
							<Input
								placeholder='Your Email or Phone Number'
								className='border-b w-full py-2 '
								value={formState.username || formState.email}
								onChange={e => {
									setFormState({ ...formState, email: e.target.value, username: e.target.value })
								}}
							/>
							<Input
								type='password'
								placeholder='Password'
								className='border-b w-full py-2'
								value={formState.password}
								onChange={e => setFormState({ ...formState, password: e.target.value })}
							/>

							<div className='flex justify-between gap-4 mt-6 items-center'>
								<Button
									type='primary'
									onClick={handleLogin}
									className=' w-36 px-6 py-3! rounded cursor-pointer hover:bg-button-hover-1-bg transition text-sm font-medium'>
									Login
								</Button>
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
