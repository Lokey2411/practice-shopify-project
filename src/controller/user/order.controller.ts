import { Request, Response } from 'express'
import { Order } from '@model/index'
import { STATUS } from '@/constants'

// Định nghĩa kiểu cho req.params
interface OrderParams {
	orderId: string
}

/**
 * Mua sản phẩm (chuyển status từ Pending sang Processing)
 * @requires orderId - ID của đơn hàng (bắt buộc trong params)
 */
export const purchaseProducts = async (req: Request<OrderParams>, res: Response) => {
	const { userId } = (req as any).user
	const { orderId } = req.params

	try {
		const order = await Order.findOneAndUpdate(
			{ _id: orderId, userId, status: 'Pending', isDeleted: false },
			{ status: 'Processing' },
			{ new: true },
		)
		if (!order) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đơn hàng')
		}
		return res.json('Mua hàng thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi mua hàng: ${(error as Error).message}`)
	}
}

export const updateOrder = async (req: Request<OrderParams>, res: Response) => {
	try {
		const { userId } = (req as any).user
		const { productId, quantity } = req.body
		const order = await Order.findOneAndUpdate({
			userId,
		})
		if (!order) return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đơn hàng')
		const productInCartIndex = order.products.findIndex(product => product.productId === productId)
		order.products[productInCartIndex].quantity = quantity
		await order.save()
		return res.status(STATUS.OK).json('Cập nhật giỏ hàng thành công')
	} catch (error) {
		console.error(error)
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật trạng thái: ${(error as Error).message}`)
	}
}
