import { STATUS } from '@/constants'
import { User } from '@/model'
import { NextFunction, Request, Response } from 'express'

export const adminRequire = async (req: Request, res: Response, next: NextFunction) => {
	try {
		// Log để debug
		console.log('adminRequire req.user:', (req as any).user);

		// Lấy userId từ _id hoặc userId (tùy trường hợp)
		const userId = (req as any).user?._id || (req as any).user?.userId;
		if (!userId) {
			res.status(STATUS.UNAUTHORIZED).json('Người dùng chưa đăng nhập');
			return;
		}

		// Lấy user từ DB
		const user = await User.findById(userId);
		console.log('adminRequire user from DB:', user);

		if (!user) {
			res.status(STATUS.UNAUTHORIZED).json('Người dùng chưa đăng nhập');
			return;
		}
		if (user.permission.includes('admin')) {
			next();
		} else {
			res.status(STATUS.FORBIDDEN).json('Người dùng không phải admin');
			return;
		}
	} catch (error) {
		res.status(STATUS.UNAUTHORIZED).json('Người dùng chưa đăng nhập');
		return;
	}
}
