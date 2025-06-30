import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Input, Select, Form, Button, Divider, message, Modal } from 'antd';
import makeRequest from '@/services/makeRequest';
import QRCode from 'react-qr-code';
const { Option } = Select;

const CheckoutForm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const location = useLocation();
    const { carts = [], total = 0 } = location.state || {};
    const orderId = id || location.state?.orderId || (carts.length > 0 ? carts[0]._id : undefined);
    console.log("CheckoutForm.tsx orderId from params:", id, "carts:", carts, "state:", location.state, "derived orderId:", orderId);

    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', content: '', type: 'info' });
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);

    const showModal = (title: string, content: string, type: 'success' | 'error' | 'info') => {
        setModalContent({ title, content, type });
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const submitOrderConfirmation = async () => {
        try {
            const response = await makeRequest.post('/orders/confirm', {
                orderId: orderId,
            });
            message.success('Xác nhận đơn hàng thành công!');
        } catch (error) {
            console.error('Lỗi xác nhận đơn hàng:', error);
            message.error('Không thể xác nhận đơn hàng');
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const navigate = useNavigate();

    const handleFinish = async (values: any) => {
        try {
            await form.validateFields();
            const fullAddress = `${values.address}, ${values.district}, ${values.province}`;
            if (!orderId) {
                showModal('Lỗi', 'Không tìm thấy ID đơn hàng. Vui lòng quay lại giỏ hàng và thử lại!', 'error');
                return;
            }
            console.log({
                orderId,
                address: fullAddress,
                price: total,
                paymentMethod: values.paymentMethod
            });
            const res = await makeRequest.patch(`/orders/${orderId}/purchase`, {
                address: fullAddress,
                price: total,
                paymentMethod: values.paymentMethod
            });

            if (res.status === 200) {
                showModal('Thành công', 'Thanh toán thành công!', 'success');
            } else {
                showModal('Thất bại', `Thanh toán thất bại! Mã trạng thái: ${res.status}. Vui lòng thử lại hoặc liên hệ hỗ trợ.`, 'error');
            }
        } catch (err: any) {
            console.error('Error details:', err.response?.data || err.message);
            showModal('Lỗi', `Có lỗi xảy ra: ${err.response?.data?.message || err.message || 'Vui lòng thử lại!'}`, 'error');
        }
    };

    const handleProvinceChange = (provinceCode: string) => {
        fetch(`https://provinces.open-api.vn/api/p/${provinceCode}?depth=2`)
            .then(res => res.json())
            .then(data => setDistricts(data.districts));
    };

    useEffect(() => {
        fetch('https://provinces.open-api.vn/api/p/')
            .then(res => res.json())
            .then(data => setProvinces(data));
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-8">Xác nhận thanh toán</h1>
            <Form layout="vertical" form={form} onFinish={handleFinish}>
                <Form.Item label="Tỉnh / Thành phố" name="province" rules={[{ required: true, message: 'Vui lòng chọn tỉnh/thành phố!' }]}>
                    <Select placeholder="Chọn tỉnh / thành phố" onChange={handleProvinceChange}>
                        {provinces.map((province: any) => (
                            <Option key={province.code} value={province.code}>{province.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Quận / Huyện" name="district" rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}>
                    <Select placeholder="Chọn quận / huyện">
                        {districts.map((district: any) => (
                            <Option key={district.code} value={district.code}>{district.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Địa chỉ cụ thể" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Phương thức thanh toán"
                    name="paymentMethod"
                    initialValue="cod"
                    rules={[{ required: true, message: 'Vui lòng chọn phương thức thanh toán!' }]}
                >
                    <Select onChange={setPaymentMethod}>
                        <Option value="cod">Thanh toán khi nhận hàng (COD)</Option>
                        <Option value="qr">Chuyển khoản qua QR</Option>
                    </Select>
                </Form.Item>
                {paymentMethod === 'qr' && (
                    <div className="mb-4 text-center">
                        <p>Quét mã QR để chuyển khoản:</p>
                        <QRCode value="STK: 123456789 - Ngân hàng ABC - Tên chủ TK: Nguyễn Văn A" size={180} />
                        <p className="mt-2 text-sm text-gray-500">Nội dung chuyển khoản: SĐT + Họ tên</p>
                    </div>
                )}
                <Divider />
                <h2 className="text-xl font-semibold">Tổng cộng: {total.toLocaleString()}₫</h2>
                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Xác nhận thanh toán
                    </Button>
                </Form.Item>
            </Form>

            <Modal
                title={modalContent.title}
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="OK"
                cancelText="Hủy"
                className={modalContent.type === 'success' ? 'bg-green-100' : 'bg-red-100'}
            >
                <p>{modalContent.content}</p>
            </Modal>
        </div>
    );
};

export default CheckoutForm;
