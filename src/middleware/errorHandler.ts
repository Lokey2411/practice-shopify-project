import { Request, Response, NextFunction } from 'express'
import { STATUS } from '@/constants'

/**
 * Xử lý lỗi toàn cục và trả về thông báo dạng string
 * @param err - Lỗi phát sinh
 * @param req - Request từ client
 * @param res - Response trả về
 * @param next - Chuyển tiếp request
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error('Error:', err.message)

    const statusCode = err.status || STATUS.INTERNAL_SERVER_ERROR
    res.status(statusCode).json({ message: statusCode === STATUS.INTERNAL_SERVER_ERROR ? 'Internal server error' : err.message })
}