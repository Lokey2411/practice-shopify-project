import { Request, Response } from 'express'
import { Sale, Product } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Thêm sale mới
 */
export const addSale = async (req: Request, res: Response): Promise<void> => {
    try {
        const sale = new Sale(req.body)
        await sale.save()
        res.status(STATUS.OK).json({ message: 'Sale added successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error adding sale: ${error.message}` })
    }
}

/**
 * Cập nhật sale
 */
export const updateSale = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const sale = await Sale.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
        if (!sale) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Sale not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Sale updated successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error updating sale: ${error.message}` })
    }
}

/**
 * Xóa sale (chuyển isDeleted thành true)
 */
export const deleteSale = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const sale = await Sale.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!sale) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Sale not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Sale deleted successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error deleting sale: ${error.message}` })
    }
}

/**
 * Lấy danh sách tất cả sản phẩm đang sale
 */
export const getAllSales = async (req: Request, res: Response): Promise<void> => {
    try {
        const sales = await Sale.find({ isDeleted: false }).populate('product')
        res.status(STATUS.OK).json({ message: 'Sales retrieved successfully', data: sales })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving sales: ${error.message}` })
    }
}

/**
 * Lấy sản phẩm đang sale theo danh mục
 */
export const getSalesByCategory = async (req: Request, res: Response): Promise<void> => {
    const { categoryId } = req.params
    try {
        const products = await Product.find({ categories: categoryId, isDeleted: false })
        const sales = await Sale.find({ product: { $in: products.map((p) => p._id) }, isDeleted: false }).populate(
            'product',
        )
        res.status(STATUS.OK).json({ message: 'Sales retrieved successfully', data: sales })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving sales: ${error.message}` })
    }
}

/**
 * Lấy sản phẩm đang sale theo sản phẩm
 */
export const getSaleByProduct = async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params
    try {
        const sale = await Sale.findOne({ product: productId, isDeleted: false }).populate('product')
        if (!sale) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Sale not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Sale retrieved successfully', data: sale })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving sale: ${error.message}` })
    }
}