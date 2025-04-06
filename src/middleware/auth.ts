import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@config/env'
import { STATUS } from '@/constants'

interface AuthRequest extends Request {
    user?: any
}

/**
 * Middleware xác thực token JWT
 * @param req - Request từ client
 * @param res - Response trả về
 * @param next - Chuyển tiếp request
 * @returns {void | Response} - Không trả về gì nếu thành công, hoặc Response nếu có lỗi
 */
export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void | Response => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(STATUS.UNAUTHORIZED).json({ message: 'Unauthorized - No token provided' })
    }

    try {
        req.user = jwt.verify(token, JWT_SECRET)
        next()
    } catch (error) {
        return res.status(STATUS.UNAUTHORIZED).json({ message: 'Unauthorized - Invalid token' })
    }
}