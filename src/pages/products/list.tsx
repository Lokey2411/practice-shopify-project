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

	// Lấy tổng số sản phẩm từ API
	const totalCount = typeof (tableProps as any)?.pagination?.total === "number"
		? (tableProps as any)?.pagination?.total
		: 0;

	return (
		<div className="p-6 bg-gradient-to-br from-blue-100 to-white rounded-3xl shadow-2xl max-w-7xl mx-auto">
			<List>
				{/* Tổng số sản phẩm */}
				<div className="mb-6">
					<div className="bg-gradient-to-r from-pink-400 to-blue-400 text-white rounded-2xl shadow-lg px-8 py-4 flex items-center gap-4">
						<span className="text-2xl font-bold drop-shadow">Tổng số sản phẩm:</span>
						<span className="text-3xl font-extrabold animate-pulse">{totalCount}</span>
					</div>
				</div>
				{/* Filter & Search */}
				<Row gutter={16} className="mb-6">
					<Form layout="inline" {...searchFormProps} className="w-full flex flex-wrap gap-4 justify-between items-center">
						<Form.Item name="name" className="flex-1 min-w-[220px]">
							<Input
								allowClear
								prefix={<SearchOutlined />}
								placeholder="Tìm kiếm tên sách..."
								onPressEnter={() => searchFormProps.form?.submit()}
								className="rounded-xl border-blue-300 shadow focus:border-blue-500 focus:ring-2 focus:ring-blue-200 text-lg px-4 py-2"
							/>
						</Form.Item>
						<Form.Item name="category_id" className="flex-1 min-w-[200px]">
							<Select
								{...selectProps}
								allowClear
								placeholder="Lọc theo danh mục"
								onChange={() => searchFormProps.form?.submit()}
								className="w-full rounded-xl border-blue-300 shadow text-lg"
								style={{ minWidth: 180 }}
							/>
						</Form.Item>
					</Form>
				</Row>
				{/* Table */}
				<div className='overflow-x-auto rounded-2xl shadow-2xl bg-white border border-blue-100'>
					<Table
						{...tableProps}
						rowKey='id'
						bordered
						pagination={{ pageSize: 5 }}
						className='custom-admin-table'
						style={{ background: 'white', borderRadius: 24, fontSize: 16 }}
						scroll={{ x: 900 }}
					>
						<Table.Column dataIndex='name' title={<span className='text-blue-900 font-bold text-lg tracking-wide'>Tên sách</span>} />
						<Table.Column dataIndex={'price'} title={<span className='text-blue-900 font-bold text-lg tracking-wide'>Giá</span>} render={price => <Tag color='blue' className='font-semibold text-lg bg-blue-50 border-0'>{price?.toLocaleString()}₫</Tag>} />
						<Table.Column dataIndex={'author'} title={<span className='text-blue-900 font-bold text-lg tracking-wide'>Tác giả</span>} />
						<Table.Column dataIndex={'publisher'} title={<span className='text-blue-900 font-bold text-lg tracking-wide'>Nhà XB</span>} />
						<Table.Column dataIndex={'publishedDate'} title={<span className='text-blue-900 font-bold text-lg tracking-wide'>Năm XB</span>} />
						<Table.Column dataIndex={'numPage'} title={<span className='text-blue-900 font-bold text-lg tracking-wide'>Số trang</span>} />
						<Table.Column
							title={<span className='text-blue-900 font-bold text-lg tracking-wide'>Thao tác</span>}
							dataIndex='actions'
							render={(_, record: BaseRecord) => (
								<Space size="middle">
									<Tooltip title="Sửa">
										<EditButton hideText size='small' recordItemId={record.id} icon={<EditOutlined />} style={{ color: '#fff', borderColor: '#2563eb', background: 'linear-gradient(90deg,#2563eb,#38bdf8)', borderRadius: 12, boxShadow: '0 2px 8px #2563eb22' }} />
									</Tooltip>
									<Tooltip title="Xem chi tiết">
										<ShowButton hideText size='small' recordItemId={record.id} icon={<EyeOutlined />} style={{ color: '#fff', borderColor: '#0ea5e9', background: 'linear-gradient(90deg,#0ea5e9,#38bdf8)', borderRadius: 12, boxShadow: '0 2px 8px #0ea5e922' }} />
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
