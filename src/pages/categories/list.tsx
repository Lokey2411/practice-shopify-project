import { BooleanField, EditButton, List, ShowButton, useTable } from '@refinedev/antd'
import type { BaseRecord } from '@refinedev/core'
import { Space, Table } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import DeleteButton from '@/components/DeleteButton'

export const CategoryList = () => {
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
							dataIndex={'isNewArrival'}
							title={<span className='text-blue-700 font-bold'>New Arrival</span>}
							render={(isNewArrival: BaseRecord) => (
								<BooleanField
									value={isNewArrival}
									trueIcon={<CheckCircleOutlined className='text-2xl text-green-500' />}
									falseIcon={<CloseCircleOutlined className='text-2xl text-red-500' />}
								/>
							)}
						/>
						<Table.Column
							title={<span className='text-blue-700 font-bold'>Actions</span>}
							dataIndex='actions'
							render={(_, record: BaseRecord) => (
								<Space>
									<EditButton hideText size='small' recordItemId={record.id} style={{ color: '#2563eb', borderColor: '#2563eb' }} />
									<ShowButton hideText size='small' recordItemId={record.id} style={{ color: '#0ea5e9', borderColor: '#0ea5e9' }} />
									<DeleteButton id={record.id ?? ''} />
								</Space>
							)}
						/>
					</Table>
				</div>
			</List>
		</div>
	)
}
