import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@config/env'
import { STATUS } from '@/constants'

// Định nghĩa interface cho payload của JWT
interface JwtPayload {
	id: string | number
	username?: string
	[key: string]: any
}

// Mở rộng Request với generic params
interface AuthRequest<P = any> extends Request<P> {
	user?: JwtPayload
}

/**
 * Middleware xác thực token JWT
 * @param req - Request từ client
 * @param res - Response trả về
 * @param next - Chuyển tiếp request
 */
export const authMiddleware = <P = any>(req: AuthRequest<P>, res: Response, next: NextFunction): void => {
	const authHeader = req.header('Authorization')

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		res.status(STATUS.UNAUTHORIZED).json({ message: 'Unauthorized - No token provided' })
		return
	}

	const token = authHeader.split(' ')[1]

	if (!token) {
		res.status(STATUS.UNAUTHORIZED).json({ message: 'Unauthorized - Invalid token format' })
		return
	}

	try {
		const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload
		req.user = decoded
		next()
	} catch (error) {
		res.status(STATUS.UNAUTHORIZED).json({ message: 'Unauthorized - Invalid token' })
		return
	}
}
