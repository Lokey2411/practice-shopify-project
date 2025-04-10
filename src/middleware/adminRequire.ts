import { STATUS } from '@/constants'
import { User } from '@/model'
import { NextFunction, Request, Response } from 'express'

export const adminRequire = async (req: Request, res: Response, next: NextFunction) => {
	try {
		const { userId } = (req as any).user
		const user = await User.findById(userId)
		if (!user) {
			res.status(STATUS.UNAUTHORIZED).json('Người dùng chưa đăng nhập')
			return
		}
		if (user.permission.includes('admin')) {
			next()
		} else {
			res.status(STATUS.FORBIDDEN).json('Người dùng không phải admin')
			return
		}
	} catch (error) {
		res.status(STATUS.UNAUTHORIZED).json('Người dùng chưa đăng nhập')
		return
	}
}
