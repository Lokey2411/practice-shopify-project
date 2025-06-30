import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Spin, message, Tabs, Empty, Card, Badge, Tooltip } from 'antd';
import { EyeOutlined, ClockCircleOutlined, CheckCircleOutlined, CloseCircleOutlined, ShoppingOutlined } from '@ant-design/icons';
import { Link, useSearchParams } from 'react-router-dom';
import makeRequest from '@/services/makeRequest';
import { IOrder } from '@/types/IOrder';

const { TabPane } = Tabs;

const UserOrders: React.FC = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeTab, setActiveTab] = useState('all');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const response = await makeRequest.get('/orders/my-orders');
            setOrders(response.data);
        } catch (err) {
            message.error('Lỗi khi lấy danh sách đơn hàng!');
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

    const handleCancelOrder = async (orderId: string) => {
        try {
            await makeRequest.put(`/orders/${orderId}/cancel`);
            message.success('Hủy đơn hàng thành công!');
            fetchOrders();
        } catch (err) {
            message.error('Không thể hủy đơn hàng này!');
        }
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: '_id',
            key: '_id',
            render: (id: string) => (
                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                    #{id.slice(-8).toUpperCase()}
                </span>
            ),
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date: string) => (
                <div>
                    <div className="font-medium">
                        {new Date(date).toLocaleDateString('vi-VN')}
                    </div>
                    <div className="text-xs text-gray-500">
                        {new Date(date).toLocaleTimeString('vi-VN')}
                    </div>
                </div>
            ),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (status: string) => (
                <Badge
                    status={getStatusColor(status) as any}
                    text={
                        <span className="flex items-center gap-1">
                            {getStatusIcon(status)}
                            {getStatusText(status)}
                        </span>
                    }
                />
            ),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => (
                <span className="font-bold text-lg text-red-600">
                    {price?.toLocaleString('vi-VN')}₫
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_: any, record: IOrder) => (
                <div className="flex gap-2">
                    <Tooltip title="Xem chi tiết">
                        <Link to={`/user/orders/${record._id}`}>
                            <Button
                                type="primary"
                                size="small"
                                icon={<EyeOutlined />}
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                Chi tiết
                            </Button>
                        </Link>
                    </Tooltip>
                    {record.status === 'Pending' && (
                        <Tooltip title="Hủy đơn hàng">
                            <Button
                                danger
                                size="small"
                                onClick={() => handleCancelOrder(record._id)}
                            >
                                Hủy
                            </Button>
                        </Tooltip>
                    )}
                </div>
            ),
        },
    ];

    const filterOrdersByStatus = (status: string) => {
        if (status === 'all') return orders;
        return orders.filter(order => order.status === status);
    };

    const tabItems = [
        {
            key: 'all',
            label: (
                <span className="flex items-center gap-2">
                    Tất cả
                    <Badge count={orders.length} className="bg-gray-400" />
                </span>
            ),
        },
        {
            key: 'Pending',
            label: (
                <span className="flex items-center gap-2">
                    Chờ xử lý
                    <Badge count={orders.filter(o => o.status === 'Pending').length} className="bg-orange-500" />
                </span>
            ),
        },
        {
            key: 'Processing',
            label: (
                <span className="flex items-center gap-2">
                    Đang xử lý
                    <Badge count={orders.filter(o => o.status === 'Processing').length} className="bg-blue-500" />
                </span>
            ),
        },
        {
            key: 'Completed',
            label: (
                <span className="flex items-center gap-2">
                    Hoàn thành
                    <Badge count={orders.filter(o => o.status === 'Completed').length} className="bg-green-500" />
                </span>
            ),
        },
        {
            key: 'Cancelled',
            label: (
                <span className="flex items-center gap-2">
                    Đã hủy
                    <Badge count={orders.filter(o => o.status === 'Cancelled').length} className="bg-red-500" />
                </span>
            ),
        },
    ];

    const filteredOrders = filterOrdersByStatus(activeTab);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Quản lý đơn hàng</h1>
                <p className="text-gray-600">Theo dõi và quản lý tất cả đơn hàng của bạn</p>
            </div>

            <Card className="shadow-lg">
                <Tabs
                    activeKey={activeTab}
                    onChange={setActiveTab}
                    items={tabItems}
                    className="order-tabs"
                />

                <div className="mt-6">
                    <Spin spinning={loading} tip="Đang tải đơn hàng...">
                        {filteredOrders.length > 0 ? (
                            <Table
                                columns={columns}
                                dataSource={filteredOrders}
                                rowKey="_id"
                                pagination={{
                                    pageSize: 10,
                                    showSizeChanger: true,
                                    showQuickJumper: true,
                                    showTotal: (total, range) =>
                                        `${range[0]}-${range[1]} của ${total} đơn hàng`,
                                }}
                                className="custom-table"
                            />
                        ) : (
                            <Empty
                                description={
                                    <span className="text-gray-500">
                                        {activeTab === 'all'
                                            ? 'Bạn chưa có đơn hàng nào'
                                            : `Không có đơn hàng ${getStatusText(activeTab).toLowerCase()}`
                                        }
                                    </span>
                                }
                                className="py-12"
                            >
                                <Link to="/products">
                                    <Button type="primary" size="large">
                                        Mua sắm ngay
                                    </Button>
                                </Link>
                            </Empty>
                        )}
                    </Spin>
                </div>
            </Card>
        </div>
    );
};

export default UserOrders; 