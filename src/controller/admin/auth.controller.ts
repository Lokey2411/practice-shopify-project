import { Request, Response } from 'express'
import { User } from '@model/index'
import { hashPassword } from '@utils/hashPassword'
import { comparePassword } from '@utils/comparePassword'
import { generateToken } from '@utils/generateToken'
import { STATUS } from '@/constants'

/**
 * Đăng nhập admin
 * @requires email | username - Email hoặc username của admin (bắt buộc)
 * @requires password - Mật khẩu của admin (bắt buộc)
 */
export const adminLogin = async (req: Request, res: Response) => {
	const { username, email, password } = req.body

	if (!(email || username) || !password) {
		return res.status(STATUS.BAD_REQUEST).json('Email và mật khẩu là bắt buộc')
	}

	try {
		const user =
			(await User.findOne({ email, isDeleted: false })) ?? (await User.findOne({ username, isDeleted: false }))
		if (!user) {
			return res.status(STATUS.UNAUTHORIZED).json('Thông tin đăng nhập không hợp lệ! Sai email')
		}
		const isMatch = await comparePassword(password, user.password)
		if (!isMatch) {
			return res.status(STATUS.UNAUTHORIZED).json('Thông tin đăng nhập không hợp lệ')
		}
		if (!user.permission.some(permission => permission === 'admin')) {
			return res.status(STATUS.FORBIDDEN).json('Thông tin đăng nhập không phải của admin')
		}

		const { password: userPassword, ...userData } = user // return userData without password

		const token = generateToken(String(user._id)) // NOSONAR
		return res.json({ message: 'Đăng nhập thành công', token, data: userData })
	} catch (error) {
		console.error(error)
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json('Lỗi server khi đăng nhập')
	}
}

/**
 * Đăng ký admin (chỉ dùng trong dev)
 * @requires username - Tên người dùng (bắt buộc)
 * @requires email - Email của admin (bắt buộc)
 * @requires password - Mật khẩu của admin (bắt buộc)
 */
export const adminRegister = async (req: Request, res: Response) => {
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
		const user = new User({
			username,
			email,
			password: hashedPassword,
			permission: ['admin'],
		})
		await user.save()

		const token = generateToken(String(user._id)) //NOSONAR
		return res.json({ message: 'Đăng ký admin thành công', token })
	} catch (error) {
		console.error(error)
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json('Lỗi server khi đăng ký')
	}
}
