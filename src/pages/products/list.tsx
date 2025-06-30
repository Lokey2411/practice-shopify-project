import { EditButton, List, ShowButton, useTable, useSelect } from '@refinedev/antd'
import type { BaseRecord } from '@refinedev/core'
import { Space, Table, Tag, Tooltip, Input, Select, Row, Col, Form } from 'antd'
import { EditOutlined, EyeOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import DeleteButton from '@/components/DeleteButton'
import { useState, useEffect } from 'react'

export const ProductList = () => {
	const { tableProps, searchFormProps } = useTable({
		syncWithLocation: true,
		onSearch: (params: any) => {
			const filters: any[] = [];
			if (params.name) {
				filters.push({ field: 'name', operator: 'contains', value: params.name });
			}
			if (params.category_id) {
				filters.push({ field: 'category_id', operator: 'eq', value: params.category_id });
			}
			return filters;
		},
	})
	const { selectProps } = useSelect({
		resource: 'categories',
		optionLabel: 'name',
		optionValue: 'id',
	})

	// Lấy tổng tồn kho từ API
	const totalStock = Array.isArray(tableProps?.dataSource) && tableProps.dataSource.length > 0 && tableProps.dataSource[0]?.totalStock !== undefined
		? tableProps.dataSource[0].totalStock
		: undefined;

	// Lấy tổng số sản phẩm từ API
	const totalCount = typeof (tableProps as any)?.pagination?.total === "number"
		? (tableProps as any)?.pagination?.total
		: 0;

	return (
		<div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-2xl">
			<List>
				{/* Tổng tồn kho */}
				{typeof totalStock === 'number' && (
					<div className="mb-2 text-lg font-bold text-blue-700">
						Tổng số lượng tồn kho: <span className="text-green-600">{totalStock}</span>
					</div>
				)}
				{/* Tổng số sản phẩm */}
				{typeof totalCount === 'number' && (
					<div className="mb-4 text-lg font-bold text-blue-700">
						Tổng số sản phẩm: <span className="text-pink-600">{totalCount}</span>
					</div>
				)}
				{/* Filter & Search */}
				<Row gutter={16} className="mb-4">
					<Form layout="inline" {...searchFormProps}>
						<Form.Item name="name">
							<Input
								allowClear
								prefix={<SearchOutlined />}
								placeholder="Tìm kiếm tên sách..."
								onPressEnter={() => searchFormProps.form?.submit()}
								className="rounded-lg border-blue-300"
							/>
						</Form.Item>
						<Form.Item name="category_id">
							<Select
								{...selectProps}
								allowClear
								placeholder="Lọc theo danh mục"
								onChange={() => searchFormProps.form?.submit()}
								className="w-full rounded-lg border-blue-300"
								style={{ minWidth: 180 }}
							/>
						</Form.Item>
					</Form>
				</Row>
				{/* Table */}
				<div className='overflow-x-auto rounded-xl shadow-lg bg-white border border-blue-100'>
					<Table
						{...tableProps}
						rowKey='id'
						bordered
						pagination={{ pageSize: 5 }}
						className='custom-admin-table'
						style={{ background: 'white', borderRadius: 16 }}
						scroll={{ x: 900 }}
					>
						<Table.Column dataIndex='name' title={<span className='text-blue-800 font-bold text-base tracking-wide'>Tên sách</span>} />
						<Table.Column dataIndex={'price'} title={<span className='text-blue-800 font-bold text-base tracking-wide'>Giá</span>} render={price => <Tag color='blue' className='font-semibold text-base'>{price?.toLocaleString()}₫</Tag>} />
						<Table.Column dataIndex={'author'} title={<span className='text-blue-800 font-bold text-base tracking-wide'>Tác giả</span>} />
						<Table.Column dataIndex={'publisher'} title={<span className='text-blue-800 font-bold text-base tracking-wide'>Nhà XB</span>} />
						<Table.Column dataIndex={'publishedDate'} title={<span className='text-blue-800 font-bold text-base tracking-wide'>Năm XB</span>} />
						<Table.Column dataIndex={'numPage'} title={<span className='text-blue-800 font-bold text-base tracking-wide'>Số trang</span>} />
						<Table.Column dataIndex={'stock'} title={<span className='text-blue-800 font-bold text-base tracking-wide'>Tồn kho</span>} render={stock => <Tag color={stock > 0 ? 'green' : 'red'} className='font-semibold text-base'>{stock}</Tag>} />
						<Table.Column
							title={<span className='text-blue-800 font-bold text-base tracking-wide'>Thao tác</span>}
							dataIndex='actions'
							render={(_, record: BaseRecord) => (
								<Space size="middle">
									<Tooltip title="Sửa">
										<EditButton hideText size='small' recordItemId={record.id} icon={<EditOutlined />} style={{ color: '#2563eb', borderColor: '#2563eb', background: '#f0f7ff', borderRadius: 8 }} />
									</Tooltip>
									<Tooltip title="Xem chi tiết">
										<ShowButton hideText size='small' recordItemId={record.id} icon={<EyeOutlined />} style={{ color: '#0ea5e9', borderColor: '#0ea5e9', background: '#e0f2fe', borderRadius: 8 }} />
									</Tooltip>
									<Tooltip title="Xóa">
										<DeleteButton id={record?.id ?? ""} />
									</Tooltip>
								</Space>
							)}
						/>
					</Table>
				</div>
			</List>
		</div>
	)
}
