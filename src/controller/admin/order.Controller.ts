import { Request, Response } from 'express'
import { Order } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Xem thông tin đơn hàng
 */
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const order = await Order.findOne({ _id: id, isDeleted: false }).populate('userId products')
        if (!order) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Order not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Order retrieved successfully', data: order })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving order: ${error.message}` })
    }
}

/**
 * Cập nhật trạng thái đơn hàng
 */
export const updateOrderStatus = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    const { status } = req.body
    try {
        const order = await Order.findOneAndUpdate(
            { _id: id, isDeleted: false },
            { status },
            { new: true },
        )
        if (!order) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Order not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Order status updated successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error updating order status: ${error.message}` })
    }
}

/**
 * Lấy danh sách tất cả đơn hàng
 */
export const getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
        const orders = await Order.find({ isDeleted: false }).populate('userId products')
        res.status(STATUS.OK).json({ message: 'Orders retrieved successfully', data: orders })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving orders: ${error.message}` })
    }
}

/**
 * Lấy đơn hàng theo User ID
 */
export const getOrdersByUserId = async (req: Request, res: Response): Promise<void> => {
    const { userId } = req.params
    try {
        const orders = await Order.find({ userId, isDeleted: false }).populate('products')
        res.status(STATUS.OK).json({ message: 'Orders retrieved successfully', data: orders })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving orders: ${error.message}` })
    }
}