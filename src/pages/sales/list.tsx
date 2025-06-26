import { BooleanField, DeleteButton, EditButton, List, ShowButton, useTable } from '@refinedev/antd'
import type { BaseRecord } from '@refinedev/core'
import { Space, Table } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

export const SaleList = () => {
	const { tableProps } = useTable({
		syncWithLocation: true,
	})

	return (
		<div className="p-6 bg-blue-50 rounded-2xl shadow-lg">
			<List>
				<div className='overflow-x-auto rounded-lg shadow-lg bg-white'>
					<Table {...tableProps} rowKey='id' bordered pagination={{ pageSize: 10 }} className='custom-admin-table' style={{ background: 'white', borderRadius: 12 }}>
						<Table.Column dataIndex='name' title={<span className='text-blue-700 font-bold'>Name</span>} />
						<Table.Column
							dataIndex={'product'}
							title={<span className='text-blue-700 font-bold'>Product</span>}
							render={(product: BaseRecord) => (
								<h1>{product.name}</h1>
							)}
						/>
						<Table.Column dataIndex={'percentage'} title={<span className='text-blue-700 font-bold'>Percentage</span>} />
						<Table.Column
							dataIndex={'isFlashSale'}
							title={<span className='text-blue-700 font-bold'>Is Flash Sale</span>}
							render={(isFlashSale: boolean) => {
								return isFlashSale ? (
									<CheckCircleOutlined style={{ color: 'green' }} />
								) : (
									<CloseCircleOutlined style={{ color: 'red' }} />
								)
							}}
						/>
						<Table.Column
							title={<span className='text-blue-700 font-bold'>Actions</span>}
							dataIndex='actions'
							render={(_, record: BaseRecord) => (
								<Space>
									<EditButton hideText size='small' recordItemId={record.id} style={{ color: '#2563eb', borderColor: '#2563eb' }} />
									<ShowButton hideText size='small' recordItemId={record.id} style={{ color: '#0ea5e9', borderColor: '#0ea5e9' }} />
									<DeleteButton hideText size='small' recordItemId={record.id} />
								</Space>
							)}
						/>
					</Table>
				</div>
			</List>
		</div>
	)
}
