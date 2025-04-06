import { Request, Response } from 'express'
import { Product } from '@model/index'
import { handleFindById } from '@utils/handleFindById'
import { STATUS } from '@/constants'

/**
 * Thêm sản phẩm mới
 */
export const addProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = new Product(req.body)
        await product.save()
        res.status(STATUS.OK).json({ message: 'Product added successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error adding product: ${error.message}` })
    }
}

/**
 * Cập nhật sản phẩm
 */
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const product = await Product.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
        if (!product) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Product not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Product updated successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error updating product: ${error.message}` })
    }
}

/**
 * Xóa sản phẩm (chuyển isDeleted thành true)
 */
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const product = await Product.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!product) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Product not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Product deleted successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error deleting product: ${error.message}` })
    }
}

/**
 * Lấy danh sách tất cả sản phẩm
 */
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find({ isDeleted: false }).populate('categories')
        res.status(STATUS.OK).json({ message: 'Products retrieved successfully', data: products })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving products: ${error.message}` })
    }
}

/**
 * Lấy sản phẩm theo ID
 */
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    await handleFindById(Product, id, res, 'Product', 'categories')
}

/**
 * Lấy sản phẩm theo danh mục
 */
export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = req.params
    try {
        const products = await Product.find({ categories: categoryId, isDeleted: false }).populate('categories')
        res.status(STATUS.OK).json({ message: 'Products retrieved successfully', data: products })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving products: ${error.message}` })
    }
}