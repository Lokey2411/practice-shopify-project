import { Request, Response } from 'express'
import { Order, Product } from '@model/index'
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
			{ status: 'Processing', address: req.body.address },
			{ new: true },
		)
		if (!order) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đơn hàng')
		}

		// Giảm tồn kho sản phẩm
		for (const item of order.products) {
			const product = await Product.findById(item.productId)
			if (!product) {
				return res.status(STATUS.NOT_FOUND).json(`Không tìm thấy sản phẩm với id ${item.productId}`)
			}
			// BỎ KIỂM TRA TỒN KHO ĐỂ LUÔN CHO PHÉP THANH TOÁN
			product.stock -= item.quantity
			await product.save()
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

/**
 * Lấy danh sách đơn hàng của user
 */
export const getMyOrders = async (req: Request, res: Response) => {
	try {
		const { userId } = (req as any).user;
		const orders = await Order.find({ userId, isDeleted: false }).sort({ createdAt: -1 });
		return res.status(200).json(orders);
	} catch (error) {
		console.error('Lỗi khi lấy đơn hàng:', error);
		return res.status(500).json({ message: 'Lỗi khi lấy danh sách đơn hàng', error: (error as Error).message });
	}
};

/**
 * Hủy đơn hàng (chỉ cho phép hủy đơn hàng có status Pending)
 * @requires orderId - ID của đơn hàng (bắt buộc trong params)
 */
export const cancelOrder = async (req: Request<OrderParams>, res: Response) => {
	const { userId } = (req as any).user
	const { orderId } = req.params

	try {
		const order = await Order.findOne({ _id: orderId, userId, isDeleted: false })
		if (!order) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đơn hàng')
		}

		if (order.status !== 'Pending') {
			return res.status(STATUS.BAD_REQUEST).json('Chỉ có thể hủy đơn hàng đang chờ xử lý')
		}

		order.status = 'Cancelled'
		await order.save()

		return res.json('Hủy đơn hàng thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi hủy đơn hàng: ${(error as Error).message}`)
	}
}

export const authMiddleware = (req, res, next) => {
	try {
		// ...giải mã token, gán userId vào req.user
		next();
	} catch (error) {
		console.error('Lỗi trong authMiddleware:', error);
		res.status(401).json({ message: 'Lỗi xác thực', error: error.message });
	}
};

export const getOrderDetail = async (req, res) => {
	const { userId } = req.user;
	const { id } = req.params;

	const order = await Order.findOne({ _id: id, userId, isDeleted: false })
		.populate('products.productId')
		.populate('userId');
	console.log('productId after populate:', order.products[0].productId);

	if (!order) {
		return res.status(404).json({ message: 'Không tìm thấy đơn hàng' });
	}

	// Map lại dữ liệu sản phẩm cho FE
	const products = order.products.map((item: any) => {
		const product = item.productId as any;
		return {
			_id: product?._id || item.productId,
			name: product?.name || '',
			images: product?.images || [],
			price: product?.price || 0,
			quantity: item.quantity,
			author: product?.author || '',
			publisher: product?.publisher || '',
		};
	});

	return res.json({
		message: 'Lấy chi tiết đơn hàng thành công',
		data: {
			...order.toObject(),
			products,
			user: order.userId,
		}
	});
}
