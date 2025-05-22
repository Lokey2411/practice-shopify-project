import { DeleteButton, EditButton, List, ShowButton, useTable } from '@refinedev/antd'
import type { BaseRecord } from '@refinedev/core'
import { Space, Table } from 'antd'

export const ProductList = () => {
	const { tableProps } = useTable({
		syncWithLocation: true,
	})

	return (
		<List>
			<Table {...tableProps} rowKey='id'>
				<Table.Column dataIndex='name' title={'Name'} />
				<Table.Column dataIndex={'price'} title={'Price'} />
				<Table.Column dataIndex={'author'} title={'Author'} />
				<Table.Column dataIndex={'publisher'} title={'Publisher'} />
				<Table.Column dataIndex={'publishedDate'} title={'Published date'} />
				<Table.Column dataIndex={'numPage'} title={'Pages'} />
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
