import { Request, Response } from 'express'
import { Order } from '@model/index'
import { STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'

// Định nghĩa kiểu cho req.params
interface CartParams {
    orderId: string
    categoryId: string
    productId: string
}

/**
 * Thêm sản phẩm vào giỏ hàng (tạo order với status 'Pending')
 * @requires products - Danh sách sản phẩm (bắt buộc)
 * @requires price - Tổng giá (bắt buộc)
 * @requires address - Địa chỉ giao hàng (bắt buộc)
 */
export const addToCart = async (req: Request, res: Response) => {
    const { userId } = (req as any).user
    const { products, price, address } = req.body

    if (!products || !price || !address) {
        return res.status(STATUS.BAD_REQUEST).json('Sản phẩm, giá và địa chỉ là bắt buộc')
    }

    try {
        const order = new Order({ userId, products, price, address, status: 'Pending' })
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
    const { orderId } = req.params

    try {
        const order = await Order.findOneAndUpdate(
            { _id: orderId, userId, status: 'Pending', isDeleted: false },
            req.body,
            { new: true },
        )
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
    const { orderId } = req.params

    try {
        const order = await Order.findOneAndUpdate(
            { _id: orderId, userId, status: 'Pending', isDeleted: false },
            { isDeleted: true },
            { new: true },
        )
        if (!order) {
            return res.status(STATUS.NOT_FOUND).json('Không tìm thấy giỏ hàng')
        }
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
        const filter = applyFilter(req.query, ['products', 'price'])
        filter.userId = userId
        filter.status = 'Pending'
        const sort = applySort(req.query, ['price', 'createdAt'])
        const orders = await Order.find(filter).populate('products').sort(sort)
        return res.json({ message: 'Lấy giỏ hàng thành công', data: orders })
    } catch (error) {
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
        const filter = applyFilter(req.query, ['price'])
        filter.userId = userId
        filter.status = 'Pending'
        const sort = applySort(req.query, ['price', 'createdAt'])
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
            status: 'Pending',
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