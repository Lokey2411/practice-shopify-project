import { DeleteButton, EditButton, List, ShowButton, useTable } from "@refinedev/antd";
import type { BaseRecord } from "@refinedev/core";
import { Space, Table } from "antd";

export const UserList = () => {
	const { tableProps } = useTable({
		syncWithLocation: true,
	});

	return (
		<div className="p-6 bg-blue-50 rounded-2xl shadow-lg">
			<List>
				<div className='overflow-x-auto rounded-lg shadow-lg bg-white'>
					<Table
						{...tableProps}
						rowKey="id"
						bordered
						pagination={{ pageSize: 10 }}
						className='custom-admin-table'
						style={{ background: 'white', borderRadius: 12 }}
					>
						<Table.Column
							dataIndex="id"
							title={<span className='text-blue-700 font-bold'>ID</span>}
						/>
						<Table.Column
							dataIndex="username"
							title={<span className='text-blue-700 font-bold'>Username</span>}
						/>
						<Table.Column
							dataIndex="title"
							title={<span className='text-blue-700 font-bold'>Title</span>}
						/>
						<Table.Column
							title={<span className='text-blue-700 font-bold'>Actions</span>}
							dataIndex="actions"
							render={(_, record: BaseRecord) => (
								<Space>
									<EditButton
										hideText
										size="small"
										recordItemId={record.id}
										style={{ color: '#2563eb', borderColor: '#2563eb' }}
									/>
									<ShowButton
										hideText
										size="small"
										recordItemId={record.id}
										style={{ color: '#0ea5e9', borderColor: '#0ea5e9' }}
									/>
									<DeleteButton
										hideText
										size="small"
										recordItemId={record.id}
									/>
								</Space>
							)}
						/>
					</Table>
				</div>
			</List>
		</div>
	);
};
