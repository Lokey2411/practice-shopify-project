import { Request, Response } from 'express'
import { User } from '@model/index'
import { STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'
import { UserDocument } from '@/model/User.Model'

/**
 * Sửa thông tin người dùng
 * @requires id - ID của người dùng (bắt buộc trong params)
 * @optional username - Tên người dùng
 * @optional email - Email
 * @optional permission - Quyền hạn
 */
export const updateUser = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const user = await User.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
		if (!user) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy người dùng')
		}
		return res.json('Người dùng được cập nhật thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật người dùng: ${(error as Error).message}`)
	}
}

/**
 * Lấy danh sách tất cả người dùng
 * @optional filter - Lọc theo username, email, permission
 * @optional sortBy - Sắp xếp theo username, createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getAllUsers = async (req: Request, res: Response) => {
	try {
		const requestQuery = req.query as any
		const filterQuery: UserDocument = {
			_id: requestQuery.id,
			username: requestQuery.username,
			email: requestQuery.email,
			permission: requestQuery.permission,
		}
		const { sortBy, sortOrder } = req.query

		const filter = applyFilter<UserDocument>(filterQuery, ['username', 'email', 'permission'])
		const sort = applySort<UserDocument>({ sortBy, sortOrder }, ['username', 'createdAt'])
		const users = await User.find(filter).sort(sort)
		return res.json({ message: 'Lấy danh sách người dùng thành công', data: users })
	} catch (error) {
		return res
			.status(STATUS.INTERNAL_SERVER_ERROR)
			.json(`Lỗi khi lấy danh sách người dùng: ${(error as Error).message}`)
	}
}

/**
 * Lấy người dùng theo ID
 * @requires id - ID của người dùng (bắt buộc trong params)
 */
export const getUserById = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const user = await User.findOne({ _id: id, isDeleted: false })
		if (!user) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy người dùng')
		}
		return res.json({ message: 'Lấy người dùng thành công', data: user })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy người dùng: ${(error as Error).message}`)
	}
}
