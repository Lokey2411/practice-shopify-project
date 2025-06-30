import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Descriptions, Table, Tag, Button, Spin, message, Steps, Empty, Modal, Rate, Input, Divider } from 'antd';
import {
    ClockCircleOutlined,
    CheckCircleOutlined,
    CloseCircleOutlined,
    ShoppingOutlined,
    UserOutlined,
    EnvironmentOutlined,
    PhoneOutlined,
    StarOutlined,
    MessageOutlined
} from '@ant-design/icons';
import makeRequest from '@/services/makeRequest';
import { IOrder } from '@/types/IOrder';
import { IProduct } from '@/types/IProduct';

const { TextArea } = Input;

interface OrderProduct extends IProduct {
    quantity: number;
}

interface OrderDetail extends Omit<IOrder, 'products'> {
    products: OrderProduct[];
    user?: {
        fullName: string;
        email: string;
        phone: string;
    };
}

const UserOrderDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [reviewModalVisible, setReviewModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<OrderProduct | null>(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');

    useEffect(() => {
        if (id) {
            fetchOrderDetail();
        }
    }, [id]);

    const fetchOrderDetail = async () => {
        setLoading(true);
        try {
            const response = await makeRequest.get(`/orders/my-orders/${id}`);
            setOrder(response.data.data);
        } catch (err) {
            message.error('Không thể tải thông tin đơn hàng!');
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

    const getStatusText = (status: string) => {
        switch (status) {
            case 'Pending': return 'Chờ xử lý';
            case 'Processing': return 'Đang xử lý';
            case 'Completed': return 'Hoàn thành';
            case 'Cancelled': return 'Đã hủy';
            default: return status;
        }
    };

    const getCurrentStep = (status: string) => {
        switch (status) {
            case 'Pending': return 0;
            case 'Processing': return 1;
            case 'Completed': return 2;
            case 'Cancelled': return -1;
            default: return 0;
        }
    };

    const handleCancelOrder = async () => {
        try {
            await makeRequest.put(`/orders/${id}/cancel`);
            message.success('Hủy đơn hàng thành công!');
            fetchOrderDetail();
        } catch (err) {
            message.error('Không thể hủy đơn hàng này!');
        }
    };

    const handleReview = (product: OrderProduct) => {
        setSelectedProduct(product);
        setReviewModalVisible(true);
    };

    const submitReview = async () => {
        if (!selectedProduct) return;

        try {
            await makeRequest.post('/reviews', {
                productId: selectedProduct._id,
                rating,
                comment,
                orderId: id
            });
            message.success('Đánh giá sản phẩm thành công!');
            setReviewModalVisible(false);
            setRating(5);
            setComment('');
            setSelectedProduct(null);
        } catch (err) {
            message.error('Không thể gửi đánh giá!');
        }
    };

    const productColumns = [
        {
            title: 'Sản phẩm',
            dataIndex: 'name',
            key: 'name',
            render: (name: string, record: OrderProduct) => (
                <div className="flex items-center gap-3">
                    <img
                        src={record.images?.[0] || 'https://via.placeholder.com/60x80'}
                        alt={name}
                        className="w-15 h-20 object-cover rounded"
                    />
                    <div>
                        <div className="font-medium">{name}</div>
                        {record.author && (
                            <div className="text-sm text-gray-500">Tác giả: {record.author}</div>
                        )}
                        {record.publisher && (
                            <div className="text-sm text-gray-500">NXB: {record.publisher}</div>
                        )}
                    </div>
                </div>
            ),
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price: number) => (
                <span className="font-semibold text-red-600">
                    {price?.toLocaleString('vi-VN')}₫
                </span>
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            render: (quantity: number) => (
                <span className="font-medium">{quantity}</span>
            ),
        },
        {
            title: 'Thành tiền',
            key: 'total',
            render: (record: OrderProduct) => (
                <span className="font-bold text-lg text-red-600">
                    {(record.price * record.quantity)?.toLocaleString('vi-VN')}₫
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (record: OrderProduct) => (
                <div className="flex gap-2">
                    <Link to={`/detail/${record._id}`}>
                        <Button size="small" type="default">
                            Xem sản phẩm
                        </Button>
                    </Link>
                    {order?.status === 'Completed' && (
                        <Button
                            size="small"
                            type="primary"
                            icon={<StarOutlined />}
                            onClick={() => handleReview(record)}
                        >
                            Đánh giá
                        </Button>
                    )}
                </div>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Spin size="large" tip="Đang tải thông tin đơn hàng..." />
            </div>
        );
    }

    if (!order) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <Empty description="Không tìm thấy đơn hàng" />
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">
                            Chi tiết đơn hàng #{order._id.slice(-8).toUpperCase()}
                        </h1>
                        <p className="text-gray-600">
                            Đặt hàng lúc {new Date(order.createdAt).toLocaleString('vi-VN')}
                        </p>
                    </div>
                    <div className="flex gap-3">
                        <Link to="/user/orders">
                            <Button>Quay lại</Button>
                        </Link>
                        {order.status === 'Pending' && (
                            <Button danger onClick={handleCancelOrder}>
                                Hủy đơn hàng
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Status */}
            <Card className="mb-6 shadow-lg">
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-4">Trạng thái đơn hàng</h2>
                    <Tag
                        color={getStatusColor(order.status)}
                        className="text-lg px-4 py-2"
                    >
                        {getStatusText(order.status)}
                    </Tag>
                </div>

                {order.status !== 'Cancelled' && (
                    <Steps
                        current={getCurrentStep(order.status)}
                        items={[
                            {
                                title: 'Đặt hàng',
                                description: 'Đơn hàng đã được đặt',
                                icon: <ClockCircleOutlined />,
                            },
                            {
                                title: 'Xử lý',
                                description: 'Đang chuẩn bị hàng',
                                icon: <ShoppingOutlined />,
                            },
                            {
                                title: 'Hoàn thành',
                                description: 'Đã giao hàng',
                                icon: <CheckCircleOutlined />,
                            },
                        ]}
                    />
                )}
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Order Information */}
                <div className="lg:col-span-2">
                    <Card title="Thông tin đơn hàng" className="shadow-lg mb-6">
                        <Table
                            columns={productColumns}
                            dataSource={order.products}
                            rowKey="_id"
                            pagination={false}
                            className="custom-table"
                        />

                        <Divider />

                        <div className="flex justify-between items-center text-lg">
                            <span className="font-semibold">Tổng cộng:</span>
                            <span className="font-bold text-2xl text-red-600">
                                {order.price?.toLocaleString('vi-VN')}₫
                            </span>
                        </div>
                    </Card>
                </div>

                {/* Customer Information */}
                <div>
                    <Card title="Thông tin khách hàng" className="shadow-lg mb-6">
                        <Descriptions column={1} size="small">
                            <Descriptions.Item
                                label={<span className="flex items-center gap-2"><UserOutlined /> Họ tên</span>}
                            >
                                {order.user?.fullName || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={<span className="flex items-center gap-2"><PhoneOutlined /> Số điện thoại</span>}
                            >
                                {order.user?.phone || 'N/A'}
                            </Descriptions.Item>
                            <Descriptions.Item
                                label={<span className="flex items-center gap-2"><EnvironmentOutlined /> Địa chỉ</span>}
                            >
                                {order.address || 'N/A'}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Card title="Thông tin bổ sung" className="shadow-lg">
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Mã đơn hàng">
                                <span className="font-mono">#{order._id.slice(-8).toUpperCase()}</span>
                            </Descriptions.Item>
                            <Descriptions.Item label="Ngày đặt">
                                {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                            </Descriptions.Item>
                            <Descriptions.Item label="Cập nhật lần cuối">
                                {new Date(order.updatedAt).toLocaleDateString('vi-VN')}
                            </Descriptions.Item>
                        </Descriptions>
                    </Card>
                </div>
            </div>

            {/* Review Modal */}
            <Modal
                title={`Đánh giá sản phẩm: ${selectedProduct?.name}`}
                open={reviewModalVisible}
                onOk={submitReview}
                onCancel={() => {
                    setReviewModalVisible(false);
                    setRating(5);
                    setComment('');
                    setSelectedProduct(null);
                }}
                okText="Gửi đánh giá"
                cancelText="Hủy"
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Đánh giá:</label>
                        <Rate value={rating} onChange={setRating} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">Nhận xét:</label>
                        <TextArea
                            rows={4}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Chia sẻ trải nghiệm của bạn về sản phẩm này..."
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default UserOrderDetail; 