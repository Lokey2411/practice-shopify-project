import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Input, Select, Form, Button, Divider, message } from 'antd';
import makeRequest from '@/services/makeRequest';

const { Option } = Select;

const CheckoutForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { orderId, products = [], total = 0 } = location.state || {};
    console.log("CheckoutForm.tsx orderId:", orderId);
    const [form] = Form.useForm();

    const handleFinish = async (values: any) => {
        try {
            const fullAddress = `${values.address}, ${values.district}, ${values.province}`;

            const res = await makeRequest.patch(`/orders/${orderId}/purchase`, {
                address: fullAddress,
                price: total
            });

            if (res.status === 200) {
                message.success('Thanh toán thành công!');
                navigate('/orders');
            } else {
                message.error('Thanh toán thất bại!');
            }
        } catch (err: any) {
            console.error(err);
            message.error('Có lỗi xảy ra khi thanh toán!');
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Xác nhận thanh toán</h1>

            <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Form.Item label="Tỉnh / Thành phố" name="province" rules={[{ required: true }]}>
                    <Select placeholder="Chọn tỉnh / thành phố">
                        <Option value="Hà Nội">Hà Nội</Option>
                        <Option value="TP.HCM">TP. Hồ Chí Minh</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Quận / Huyện" name="district" rules={[{ required: true }]}>
                    <Select placeholder="Chọn quận / huyện">
                        <Option value="Quận 1">Quận 1</Option>
                        <Option value="Quận 2">Quận 2</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Địa chỉ cụ thể" name="address" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>

                <Divider />
                <h2 className="text-xl font-semibold">Tổng cộng: {total.toLocaleString()}₫</h2>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Xác nhận thanh toán
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CheckoutForm;
