import { Request, Response } from 'express'
import { Favorite } from '@model/index'
import { STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'

// Định nghĩa kiểu cho req.params
interface FavoriteParams {
    productId: string
    categoryId: string
}

/**
 * Thêm sản phẩm yêu thích
 * @requires productId - ID của sản phẩm (bắt buộc)
 */
export const addFavorite = async (req: Request, res: Response) => {
    const { userId } = (req as any).user
    const { productId } = req.body

    if (!productId) {
        return res.status(STATUS.BAD_REQUEST).json('ID sản phẩm là bắt buộc')
    }

    try {
        let favorite = await Favorite.findOne({ userId, isDeleted: false })
        if (!favorite) {
            favorite = new Favorite({ userId, products: [productId] })
        } else {
            favorite.products.push(productId)
        }
        await favorite.save()
        return res.json('Thêm sản phẩm yêu thích thành công')
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi thêm yêu thích: ${(error as Error).message}`)
    }
}

/**
 * Cập nhật danh sách yêu thích
 * @requires products - Danh sách sản phẩm yêu thích (bắt buộc)
 */
export const updateFavorite = async (req: Request, res: Response) => {
    const { userId } = (req as any).user
    const { products } = req.body

    if (!products) {
        return res.status(STATUS.BAD_REQUEST).json('Danh sách sản phẩm là bắt buộc')
    }

    try {
        const favorite = await Favorite.findOneAndUpdate(
            { userId, isDeleted: false },
            { products },
            { new: true },
        )
        if (!favorite) {
            return res.status(STATUS.NOT_FOUND).json('Không tìm thấy danh sách yêu thích')
        }
        return res.json('Cập nhật danh sách yêu thích thành công')
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật yêu thích: ${(error as Error).message}`)
    }
}

/**
 * Xóa sản phẩm yêu thích
 * @requires productId - ID của sản phẩm (bắt buộc trong params)
 */
export const removeFavorite = async (req: Request<FavoriteParams>, res: Response) => {
    const { userId } = (req as any).user
    const { productId } = req.params

    try {
        const favorite = await Favorite.findOne({ userId, isDeleted: false })
        if (!favorite) {
            return res.status(STATUS.NOT_FOUND).json('Không tìm thấy danh sách yêu thích')
        }
        favorite.products = favorite.products.filter((p) => p.toString() !== productId)
        await favorite.save()
        return res.json('Xóa sản phẩm yêu thích thành công')
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi xóa yêu thích: ${(error as Error).message}`)
    }
}

/**
 * Lấy danh sách sản phẩm yêu thích
 * @optional filter - Lọc theo products
 * @optional sortBy - Sắp xếp theo createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getFavorites = async (req: Request, res: Response) => {
    const { userId } = (req as any).user

    try {
        const filter = applyFilter(req.query, ['products'])
        filter.userId = userId
        const sort = applySort(req.query, ['createdAt'])
        const favorite = await Favorite.findOne(filter).populate('products').sort(sort)
        return res.json({ message: 'Lấy danh sách yêu thích thành công', data: favorite?.products || [] })
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy yêu thích: ${(error as Error).message}`)
    }
}

/**
 * Lấy sản phẩm yêu thích theo danh mục
 * @requires categoryId - ID của danh mục (bắt buộc trong params)
 * @optional filter - Lọc theo products
 * @optional sortBy - Sắp xếp theo createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getFavoritesByCategory = async (req: Request<FavoriteParams>, res: Response) => {
    const { userId } = (req as any).user
    const { categoryId } = req.params

    try {
        const filter = applyFilter(req.query, ['products'])
        filter.userId = userId
        const sort = applySort(req.query, ['createdAt'])
        const favorite = await Favorite.findOne(filter)
            .populate({
                path: 'products',
                match: { categories: categoryId },
            })
            .sort(sort)
        return res.json({ message: 'Lấy yêu thích theo danh mục thành công', data: favorite?.products || [] })
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy yêu thích: ${(error as Error).message}`)
    }
}

/**
 * Lấy sản phẩm yêu thích theo sản phẩm
 * @requires productId - ID của sản phẩm (bắt buộc trong params)
 */
export const getFavoriteByProduct = async (req: Request<FavoriteParams>, res: Response) => {
    const { userId } = (req as any).user
    const { productId } = req.params

    try {
        const favorite = await Favorite.findOne({ userId, products: productId, isDeleted: false }).populate('products')
        if (!favorite) {
            return res.status(STATUS.NOT_FOUND).json('Không tìm thấy sản phẩm trong yêu thích')
        }
        return res.json({ message: 'Lấy yêu thích thành công', data: favorite })
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy yêu thích: ${(error as Error).message}`)
    }
}