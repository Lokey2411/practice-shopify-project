import { Request, Response } from 'express'
import { Product } from '@model/index'
import { handleFindById } from '@utils/handleFindById'
import { STATUS } from '@/constants'

/**
 * Xem thông tin sản phẩm
 */
export const viewProduct = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    await handleFindById(Product, id, res, 'Product', 'categories')
}