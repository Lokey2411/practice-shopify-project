import { Request, Response } from 'express'
import { Product } from '@model/index'
import { handleFindById } from '@utils/handleFindById'

/**
 * Xem thông tin sản phẩm
 * @requires id - ID của sản phẩm (bắt buộc trong params)
 */
export const viewProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    await handleFindById(Product, id, res, 'Product', 'categories')
}