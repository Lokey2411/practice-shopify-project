import { Request, Response } from 'express'
import { Category } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Thêm danh mục mới
 */
export const addCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = new Category(req.body)
        await category.save()
        res.status(STATUS.OK).json({ message: 'Category added successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error adding category: ${error.message}` })
    }
}

/**
 * Cập nhật danh mục
 */
export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const category = await Category.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
        if (!category) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Category not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Category updated successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error updating category: ${error.message}` })
    }
}

/**
 * Xóa danh mục (chuyển isDeleted thành true)
 */
export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const category = await Category.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!category) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Category not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Category deleted successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error deleting category: ${error.message}` })
    }
}

/**
 * Lấy danh sách tất cả danh mục
 */
export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try {
        const categories = await Category.find({ isDeleted: false })
        res.status(STATUS.OK).json({ message: 'Categories retrieved successfully', data: categories })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving categories: ${error.message}` })
    }
}

/**
 * Lấy danh mục theo ID
 */
export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const category = await Category.findOne({ _id: id, isDeleted: false })
        if (!category) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Category not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Category retrieved successfully', data: category })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving category: ${error.message}` })
    }
}