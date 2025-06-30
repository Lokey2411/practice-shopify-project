import React, { useEffect, useState } from 'react';
import { Table, Tag, Button, Spin, message } from 'antd';
import makeRequest from '@/services/makeRequest';

const ProfileOrders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    makeRequest.get('/orders/my-orders')
      .then(res => setOrders(res.data))
      .catch(err => {
        message.error('Lỗi khi lấy danh sách đơn hàng!');
      })
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: '_id',
      key: '_id',
      render: (id: string) => <span style={{ fontWeight: 500 }}>{id.slice(-6).toUpperCase()}</span>,
    },
    {
      title: 'Ngày đặt',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleString('vi-VN'),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        let color = 'default';
        if (status === 'Pending') color = 'orange';
        else if (status === 'Processing') color = 'blue';
        else if (status === 'Completed') color = 'green';
        else if (status === 'Cancelled') color = 'red';
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'price',
      render: (price: number) => price?.toLocaleString('vi-VN') + '₫',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_: any, record: any) => (
        <Button type="link" disabled>Xem chi tiết</Button>
      ),
    },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <h2 style={{ fontSize: 24, fontWeight: 600, marginBottom: 24 }}>Đơn hàng của tôi</h2>
      <Spin spinning={loading} tip="Đang tải...">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="_id"
          pagination={{ pageSize: 8 }}
        />
      </Spin>
    </div>
  );
};

export default ProfileOrders; 