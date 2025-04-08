import { Request, Response } from 'express'
import { Order } from '@model/index'
import { STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'

/**
 * Xem thông tin đơn hàng
 * @requires id - ID của đơn hàng (bắt buộc trong params)
 */
export const getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const order = await Order.findOne({ _id: id, isDeleted: false }).populate('userId products')
        if (!order) {
            return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đơn hàng')
        }
        return res.json({ message: 'Lấy đơn hàng thành công', data: order })
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy đơn hàng: ${(error as Error).message}`)
    }
}

/**
 * Cập nhật trạng thái đơn hàng
 * @requires id - ID của đơn hàng (bắt buộc trong params)
 * @requires status - Trạng thái mới của đơn hàng (bắt buộc)
 */
export const updateOrderStatus = async (req: Request, res: Response) => {
    const { id } = req.params
    const { status } = req.body

    if (!status) {
        return res.status(STATUS.BAD_REQUEST).json('Trạng thái là bắt buộc')
    }

    try {
        const order = await Order.findOneAndUpdate({ _id: id, isDeleted: false }, { status }, { new: true })
        if (!order) {
            return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đơn hàng')
        }
        return res.json('Cập nhật trạng thái đơn hàng thành công')
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật trạng thái: ${(error as Error).message}`)
    }
}

/**
 * Lấy danh sách tất cả đơn hàng
 * @optional filter - Lọc theo status, userId
 * @optional sortBy - Sắp xếp theo status, createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const filter = applyFilter(req.query, ['status', 'userId'])
        const sort = applySort(req.query, ['status', 'createdAt'])
        const orders = await Order.find(filter).populate('userId products').sort(sort)
        return res.json({ message: 'Lấy danh sách đơn hàng thành công', data: orders })
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy danh sách đơn hàng: ${(error as Error).message}`)
    }
}

/**
 * Lấy đơn hàng theo User ID
 * @requires userId - ID của người dùng (bắt buộc trong params)
 * @optional filter - Lọc theo status
 * @optional sortBy - Sắp xếp theo status, createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getOrdersByUserId = async (req: Request, res: Response) => {
    const { userId } = req.params

    try {
        const filter = applyFilter(req.query, ['status'])
        filter.userId = userId
        const sort = applySort(req.query, ['status', 'createdAt'])
        const orders = await Order.find(filter).populate('products').sort(sort)
        return res.json({ message: 'Lấy đơn hàng theo user thành công', data: orders })
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy đơn hàng: ${(error as Error).message}`)
    }
}