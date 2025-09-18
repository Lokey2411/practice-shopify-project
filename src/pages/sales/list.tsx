import { BooleanField, DeleteButton, EditButton, List, ShowButton, useTable } from '@refinedev/antd'
import type { BaseRecord } from '@refinedev/core'
import { Space, Table } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

export const SaleList = () => {
	const { tableProps } = useTable({
		syncWithLocation: true,
	})

	return (
		<List>
			<Table {...tableProps} rowKey='id'>
				<Table.Column dataIndex='name' title={'Name'} />
				<Table.Column
					dataIndex={'product'}
					title={'Product'}
					render={(product: BaseRecord) => (
						<h1>{product.name}</h1>
					)}
				/>
				<Table.Column
					dataIndex={'percentage'}
					title={'Percentage'}
				/>
				<Table.Column
					dataIndex={'isFlashSale'}
					title={'Is Flash Sale'}
					render={(isFlashSale: boolean) => {
						return isFlashSale ? (
							<CheckCircleOutlined style={{ color: 'green' }} />
						) : (
							<CloseCircleOutlined style={{ color: 'red' }} />
						)
					}}
				/>
				<Table.Column
					title={'Actions'}
					dataIndex='actions'
					render={(_, record: BaseRecord) => (
						<Space>
							<EditButton hideText size='small' recordItemId={record.id} />
							<ShowButton hideText size='small' recordItemId={record.id} />
							<DeleteButton hideText size='small' recordItemId={record.id} />
						</Space>
					)}
				/>
			</Table>
		</List>
	)
}
