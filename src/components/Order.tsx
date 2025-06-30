import { useEffect, useState } from "react";
import Http from "@/services/Api";
import { Table, Spin, Typography } from "antd";

const { Title } = Typography;

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await Http.get("/orders/my-orders/:id"); // Đường dẫn API lấy đơn hàng của user
                console.log(res.data); // phải có products là object đầy đủ
                setOrders(res.data.data);
            } catch (err) {
                console.error("Lỗi khi lấy đơn hàng", err);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const columns = [
        {
            title: "Mã đơn hàng",
            dataIndex: "_id",
            key: "_id",
        },
        {
            title: "Tổng tiền",
            dataIndex: "totalPrice",
            key: "totalPrice",
            render: (value: number) => `${value.toLocaleString()}₫`,
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
        },
        {
            title: "Ngày đặt",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value: string) => new Date(value).toLocaleString(),
        },
    ];

    return (
        <div className="max-w-6xl mx-auto p-8">
            <Title level={2}>Đơn hàng của tôi</Title>
            {loading ? <Spin /> : <Table dataSource={orders} columns={columns} rowKey="_id" />}
        </div>
    );
};

export default MyOrders;
