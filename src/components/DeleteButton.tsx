import { Button, Modal, notification, theme } from 'antd'
import { BaseKey, useDelete, useResource } from '@refinedev/core'
import { DeleteOutlined } from '@ant-design/icons'

const DeleteButton = ({ id }: { id: BaseKey }) => {
	const { resource } = useResource();
	const { mutate: deleteItem } = useDelete()
	const handleDelete = () => {
		Modal.confirm({
			title: 'Bạn có chắc muốn xóa?',
			okText: 'Xóa',
			cancelText: 'Hủy',
			onOk: () => {
				deleteItem(
					{
						resource: `${resource?.list}`,
						id,
					},
					{
						onSuccess: () => {
							console.log('Delete successful')
							notification.success({
								message: 'Xóa thành công',
								description: 'Bản ghi đã được xóa.',
							})
						},
						onError: error => {
							console.error('Delete error:', error)
							notification.error({
								message: 'Lỗi xóa',
								description: error.message ?? 'Không thể xóa bản ghi',
							})
						},
					},
				)
			},
		})
	}

	return (
		<Button danger onClick={handleDelete}>
			<DeleteOutlined color={theme.defaultSeed.colorError} />
		</Button>
	)
}

export default DeleteButton
