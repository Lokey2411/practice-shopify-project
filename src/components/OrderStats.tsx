import React, { useEffect, useMemo, useState } from 'react';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { ShoppingOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import makeRequest from '@/services/makeRequest';
import { IOrder } from '@/types/IOrder';

const OrderStats: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);



    const fetchOrders = async () => {
        try {
            const response = await makeRequest.get('/orders/my-orders');
            setOrders(response.data);
        } catch (err) {
            console.error('Lỗi khi lấy thống kê đơn hàng:', err);
        } finally {
            setLoading(false);
        }
    };



    const stats = useMemo(() => {
        const total = orders.length;
        const pending = orders.filter(order => order.status === 'Pending').length;
        const completed = orders.filter(order => order.status === 'Completed').length;
        const cancelled = orders.filter(order => order.status === 'Cancelled').length;

        return { total, pending, completed, cancelled };
    }, [orders]);

    useEffect(() => {
        fetchOrders();
    }, []);
    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Thống kê đơn hàng</h2>
                <Link to="/user/orders">
                    <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        Xem tất cả →
                    </span>
                </Link>
            </div>

            <Row gutter={[16, 16]}>
                <Col xs={12} sm={6}>
                    <Card className="text-center hover:shadow-md transition-shadow">
                        <Statistic
                            title="Tổng đơn hàng"
                            value={stats.total}
                            prefix={<ShoppingOutlined className="text-blue-500" />}
                            valueStyle={{ color: '#3f8600' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="text-center hover:shadow-md transition-shadow">
                        <Statistic
                            title="Chờ xử lý"
                            value={stats.pending}
                            prefix={<ClockCircleOutlined className="text-orange-500" />}
                            valueStyle={{ color: '#fa8c16' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="text-center hover:shadow-md transition-shadow">
                        <Statistic
                            title="Hoàn thành"
                            value={stats.completed}
                            prefix={<CheckCircleOutlined className="text-green-500" />}
                            valueStyle={{ color: '#52c41a' }}
                        />
                    </Card>
                </Col>
                <Col xs={12} sm={6}>
                    <Card className="text-center hover:shadow-md transition-shadow">
                        <Statistic
                            title="Đã hủy"
                            value={stats.cancelled}
                            prefix={<CloseCircleOutlined className="text-red-500" />}
                            valueStyle={{ color: '#cf1322' }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default OrderStats; 