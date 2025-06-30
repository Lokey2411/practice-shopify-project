import { Request, Response } from 'express'
import { Order } from '@model/index'
import { CART_STATUS, STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'
import { OrderDocument } from '@/model/Order.Model'

// Định nghĩa kiểu cho req.params
interface CartParams {
	orderId: string
	categoryId: string
	productId: string
}
/**
 * Thêm sản phẩm vào giỏ hàng (tạo order với status CART_STATUS)
 * @requires products - Danh sách sản phẩm (bắt buộc)
 * @requires price - Tổng giá (bắt buộc)
 * @requires address - Địa chỉ giao hàng (bắt buộc)
 */
export const addToCart = async (req: Request, res: Response) => {
	const { userId } = (req as any).user
	const { products, price, address } = req.body

	const totalPrice = Number(price);
	if (!products || isNaN(totalPrice) || address === undefined || address === null) {
		return res.status(STATUS.BAD_REQUEST).json('Sản phẩm, giá và địa chỉ là bắt buộc');
	}

	try {
		let order = await Order.findOne({ userId, status: CART_STATUS, isDeleted: false })
		if (order) {
			order.products.push(...products)
			order.price += totalPrice
		} else
			order = new Order({
				userId,
				products,
				price: totalPrice,
				address,
				status: CART_STATUS,
			})
		await order.save()
		return res.json('Thêm vào giỏ hàng thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi thêm vào giỏ hàng: ${(error as Error).message}`)
	}
}

/**
 * Cập nhật giỏ hàng
 * @requires orderId - ID của đơn hàng (bắt buộc trong params)
 * @optional products - Danh sách sản phẩm
 * @optional price - Tổng giá
 * @optional address - Địa chỉ giao hàng
 */
export const updateCart = async (req: Request<CartParams>, res: Response) => {
	const { userId } = (req as any).user

	try {
		const order = await Order.findOneAndUpdate({ userId, status: CART_STATUS, isDeleted: false }, req.body, {
			new: true,
		})
		if (!order) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy giỏ hàng')
		}
		return res.json('Cập nhật giỏ hàng thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật giỏ hàng: ${(error as Error).message}`)
	}
}

/**
 * Xóa sản phẩm khỏi giỏ hàng
 * @requires orderId - ID của đơn hàng (bắt buộc trong params)
 */
export const removeFromCart = async (req: Request<CartParams>, res: Response) => {
	const { userId } = (req as any).user

	try {
		const order = await Order.findOne({ userId, status: CART_STATUS, isDeleted: false })
		if (!order) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy giỏ hàng')
		}
		order.products = order.products.filter(product => product.productId.toString() !== req.body.productId)
		await order.save()
		return res.json('Xóa sản phẩm khỏi giỏ hàng thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi xóa khỏi giỏ hàng: ${(error as Error).message}`)
	}
}

/**
 * Lấy danh sách sản phẩm trong giỏ hàng
 * @optional filter - Lọc theo products, price
 * @optional sortBy - Sắp xếp theo price, createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getCart = async (req: Request, res: Response) => {
	const { userId } = (req as any).user

	try {
		const sortBy = req.query.sortBy as keyof OrderDocument
		const sortOrder = req.query.sortOrder as 'asc' | 'desc'
		const filterQuery: OrderDocument = {
			_id: req.query.orderId as any,
			products: req.query.products as any,
			price: req.query.price as any,
		}
		const filter = applyFilter<OrderDocument>(filterQuery, ['products', 'price'])
		filter.userId = userId
		filter.status = CART_STATUS
		const sort = applySort<OrderDocument>({ sortBy, sortOrder }, ['price', 'createdAt'])
		const orders = await Order.find(filter).populate('products').sort(sort)
		return res.json({ message: 'Lấy giỏ hàng thành công', data: orders })
	} catch (error) {
		if (error instanceof TypeError)
			return res
				.status(STATUS.BAD_REQUEST)
				.json('Lỗi: sortBy phải là một trong các trường sau: price, cresatedAts và sortOrder phải là asc hoặc desc')
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy giỏ hàng: ${(error as Error).message}`)
	}
}

/**
 * Lấy sản phẩm trong giỏ hàng theo danh mục
 * @requires categoryId - ID của danh mục (bắt buộc trong params)
 * @optional filter - Lọc theo price
 * @optional sortBy - Sắp xếp theo price, createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getCartByCategory = async (req: Request<CartParams>, res: Response) => {
	const { userId } = (req as any).user
	const { categoryId } = req.params

	try {
		const sortBy = req.query.sortBy as keyof OrderDocument
		const sortOrder = req.query.sortOrder as 'asc' | 'desc'
		const filterQuery: OrderDocument = {
			_id: req.query.orderId as any,
			products: req.query.products as any,
			price: req.query.price as any,
		}
		const filter = applyFilter<OrderDocument>(filterQuery, ['products', 'price'])
		filter.userId = userId
		filter.status = CART_STATUS
		const sort = applySort<OrderDocument>({ sortBy, sortOrder }, ['price', 'createdAt'])
		const orders = await Order.find(filter)
			.populate({
				path: 'products',
				match: { categories: categoryId },
			})
			.sort(sort)
		return res.json({ message: 'Lấy giỏ hàng theo danh mục thành công', data: orders })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy giỏ hàng: ${(error as Error).message}`)
	}
}

/**
 * Lấy sản phẩm trong giỏ hàng theo sản phẩm
 * @requires productId - ID của sản phẩm (bắt buộc trong params)
 */
export const getCartByProduct = async (req: Request<CartParams>, res: Response) => {
	const { userId } = (req as any).user
	const { productId } = req.params

	try {
		const order = await Order.findOne({
			userId,
			products: productId,
			status: CART_STATUS,
			isDeleted: false,
		}).populate('products')
		if (!order) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy sản phẩm trong giỏ hàng')
		}
		return res.json({ message: 'Lấy giỏ hàng thành công', data: order })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy giỏ hàng: ${(error as Error).message}`)
	}
}
