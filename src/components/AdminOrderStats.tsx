import React, { useEffect, useMemo, useState } from 'react';
import { Card, Row, Col, Statistic, Spin } from 'antd';
import { ShoppingOutlined, CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, DollarCircleOutlined } from '@ant-design/icons';
import { dataProvider } from '@/services/dataProvider';

interface IOrder {
    id: string;
    status: string;
    price: number;
}

const AdminOrderStats: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            // Sử dụng endpoint /orders cho admin
            const response = await dataProvider.getList({ resource: 'orders' });
            // Đảm bảo đúng kiểu IOrder[]
            const orders: IOrder[] = Array.isArray(response.data)
                ? response.data.map((item: any) => ({
                    id: item.id || item._id,
                    status: item.status,
                    price: item.price || 0,
                }))
                : [];
            setOrders(orders);
        } catch (err) {
            console.error('Lỗi khi lấy thống kê đơn hàng:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const stats = useMemo(() => {
        const total = orders.length;
        const pending = orders.filter(order => order.status === 'Pending').length;
        const completed = orders.filter(order => order.status === 'Completed').length;
        const cancelled = orders.filter(order => order.status === 'Cancelled').length;
        const revenue = orders
            .filter(order => order.status === 'Completed')
            .reduce((sum, order) => sum + (order.price || 0), 0);
        return { total, pending, completed, cancelled, revenue };
    }, [orders]);

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
                <Col xs={24} sm={12}>
                    <Card className="text-center hover:shadow-md transition-shadow">
                        <Statistic
                            title="Tổng doanh thu"
                            value={stats.revenue.toLocaleString() + '₫'}
                            prefix={<DollarCircleOutlined className="text-blue-700" />}
                            valueStyle={{ color: '#1d4ed8', fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default AdminOrderStats; 