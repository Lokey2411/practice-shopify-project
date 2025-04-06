import { Request, Response } from 'express'
import { Order } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Mua sản phẩm (chuyển status từ Pending sang Processing)
 */
export const purchaseProducts = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { orderId } = req.params
    try {
        const order = await Order.findOneAndUpdate(
            { _id: orderId, userId, status: 'Pending', isDeleted: false },
            { status: 'Processing' },
            { new: true },
        )
        if (!order) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Order not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Purchase successful' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error purchasing products: ${error.message}` })
    }
}