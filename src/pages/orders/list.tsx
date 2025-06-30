import { IUser } from '@/types/IUser'
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    RollbackOutlined,
    EyeOutlined,
} from '@ant-design/icons'
import { List, ShowButton, useTable } from '@refinedev/antd'
import { useList, useUpdate, type BaseRecord } from '@refinedev/core'
import { Button, Form, Input, Space, Table, Tag, message } from 'antd'
import moment from 'moment'
import { useEffect, useState } from 'react'

export const OrderList = () => {
    const [dataSource, setDataSource] = useState<readonly BaseRecord[]>([])
    const defaultFilters = {
        status: '',
        userId: 0,
        address: '',
    }
    const [filters, setFilters] = useState(defaultFilters)

    const { tableProps, tableQueryResult } = useTable({
        syncWithLocation: false,
        liveMode: 'auto',
    })
    const refetchOrders = tableQueryResult?.refetch;

    const { dataSource: tableDataSource } = tableProps

    const { data: usersData } = useList<IUser>({
        resource: 'users',
    })

    const { mutate: updateStatusMutation } = useUpdate({
        resource: 'orders',
    })

    const statusOptions = [
        { label: 'Pending', value: 'Pending' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'Cancelled' },
    ];

    const filterByStatus = (status: string) => {
        setFilters({
            ...defaultFilters,
            status,
        })
    }

    const filterByUser = (userId: number) => {
        setFilters({
            ...defaultFilters,
            userId,
        })
    }

    const filterByAddress = (address: string) => {
        setFilters({
            ...defaultFilters,
            address,
        })
    }

    useEffect(() => {
        if (tableDataSource) {
            setDataSource([...tableDataSource])
        }
    }, [tableDataSource])

    useEffect(() => {
        if (!tableDataSource) return
        let filteredData = [...tableDataSource]
        if (filters.status) {
            filteredData = filteredData.filter(order => order.status === filters.status)
        }
        if (filters.userId) {
            filteredData = filteredData.filter(order => order.userId === filters.userId)
        }
        if (filters.address) {
            filteredData = filteredData.filter(order => order.address.toLowerCase().includes(filters.address.toLowerCase()))
        }
        setDataSource(filteredData)
    }, [tableDataSource, filters])

    const getUsername = (userId: number) => {
        const user = usersData?.data.find(user => user.id === userId)
        return user?.username ?? userId
    }
    const selectClassName =
        'w-full bg-blue-50 border-blue-400 text-blue-700 p-2 transition-all duration-300 rounded border capitalize focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none'
    const updateStatus = (record: BaseRecord, status: string) => {
        const prevStatus = record.status;
        const updatedData = dataSource.map(item =>
            item.id === record.id ? { ...item, status } : item
        );
        setDataSource(updatedData);
        updateStatusMutation(
            {
                id: record.id,
                values: { status },
            },
            {
                onSuccess: () => {
                    message.success('Cập nhật trạng thái thành công!');
                    if (refetchOrders) refetchOrders();
                },
                onError: () => {
                    const revertedData = dataSource.map(item =>
                        item.id === record.id ? { ...item, status: prevStatus } : item
                    );
                    setDataSource(revertedData);
                    message.error('Cập nhật trạng thái thất bại!');
                }
            }
        );
    };

    return (
        <div className="p-6 bg-blue-50 rounded-2xl shadow-lg">
            <List canCreate={false}>
                <Form layout='horizontal' className='grid grid-cols-3 gap-4 mb-6'>
                    <Form.Item label={<span className='font-semibold text-blue-700'>Status</span>} className='col-span-1'>
                        <select name='status' className={selectClassName} onChange={e => filterByStatus(e.target.value)}>
                            <option value=''>All</option>
                            {statusOptions?.map((option: any) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </Form.Item>
                    <Form.Item label={<span className='font-semibold text-blue-700'>User</span>}>
                        <select name='userId' className={selectClassName} onChange={e => filterByUser(+e.target.value)}>
                            <option value={0}>All</option>
                            {usersData?.data.map((user: IUser) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    </Form.Item>
                    <Form.Item label={<span className='font-semibold text-blue-700'>Address</span>}>
                        <Input className='rounded border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-300' onChange={e => filterByAddress(e.target.value)} />
                    </Form.Item>
                </Form>
                <div className='overflow-x-auto rounded-lg shadow-lg bg-white'>
                    <Table {...tableProps} rowKey='id' dataSource={dataSource} bordered
                        pagination={{ pageSize: 10 }}
                        className='custom-admin-table'
                        style={{ background: 'white', borderRadius: 12 }}
                    >
                        <Table.Column
                            dataIndex='id'
                            title={<span className='text-blue-700 font-bold'>ID</span>}
                            sortDirections={['ascend', 'descend']}
                            sorter={(a, b) => a.id - b.id}
                            defaultSortOrder={'ascend'}
                        />
                        <Table.Column dataIndex='userId' title={<span className='text-blue-700 font-bold'>User</span>} render={getUsername} />
                        <Table.Column
                            dataIndex='price'
                            title={<span className='text-blue-700 font-bold'>Price</span>}
                            sortDirections={['ascend', 'descend']}
                            sorter={(a, b) => a.price - b.price}
                            render={price => <span className='font-semibold text-blue-800'>{price?.toLocaleString()}₫</span>}
                        />
                        <Table.Column
                            dataIndex='orderDate'
                            title={<span className='text-blue-700 font-bold'>Order date</span>}
                            sortDirections={['ascend', 'descend']}
                            sorter={(a, b) => moment(a.orderDate).diff(moment(b.orderDate))}
                            render={orderDate => <span className='text-blue-600'>{moment(orderDate).format('DD/MM/YYYY')}</span>}
                        />
                        <Table.Column
                            dataIndex='status'
                            title={<span className='text-blue-700 font-bold'>Status</span>}
                            render={status => {
                                let color = 'default';
                                if (status === 'Pending') color = 'orange';
                                else if (status === 'Completed') color = 'green';
                                else if (status === 'Cancelled') color = 'red';
                                else if (status === 'Processing') color = 'blue';
                                return <Tag color={color} className='font-semibold text-base'>{status}</Tag>;
                            }}
                        />
                        <Table.Column
                            dataIndex='address'
                            title={<span className='text-blue-700 font-bold'>Address</span>}
                            render={address => address && address.trim() !== '' ? address : <span style={{ color: 'gray' }}>Chưa có địa chỉ</span>}
                        />
                        <Table.Column
                            title={<span className='text-blue-700 font-bold'>Actions</span>}
                            dataIndex='actions'
                            render={(_, record: BaseRecord) => (
                                <Space>
                                    <Button
                                        type='default'
                                        size='small'
                                        icon={<RollbackOutlined />}
                                        style={{ color: '#2563eb', borderColor: '#2563eb' }}
                                        title='Mark as Pending'
                                        onClick={() => updateStatus(record, 'Pending')}
                                    />
                                    <Button
                                        type='default'
                                        size='small'
                                        icon={<CheckCircleOutlined />}
                                        style={{ color: '#22c55e', borderColor: '#22c55e' }}
                                        title='Mark as Completed'
                                        onClick={() => updateStatus(record, 'Completed')}
                                    />
                                    <Button
                                        type='default'
                                        size='small'
                                        icon={<CloseCircleOutlined />}
                                        danger
                                        title='Mark as Cancelled'
                                        onClick={() => updateStatus(record, 'Cancelled')}
                                    />
                                    <Button
                                        type='default'
                                        size='small'
                                        icon={<EyeOutlined />}
                                        style={{ color: '#0ea5e9', borderColor: '#0ea5e9' }}
                                        title='Check this order'
                                        onClick={() => window.location.href = `/orders/show/${record.id}`}
                                    />
                                </Space>
                            )}
                        />
                    </Table>
                </div>
            </List>
        </div>
    )
}