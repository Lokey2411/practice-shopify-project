import { Request, Response, NextFunction } from 'express'

/**
 * Ghi log thông tin request
 * @param req - Request từ client
 * @param res - Response trả về
 * @param next - Chuyển tiếp request
 */
export const logger = (req: Request, res: Response, next: NextFunction): void => {
    console.log(`${req.method} ${req.url}`)
    next()
}