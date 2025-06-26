import { EditButton, List, ShowButton, useTable, useSelect } from '@refinedev/antd'
import type { BaseRecord } from '@refinedev/core'
import { Space, Table, Tag, Tooltip, Input, Select, Row, Col } from 'antd'
import { EditOutlined, EyeOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons'
import DeleteButton from '@/components/DeleteButton'
import { useState } from 'react'

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

	return (
		<div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl shadow-2xl">
			<List>
				{/* Filter & Search */}
				<Row gutter={16} className="mb-4">
					<Col xs={24} sm={12} md={8}>
						<Input
							allowClear
							prefix={<SearchOutlined />}
							placeholder="Tìm kiếm tên sách..."
							onChange={e => searchFormProps?.form?.setFieldValue('name', e.target.value)}
							onPressEnter={e => searchFormProps?.form?.submit()}
							className="rounded-lg border-blue-300"
						/>
					</Col>
					<Col xs={24} sm={12} md={8}>
						<Select
							{...selectProps}
							allowClear
							placeholder="Lọc theo danh mục"
							onChange={value => {
								searchFormProps?.form?.setFieldValue('category_id', value);
								searchFormProps?.form?.submit();
							}}
							className="w-full rounded-lg border-blue-300"
						/>
					</Col>
				</Row>
				{/* Table */}
				<div className='overflow-x-auto rounded-xl shadow-lg bg-white border border-blue-100'>
					<Table
						{...tableProps}
						rowKey='id'
						bordered
						pagination={{ pageSize: 10 }}
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
