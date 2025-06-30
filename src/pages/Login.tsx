import login from '@/assets/images/login.jpg';
import Breadcrumbs from '@/components/Breadcrumbs';
import Http from '@/services/Api';
import { Button, ButtonProps, Image, Input } from 'antd';
import useNotification from 'antd/es/notification/useNotification';
import { useState } from 'react';

const Login = () => {
	const [formState, setFormState] = useState({
		email: '',
		password: '',
		username: '',
	});
	const [notification, contextHolder] = useNotification();

	const handleLogin: ButtonProps['onClick'] = (e) => {
		e.preventDefault();
		Http.post('/users/user/login', formState)
			.then((res) => {
				if (res.status !== 200) {
					throw new Error('Error logging in');
				} else {
					localStorage.setItem('token', res.data.token);
					console.log('Token saved:', res.data.token);
					notification.success({
						message: 'Success Log in',
						description: 'You have successfully logged in',
					});
					window.location.href = '/';
				}
			})
			.catch((error) => {
				console.error(error);
				notification.error({
					message: 'Error Log in',
					description: error.message,
				});
			});
	};

	return (
		<div
			className="min-h-screen bg-cover bg-center flex items-center justify-center"
			style={{ backgroundImage: `url(https://i.pinimg.com/736x/d2/83/14/d28314aaa252397e28a8dfa1f542ae93.jpg)` }}
		>
			{contextHolder}
			<div className="w-full max-w-5xl bg-white/80 backdrop-blur-md shadow-xl rounded-xl px-10 py-8">
				<Breadcrumbs />
				<div className="flex justify-between items-center gap-10">
					<div className="hidden md:block md:flex-2">
						<Image src={login} alt="Login" preview={false} sizes="full" className="rounded-lg object-cover" />
					</div>
					<div className="flex flex-1 flex-col gap-6 w-full">
						<h1 className="text-3xl font-medium">Welcome back</h1>
						<p>Enter your details to log in</p>
						<form className="flex flex-col gap-4">
							<Input
								placeholder="Your Email or Phone Number"
								className="border-b w-full py-2 my-2"
								value={formState.username || formState.email}
								onChange={(e) => {
									setFormState({ ...formState, email: e.target.value, username: e.target.value });
								}}
							/>
							<Input.Password
								type="password"
								placeholder="Password"
								className="border-b w-full py-2 my-2"
								value={formState.password}
								onChange={(e) => setFormState({ ...formState, password: e.target.value })}
							/>

							<div className="flex justify-between items-center gap-4 mt-6">
								<Button
									onClick={handleLogin}
									className="bg-button-2-bg text-white w-36 px-6 py-3 rounded cursor-pointer hover:bg-button-hover-1-bg transition text-sm font-medium"
								>
									Login
								</Button>
								<p className="text-button-2-bg cursor-pointer hover:underline">Forget Password?</p>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
