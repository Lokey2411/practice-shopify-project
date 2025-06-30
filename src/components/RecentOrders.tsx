import React, { useEffect, useState } from 'react';
import { Card, List, Tag, Button, Spin, Empty } from 'antd';
import { EyeOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import makeRequest from '@/services/makeRequest';
import { IOrder } from '@/types/IOrder';

const RecentOrders: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchRecentOrders();
    }, []);

    const fetchRecentOrders = async () => {
        try {
            const response = await makeRequest.get('/orders/my-orders');
            // Lấy 5 đơn hàng gần nhất
            const recentOrders = response.data.slice(0, 5);
            setOrders(recentOrders);
        } catch (err) {
            console.error('Lỗi khi lấy đơn hàng gần đây:', err);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'orange';
            case 'Processing': return 'blue';
            case 'Completed': return 'green';
            case 'Cancelled': return 'red';
            default: return 'default';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Pending': return <ClockCircleOutlined />;
            case 'Processing': return <ShoppingOutlined />;
            case 'Completed': return <CheckCircleOutlined />;
            case 'Cancelled': return <CloseCircleOutlined />;
            default: return <ClockCircleOutlined />;
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'Pending': return 'Chờ xử lý';
            case 'Processing': return 'Đang xử lý';
            case 'Completed': return 'Hoàn thành';
            case 'Cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-32">
                <Spin size="large" />
            </div>
        );
    }

    return (
        <Card
            title={
                <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">Đơn hàng gần đây</span>
                    <Link to="/user/orders">
                        <span className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                            Xem tất cả →
                        </span>
                    </Link>
                </div>
            }
            className="shadow-lg"
        >
            {orders.length > 0 ? (
                <List
                    dataSource={orders}
                    renderItem={(order) => (
                        <List.Item
                            className="border-b border-gray-100 last:border-b-0 py-4"
                            actions={[
                                <Link key="view" to={`/user/orders/${order._id}`}>
                                    <Button
                                        type="link"
                                        icon={<EyeOutlined />}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Chi tiết
                                    </Button>
                                </Link>
                            ]}
                        >
                            <List.Item.Meta
                                title={
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">
                                            Đơn hàng #{order._id.slice(-8).toUpperCase()}
                                        </span>
                                        <Tag
                                            color={getStatusColor(order.status)}
                                            icon={getStatusIcon(order.status)}
                                        >
                                            {getStatusText(order.status)}
                                        </Tag>
                                    </div>
                                }
                                description={
                                    <div className="space-y-1">
                                        <div className="text-sm text-gray-600">
                                            {new Date(order.createdAt).toLocaleDateString('vi-VN')} - {new Date(order.createdAt).toLocaleTimeString('vi-VN')}
                                        </div>
                                        <div className="text-lg font-bold text-red-600">
                                            {order.price?.toLocaleString('vi-VN')}₫
                                        </div>
                                    </div>
                                }
                            />
                        </List.Item>
                    )}
                />
            ) : (
                <Empty
                    description="Bạn chưa có đơn hàng nào"
                    className="py-8"
                >
                    <Link to="/products">
                        <Button type="primary">
                            Mua sắm ngay
                        </Button>
                    </Link>
                </Empty>
            )}
        </Card>
    );
};

export default RecentOrders; 