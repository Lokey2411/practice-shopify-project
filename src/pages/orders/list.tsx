import { IUser } from '@/types/IUser'
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    RollbackOutlined,
} from '@ant-design/icons'
import { List, ShowButton, useTable } from '@refinedev/antd'
import { useList, useUpdate, type BaseRecord } from '@refinedev/core'
import { Button, Form, Input, Space, Table } from 'antd'
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

    const { tableProps } = useTable({
        syncWithLocation: false,
        liveMode: 'auto',
    })
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
            filteredData = filteredData.filter(order => order.STATUS === filters.status)
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
        'w-full bg-white dark:bg-black p-2 transition-all duration-300 rounded border border-black dark:border-white capitalize'
    const updateStatus = (record: BaseRecord, status: string) => {
        // Cập nhật cục bộ trước khi gửi yêu cầu server
        const updatedData = dataSource.map(item =>
            item.id === record.id ? { ...item, STATUS: status } : item
        )
        setDataSource(updatedData)

        // Gửi yêu cầu cập nhật đến server
        updateStatusMutation({
            id: record.id,
            values: {
                status,
            },
        })
    }
    return (
        <List canCreate={false}>
            <Form layout='horizontal' className='grid grid-cols-3 gap-4'>
                <Form.Item label='Status' className='col-span-1'>
                    <select name='status' id='' className={selectClassName} onChange={e => filterByStatus(e.target.value)}>
                        <option value=''>All</option>
                        {statusOptions?.map((option: any) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </Form.Item>
                <Form.Item label='User'>
                    <select name='userId' id='' className={selectClassName} onChange={e => filterByUser(+e.target.value)}>
                        <option value={0}>All</option>
                        {usersData?.data.map((user: IUser) => (
                            <option key={user.id} value={user.id}>
                                {user.username}
                            </option>
                        ))}
                    </select>
                </Form.Item>
                <Form.Item label='Address'>
                    <Input onChange={e => filterByAddress(e.target.value)} />
                </Form.Item>
            </Form>
            <Table {...tableProps} rowKey='id' dataSource={dataSource}>
                <Table.Column
                    dataIndex='id'
                    title='ID'
                    sortDirections={['ascend', 'descend']}
                    sorter={(a, b) => a.id - b.id}
                    defaultSortOrder={'ascend'}
                />
                <Table.Column dataIndex='userId' title='User' render={getUsername} />
                <Table.Column
                    dataIndex='price'
                    title='Price'
                    sortDirections={['ascend', 'descend']}
                    sorter={(a, b) => a.price - b.price}
                />
                <Table.Column
                    dataIndex='orderDate'
                    title='Order date'
                    sortDirections={['ascend', 'descend']}
                    sorter={(a, b) => moment(a.orderDate).diff(moment(b.orderDate))}
                    render={orderDate => moment(orderDate).format('DD/MM/YYYY')}
                />
                <Table.Column dataIndex='STATUS' title='Status' />
                <Table.Column dataIndex='address' title='Address' />
                <Table.Column
                    title='Actions'
                    dataIndex='actions'
                    render={(_, record: BaseRecord) => (
                        <Space>
                            <Button
                                type='dashed'
                                size='small'
                                icon={<RollbackOutlined />}
                                title='Mark as Pending'
                                onClick={() => updateStatus(record, 'Pending')}></Button>
                            <Button
                                className='border-green-300 text-green-300'
                                size='small'
                                icon={<CheckCircleOutlined />}
                                title='Mark as Completed'
                                onClick={() => updateStatus(record, 'Completed')}></Button>
                            <Button
                                size='small'
                                icon={<CloseCircleOutlined />}
                                danger
                                title='Mark as Cancelled'
                                onClick={() => updateStatus(record, 'Cancelled')}></Button>
                            <ShowButton hideText size='small' recordItemId={record.id} title='Check this order' />
                        </Space>
                    )}
                />
            </Table>
        </List>
    )
}