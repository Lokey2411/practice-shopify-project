import { BooleanField, DeleteButton, EditButton, List, ShowButton, useTable } from '@refinedev/antd'
import type { BaseRecord } from '@refinedev/core'
import { Space, Table } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'

export const ProductList = () => {
	const { tableProps } = useTable({
		syncWithLocation: true,
	})

	return (
		<List>
			<Table {...tableProps} rowKey='id'>
				<Table.Column dataIndex='name' title={'Name'} />
				<Table.Column dataIndex={'price'} title={'Price'} />
				<Table.Column dataIndex={'sizes'} title={'Sizes'} render={(sizes: string[]) => sizes.join(', ')} />
				<Table.Column dataIndex={'colors'} title={'Colors'} render={(colors: string[]) => colors.join(', ')} />
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
