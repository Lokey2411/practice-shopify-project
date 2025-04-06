import { Request, Response } from 'express'
import { Order } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Thêm sản phẩm vào giỏ hàng (tạo order với status 'Pending')
 */
export const addToCart = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { products, price, address } = req.body
    try {
        const order = new Order({ userId, products, price, address, status: 'Pending' })
        await order.save()
        res.status(STATUS.OK).json({ message: 'Product added to cart successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error adding to cart: ${error.message}` })
    }
}

/**
 * Cập nhật giỏ hàng
 */
export const updateCart = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { orderId } = req.params
    try {
        const order = await Order.findOneAndUpdate(
            { _id: orderId, userId, status: 'Pending', isDeleted: false },
            req.body,
            { new: true },
        )
        if (!order) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Cart not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Cart updated successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error updating cart: ${error.message}` })
    }
}

/**
 * Xóa sản phẩm khỏi giỏ hàng
 */
export const removeFromCart = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { orderId } = req.params
    try {
        const order = await Order.findOneAndUpdate(
            { _id: orderId, userId, status: 'Pending', isDeleted: false },
            { isDeleted: true },
            { new: true },
        )
        if (!order) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Cart not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Product removed from cart successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error removing from cart: ${error.message}` })
    }
}

/**
 * Lấy danh sách sản phẩm trong giỏ hàng
 */
export const getCart = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    try {
        const orders = await Order.find({ userId, status: 'Pending', isDeleted: false }).populate('products')
        res.status(STATUS.OK).json({ message: 'Cart retrieved successfully', data: orders })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving cart: ${error.message}` })
    }
}

/**
 * Lấy sản phẩm trong giỏ hàng theo danh mục
 */
export const getCartByCategory = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { categoryId } = req.params
    try {
        const orders = await Order.find({ userId, status: 'Pending', isDeleted: false }).populate({
            path: 'products',
            match: { categories: categoryId },
        })
        res.status(STATUS.OK).json({ message: 'Cart retrieved successfully', data: orders })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving cart: ${error.message}` })
    }
}

/**
 * Lấy sản phẩm trong giỏ hàng theo sản phẩm
 */
export const getCartByProduct = async (req: Request, res: Response): Promise<void> => {
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
            res.status(STATUS.NOT_FOUND).json({ message: 'Product not found in cart' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Cart retrieved successfully', data: order })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving cart: ${error.message}` })
    }
}