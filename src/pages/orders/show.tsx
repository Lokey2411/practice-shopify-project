import { Show, TextField } from '@refinedev/antd';
import { BaseRecord, useList, useOne, useShow } from '@refinedev/core';
import { Table, Typography } from 'antd';

const { Title } = Typography;

export const OrderShow = () => {
    const { query: queryResult } = useShow({});
    const { data, isLoading } = queryResult;

    const record = data?.data;
    const id = record?.id;

    // Xử lý userId là object hoặc string
    const userId =
        typeof record?.userId === 'object' ? record?.userId?._id : record?.userId;

    const {
        data: userData,
        isLoading: isUserLoading,
    } = useOne({
        resource: 'users',
        id: userId,
        queryOptions: {
            enabled: !!userId,
        },
    });

    const {
        data: productData,
        isLoading: isProductLoading,
    } = useList({
        resource: id ? `/orders/${id}/products` : '',
        queryOptions: {
            enabled: !!id,
        },
    });

    return (
        <Show isLoading={isLoading || isUserLoading || isProductLoading}>
            <div className="grid grid-cols-5 gap-x-3 gap-y-4">
                <div>
                    <Title level={5}>ID</Title>
                    <TextField value={record?.id} />
                </div>
                <div>
                    <Title level={5}>Status</Title>
                    <TextField value={record?.STATUS} />
                </div>
                <div>
                    <Title level={5}>Address</Title>
                    <TextField value={record?.address} />
                </div>
                <div>
                    <Title level={5}>User</Title>
                    <TextField value={userData?.data?.username || record?.userId?.username} />
                </div>
                <div>
                    <Title level={5}>Price</Title>
                    <TextField value={record?.price?.toLocaleString() + '₫'} />
                </div>

                <div className="col-span-5">
                    <Title level={5}>Product</Title>
                    <Table
                        rowKey="id"
                        dataSource={productData?.data || []}
                        pagination={false}
                        footer={() => {
                            const total =
                                productData?.data?.reduce(
                                    (acc, cur) => acc + (Number(cur.priceAfterDiscount) || 0) * (Number(cur.quantity) || 0),
                                    0,
                                ) || 0;
                            const totalQuantity =
                                productData?.data?.reduce(
                                    (acc, cur) => acc + cur.quantity,
                                    0,
                                ) || 0;
                            return (
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                                    <span>Tổng số lượng sản phẩm: {totalQuantity}</span>
                                    <span>Tổng tiền đơn hàng: {total.toLocaleString()}₫</span>
                                </div>
                            );
                        }}
                    >
                        <Table.Column dataIndex="id" title="ID" />
                        <Table.Column dataIndex="name" title="Tên sản phẩm" />
                        <Table.Column
                            dataIndex="image"
                            title="Hình ảnh"
                            render={(url: string) => (
                                <img
                                    src={url}
                                    alt="product"
                                    style={{ width: 60, height: 60, objectFit: 'cover' }}
                                />
                            )}
                        />
                        <Table.Column dataIndex="variant" title="Phân loại" />
                        <Table.Column
                            dataIndex="priceAfterDiscount"
                            title="Giá sau giảm"
                            render={(price: any) => `${(Number(price) || 0).toLocaleString()}₫`}
                        />
                        <Table.Column
                            dataIndex="quantity"
                            title="Số lượng"
                            render={(qty: any) => `${Number(qty) || 0}`}
                        />
                        <Table.Column
                            title="Thành tiền"
                            render={(record: any) => {
                                const price = Number(record.priceAfterDiscount) || 0;
                                const qty = Number(record.quantity) || 0;
                                return `${(price * qty).toLocaleString()}₫`;
                            }}
                        />
                        <Table.Column
                            dataIndex='address'
                            title="Địa chỉ"
                            render={(_, record) => (
                                <span>
                                    {record.province && `${record.province}, `}
                                    {record.district && `${record.district}, `}
                                    {record.address}
                                </span>
                            )}
                        />
                    </Table>
                </div>
            </div>
        </Show>
    );
};
