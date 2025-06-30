import { useNotification } from '@/hooks/useNotification';
import makeRequest from '@/services/makeRequest';
import { IUser } from '@/types/IUser';
import { Button, Card, Form, Input, Avatar, Upload } from 'antd';
import { FormProps, useForm } from 'antd/es/form/Form';
import { useEffect, useState } from 'react';
import { UserOutlined, HomeOutlined, LockOutlined, UploadOutlined, EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { message } from 'antd';
import OrderStats from '@/components/OrderStats';
import RecentOrders from '@/components/RecentOrders';

type SidebarItemProps = {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
};

function SidebarItem({ icon, label, active = false }: SidebarItemProps) {
    return (
        <div className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer transition ${active ? 'bg-red-100 text-red-600 font-bold' : 'hover:bg-gray-100 text-gray-700'}`}>
            {icon}
            <span>{label}</span>
        </div>
    );
}

export default function UserProfilePage() {
    const [form] = useForm();
    const [passwordForm] = useForm();

    const [user, setUser] = useState({} as IUser)
    console.log('User from context:', user);
    const notification = useNotification();
    console.log('userProfile:', user);

    const [avatarUrl, setAvatarUrl] = useState<string>('');

    const saveUser: FormProps['onFinish'] = values => {
        makeRequest
            .put('/users/profile', values)
            .then(res => {
                if (res.status === 200) {
                    notification.success({
                        message: 'Cập nhật thành công',
                        description: 'Thông tin người dùng đã được cập nhật',
                    });
                } else {
                    notification.error({
                        message: 'Có lỗi xảy ra',
                        description: res.data,
                    });
                }
            })
            .catch(error => {
                notification.error({
                    message: 'Lỗi hệ thống',
                    description: error.message,
                });
            });
    };

    const changePassword: FormProps['onFinish'] = values => {
        makeRequest
            .patch('/users/password', values)
            .then(res => {
                if (res.status === 200) {
                    notification.success({
                        message: 'Đổi mật khẩu thành công',
                        description: 'Mật khẩu của bạn đã được cập nhật',
                    });
                    passwordForm.resetFields();
                } else {
                    notification.error({
                        message: 'Có lỗi xảy ra',
                        description: res.data,
                    });
                }
            })
            .catch(error => {
                notification.error({
                    message: 'Lỗi hệ thống',
                    description: error.response?.data || error.message,
                });
            });
    };

    useEffect(() => {
        console.log(user, form.getFieldsValue())
        if (user) {
            form.setFieldsValue({
                ...user,
            });
        }
    }, [user, form]);

    useEffect(() => {
        makeRequest.get('/users/profile').then(res => {
            console.log(res.data)
            setUser(res.data);
            form.setFieldsValue(res.data)
        })
    }, [])

    useEffect(() => {
        if (user && user.avatar) {
            setAvatarUrl(user.avatar);
        }
    }, [user]);

    const handleAvatarChange = (info: any) => {
        if (info.file.status === 'done') {
            // Nếu có backend upload, lấy url từ response
            setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
        }
    };

    return (
        <div className="flex w-full min-h-[80vh] bg-gray-50 py-8">
            {/* Sidebar */}
            <aside className="w-72 min-w-[220px] bg-white rounded-2xl shadow-lg p-6 mr-8 flex flex-col gap-2">
                <div className="flex flex-col items-center mb-6">
                    <Avatar size={80} src={avatarUrl} icon={<UserOutlined />} />
                    <Upload
                        name="avatar"
                        showUploadList={false}
                        action="/services/api/users/upload"
                        beforeUpload={() => true}
                        onChange={async info => {
                            if (info.file.status === 'uploading') return;
                            if (info.file.status === 'done') {
                                // Lấy link ảnh từ response backend
                                const url = info.file.response?.imageUrl;
                                if (url) {
                                    setAvatarUrl(url);
                                    // Gọi API update profile để lưu avatar vào user
                                    await makeRequest.put('/users/profile', { ...user, avatar: url });
                                    message.success('Đổi ảnh đại diện thành công!');
                                }
                            }
                        }}
                    >
                        <Button icon={<UploadOutlined />} size="small" className="mt-2">
                            Đổi ảnh đại diện
                        </Button>
                    </Upload>
                    <div className="mt-2 font-semibold text-lg">{user.fullName || 'User'}</div>
                    <div className="text-xs text-gray-400">Thành viên Bạc</div>
                </div>
                <div className="flex flex-col gap-1">
                    <SidebarItem icon={<UserOutlined />} label="Hồ sơ cá nhân" active />
                    <SidebarItem icon={<HomeOutlined />} label="Số địa chỉ" />
                    <SidebarItem icon={<LockOutlined />} label="Đổi mật khẩu" />
                    {/* ...các mục khác */}
                </div>
            </aside>

            {/* Nội dung */}
            <main className="flex-1 space-y-6">
                {/* Order Statistics */}
                <OrderStats />

                {/* Recent Orders */}
                <RecentOrders />

                {/* Form thông tin cá nhân */}
                <Card className="rounded-2xl shadow-xl p-8 bg-white">
                    <h2 className="text-2xl font-bold mb-2">Hồ sơ cá nhân</h2>
                    <p className="text-gray-500 mb-6">Cập nhật thông tin cá nhân của bạn để trải nghiệm tốt hơn.</p>
                    <Form
                        form={form}
                        layout="vertical"
                        className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4"
                        onFinish={saveUser}
                    >
                        <Form.Item
                            name="lastName"
                            label={<span className="font-semibold">Họ</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập họ' }]}
                        >
                            <Input placeholder="Nhập họ" size="large" className="rounded-lg" />
                        </Form.Item>
                        <Form.Item
                            name="firstName"
                            label={<span className="font-semibold">Tên</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập tên' }]}
                        >
                            <Input placeholder="Nhập tên" size="large" className="rounded-lg" />
                        </Form.Item>
                        <Form.Item
                            name="username"
                            label={<span className="font-semibold">Tên đăng nhập</span>}
                            rules={[{ required: true, message: 'Không được để trống tên đăng nhập' }]}
                            className="md:col-span-2"
                        >
                            <Input placeholder="Tên đăng nhập" size="large" className="rounded-lg" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label={<span className="font-semibold">Email</span>}
                            rules={[
                                { type: 'email', message: 'Email không hợp lệ' },
                                { required: true, message: 'Vui lòng nhập email' },
                            ]}
                            className="md:col-span-2"
                        >
                            <Input placeholder="Email" size="large" className="rounded-lg" />
                        </Form.Item>
                        <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                            <Button
                                type="default"
                                size="large"
                                className="rounded-full px-8 font-semibold border-blue-200 hover:bg-blue-50 transition"
                                onClick={() => form.resetFields()}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="rounded-full px-8 font-semibold bg-blue-600 hover:bg-blue-700 border-blue-600 shadow transition text-white"
                            >
                                Lưu thay đổi
                            </Button>
                        </div>
                    </Form>
                </Card>

                {/* Form đổi mật khẩu */}
                <Card className="rounded-2xl shadow-xl p-8 bg-white">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <LockOutlined className="text-red-600 text-lg" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold">Đổi mật khẩu</h2>
                            <p className="text-gray-500">Cập nhật mật khẩu để bảo mật tài khoản của bạn</p>
                        </div>
                    </div>

                    <Form
                        form={passwordForm}
                        layout="vertical"
                        className="max-w-md"
                        onFinish={changePassword}
                    >
                        <Form.Item
                            name="password"
                            label={<span className="font-semibold">Mật khẩu hiện tại</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu hiện tại' }]}
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu hiện tại"
                                size="large"
                                className="rounded-lg"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="newPassword"
                            label={<span className="font-semibold">Mật khẩu mới</span>}
                            rules={[
                                { required: true, message: 'Vui lòng nhập mật khẩu mới' },
                                { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự' },
                                { pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, message: 'Mật khẩu phải chứa chữ hoa, chữ thường và số' }
                            ]}
                        >
                            <Input.Password
                                placeholder="Nhập mật khẩu mới"
                                size="large"
                                className="rounded-lg"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            label={<span className="font-semibold">Xác nhận mật khẩu mới</span>}
                            dependencies={['newPassword']}
                            rules={[
                                { required: true, message: 'Vui lòng xác nhận mật khẩu mới' },
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('newPassword') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('Mật khẩu xác nhận không khớp'));
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                placeholder="Nhập lại mật khẩu mới"
                                size="large"
                                className="rounded-lg"
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                            />
                        </Form.Item>

                        <div className="flex justify-end gap-4 mt-6">
                            <Button
                                type="default"
                                size="large"
                                className="rounded-full px-8 font-semibold border-red-200 hover:bg-red-50 transition"
                                onClick={() => passwordForm.resetFields()}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                className="rounded-full px-8 font-semibold bg-red-600 hover:bg-red-700 border-red-600 shadow transition text-white"
                                danger
                            >
                                Đổi mật khẩu
                            </Button>
                        </div>
                    </Form>
                </Card>
            </main>
        </div>
    );
}
