import { Request, Response } from 'express'
import { User } from '@model/index'
import { hashPassword } from '@utils/hashPassword'
import { comparePassword } from '@utils/comparePassword'
import { generateToken } from '@utils/generateToken'
import { STATUS } from '@/constants'

/**
 * Đăng nhập người dùng
 * @requires email - Email của người dùng (bắt buộc)
 * @requires password - Mật khẩu của người dùng (bắt buộc)
 */
export const userLogin = async (req: Request, res: Response) => {
	const { email, password, username } = req.body

	if (!(email || username) || !password) {
		return res.status(STATUS.BAD_REQUEST).json('Email và mật khẩu là bắt buộc')
	}

	try {
		let user = await User.findOne({ email, isDeleted: false })
		if (!user) {
			user = await User.findOne({ username, isDeleted: false })
			if (!user) return res.status(STATUS.UNAUTHORIZED).json('Thông tin đăng nhập không hợp lệ')
		}

		const isMatch = await comparePassword(password, user.password)
		if (!isMatch) {
			return res.status(STATUS.UNAUTHORIZED).json('Thông tin đăng nhập không hợp lệ')
		}

		const token = generateToken(user._id.toString())
		return res.json({ message: 'Đăng nhập thành công', token })
	} catch (error) {
		console.error(error)
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json('Lỗi server khi đăng nhập')
	}
}

/**
 * Đăng ký người dùng
 * @requires username - Tên người dùng (bắt buộc)
 * @requires email - Email của người dùng (bắt buộc)
 * @requires password - Mật khẩu của người dùng (bắt buộc)
 */
export const userRegister = async (req: Request, res: Response) => {
	const { username, email, password } = req.body

	if (!username || !email || !password) {
		return res.status(STATUS.BAD_REQUEST).json('Username, email và mật khẩu là bắt buộc')
	}

	try {
		const existingUser = await User.findOne({ $or: [{ email }, { username }], isDeleted: false })
		if (existingUser) {
			return res.status(STATUS.BAD_REQUEST).json('Người dùng đã tồn tại')
		}

		const hashedPassword = await hashPassword(password)
		const user = new User({ username, email, password: hashedPassword })
		await user.save()

		const token = generateToken(user._id.toString())
		return res.json({ message: 'Đăng ký người dùng thành công', token })
	} catch (error) {
		console.error(error)
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json('Lỗi server khi đăng ký')
	}
}
