import { Model, Document } from 'mongoose'
import { Response } from 'express'
import { STATUS } from '@/constants'

/**
 * Tìm document theo ID và trả về response
 * @param model - Model của Mongoose
 * @param id - ID cần tìm
 * @param res - Response object
 * @param entityName - Tên thực thể (ví dụ: 'Product', 'Category')
 * @param populateFields - Các trường cần populate (tùy chọn)
 */
export const handleFindById = async <T extends Document>(
    model: Model<T>,
    id: string,
    res: Response,
    entityName: string,
    populateFields?: string | string[],
): Promise<void> => {
    try {
        const query = model.findOne({ _id: id, isDeleted: false })
        if (populateFields) {
            query.populate(populateFields)
        }
        const item = await query.exec()
        if (!item) {
            res.status(STATUS.NOT_FOUND).json({ message: `${entityName} not found` })
            return
        }
        res.status(STATUS.OK).json({ message: `${entityName} retrieved successfully`, data: item })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving ${entityName}: ${error.message}` })
    }
}