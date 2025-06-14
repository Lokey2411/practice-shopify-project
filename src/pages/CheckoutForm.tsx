import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Http from '@/services/Api';
import { message } from 'antd';

const Checkout = () => {
    const location = useLocation();

    const navigate = useNavigate();
    const { orderId, products, total } = location.state || {};

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        paymentMethod: 'cod',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleConfirm = async () => {
        if (!formData.name || !formData.phone || !formData.address) {
            message.error('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        if (!orderId) {
            message.error('Không tìm thấy mã đơn hàng. Vui lòng thử lại.');
            console.error('Thiếu orderId trong location.state');
            return;
        }

        try {
            const endpoint = `/orders/${orderId}/purchase`;
            console.log('Gửi request đến:', endpoint, 'với dữ liệu:', {
                customer: formData,
                products,
                totalPrice: total,
            });

            const response = await Http.patch(endpoint, {
                customer: formData,
                products: products || [],
                totalPrice: total || 0,
            });

            console.log('Phản hồi từ server:', response.data);
            message.success('Đặt hàng thành công!');
            navigate('/success');
        } catch (err) {
            message.error('Có lỗi xảy ra khi đặt hàng. Vui lòng kiểm tra console log.');
        }
    }
    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Thông tin đặt hàng</h2>

            <div className="space-y-4">
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Họ tên"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Số điện thoại"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
                />
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Địa chỉ"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
                />

                <div>
                    <label className="block font-medium mb-1">Phương thức thanh toán</label>
                    <select
                        name="paymentMethod"
                        value={formData.paymentMethod}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-xl focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        <option value="cod">Thanh toán khi nhận hàng (COD)</option>
                        <option value="bank">Chuyển khoản ngân hàng</option>
                    </select>
                </div>
                <p className="text-xl font-semibold text-right mt-4">
                    Tổng tiền: <span className="text-red-500">{total?.toLocaleString() || '0'}₫</span>
                </p>
                {formData.paymentMethod === 'bank' && (
                    <div className="text-center mt-6">
                        <p className="mb-2 text-lg font-medium text-gray-700">Quét mã QR để thanh toán</p>
                        <img
                            src="/qr-bank.jpg"
                            alt="QR chuyển khoản"
                            className="w-60 mx-auto rounded-lg border shadow-md"
                        />
                        <p className="text-sm mt-2 text-gray-600">Nội dung: [Tên người nhận] + [Số điện thoại]</p>
                    </div>
                )}

                <button
                    onClick={handleConfirm}
                    className="w-full mt-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                    Xác nhận đặt hàng
                </button>
            </div>
        </div>
    );
};

export default Checkout;