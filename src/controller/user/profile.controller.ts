import { STATUS } from '@/constants'
import { User } from '@/model'
import { comparePassword } from '@/utils/comparePassword'
import { hashPassword } from '@/utils/hashPassword'
import { Request, Response } from 'express'

export const getProfile = async (req: Request, res: Response) => {
	const { userId } = (req as any).user
	try {
		const user = await User.findOne({ _id: userId })
		return res.status(STATUS.OK).json(user)
	} catch (error) {
		console.log(error)
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy người dùng: ${(error as Error).message}`)
	}
}

export const updateProfile = async (req: Request, res: Response) => {
	const { userId } = (req as any).user
	try {
		const user = await User.findOneAndUpdate({ _id: userId }, req.body, { new: true })
		return res.status(STATUS.OK).json(user)
	} catch (error) {
		console.log(error)
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Loi khi cap nhat nguoi dung: ${(error as Error).message}`)
	}
}

export const changePassword = async (req: Request, res: Response) => {
	const { userId } = (req as any).user
	try {
		const { password, newPassword, confirmPassword } = req.body
		// check password
		const [user, isMatch] = await Promise.all([
			User.findOne({ _id: userId }),
			comparePassword(password, (req as any).user.password),
		])
		if (!user) return res.status(STATUS.NOT_FOUND).json('Nguoi dung khong ton tai')
		if (newPassword !== confirmPassword) {
			return res.status(STATUS.BAD_REQUEST).json('Mật khẩu không khớp')
		}
		if (!isMatch) {
			return res.status(STATUS.UNAUTHORIZED).json('Mật khẩu cũ không đúng')
		}
		user.password = await hashPassword(newPassword)
		await user.save()
		return res.status(STATUS.OK).json(user)
	} catch (error) {
		console.log(error)
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Loi khi cap nhat nguoi dung: ${(error as Error).message}`)
	}
}
