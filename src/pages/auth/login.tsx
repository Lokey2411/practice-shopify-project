import { useState } from "react";
import { Button, Form, Input, notification, Typography } from "antd";

const { Title } = Typography;

const LoginPage = () => {
	const [loading, setLoading] = useState(false);

	const onFinish = async (values: { email: string; password: string }) => {
		setLoading(true);
		try {
			const res = await fetch("/services/api/users/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: values.email,
					username: values.email, // backend nhận username hoặc email
					password: values.password,
				}),
			});
			if (!res.ok) throw new Error("Sai tài khoản hoặc mật khẩu");
			const data = await res.json();
			localStorage.setItem("token", data.token);
			notification.success({
				message: "Đăng nhập thành công",
				description: "Chào mừng bạn quay trở lại!",
			});
			window.location.href = "/"; // hoặc điều hướng sang trang dashboard
		} catch (err: any) {
			notification.error({
				message: "Đăng nhập thất bại",
				description: err.message,
			});
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50">
			<div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
				<Title level={2} className="text-center mb-6">Đăng nhập</Title>
				<Form layout="vertical" onFinish={onFinish}>
					<Form.Item
						label="Email hoặc tên đăng nhập"
						name="email"
						rules={[{ required: true, message: "Vui lòng nhập email hoặc username" }]}
					>
						<Input size="large" placeholder="Email hoặc username" />
					</Form.Item>
					<Form.Item
						label="Mật khẩu"
						name="password"
						rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
					>
						<Input.Password size="large" placeholder="Mật khẩu" />
					</Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						size="large"
						loading={loading}
						className="w-full"
					>
						Đăng nhập
					</Button>
				</Form>
			</div>
		</div>
	);
};

export default LoginPage;
