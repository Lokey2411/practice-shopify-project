import { Image, Input, Button } from 'antd';
import login from '@/assets/images/login.jpg';
import { GoogleOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom'; // Thêm useNavigate
import Breadcrumbs from '@/components/Breadcrumbs';
import { useState } from 'react';
import useNotification from 'antd/es/notification/useNotification';
import Http from '@/services/Api';

const Signup = () => {
	const [formState, setFormState] = useState({
		username: '', 
		email: '',
		password: '',
	});
	const [notification, contextHolder] = useNotification();
	const navigate = useNavigate();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		console.log('Request body:', formState); // Log dữ liệu gửi đi

		try {
			const res = await Http.post('/users/user/register', formState);
			if (res.status !== 200) {
				throw new Error(res.data?.message || 'Sign up failed');
			}

			localStorage.setItem('token', res.data.token);
			notification.success({
				message: 'Sign up successful',
				description: 'Your account has been created! Redirecting to login...',
			});

			setTimeout(() => {
				navigate('/login');
			}, 2000);
		} catch (error: any) {
			console.error('Error response:', error.response?.data);
			notification.error({
				message: 'Sign up failed',
				description: error.response?.data?.message || error.message,
			});
		}
	};

	return (
		<div>
			{contextHolder}
			<Breadcrumbs />
			<div className='px-app py-6'>
				<div className='flex justify-between items-center gap-10'>
					<div className='flex-2'>
						<Image src={login} alt='Signup' preview={false} sizes='full' className='object-cover' />
					</div>
					<div className='flex flex-1 flex-col gap-6'>
						<h1 className='text-3xl font-medium'>Create an account</h1>
						<p>Enter your details below</p>
						<form onSubmit={handleSignUp} className='flex flex-col gap-y-6'>
							<Input
								name='username' 
								value={formState.username}
								onChange={handleChange}
								placeholder='Your Username *'
								className='border-b py-2'
								required
							/>
							<Input
								name='email'
								value={formState.email}
								onChange={handleChange}
								placeholder='Your Email *'
								type='email'
								className='border-b py-2'
								required
							/>
							<Input.Password
								name='password'
								value={formState.password}
								onChange={handleChange}
								placeholder='Your Password *'
								className='border-b py-2'
								required
							/>

							<Button type='primary' htmlType='submit' className='bg-black text-white'>
								Create Account
							</Button>

							<Button icon={<GoogleOutlined />} className='bg-white border'>
								Sign up with Google
							</Button>

							<p className='text-sm text-gray-500'>
								Already have an account?{' '}
								<Link to='/login' className='text-blue-500 hover:underline'>
									Log in
								</Link>
							</p>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;