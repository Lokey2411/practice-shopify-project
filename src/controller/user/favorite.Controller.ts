import { Request, Response } from 'express'
import { Favorite } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Thêm sản phẩm yêu thích
 */
export const addFavorite = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { productId } = req.body
    try {
        let favorite = await Favorite.findOne({ userId, isDeleted: false })
        if (!favorite) {
            favorite = new Favorite({ userId, products: [productId] })
        } else {
            favorite.products.push(productId)
        }
        await favorite.save()
        res.status(STATUS.OK).json({ message: 'Product added to favorites successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error adding favorite: ${error.message}` })
    }
}

/**
 * Cập nhật danh sách yêu thích
 */
export const updateFavorite = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { products } = req.body
    try {
        const favorite = await Favorite.findOneAndUpdate(
            { userId, isDeleted: false },
            { products },
            { new: true },
        )
        if (!favorite) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Favorites not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Favorites updated successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error updating favorites: ${error.message}` })
    }
}

/**
 * Xóa sản phẩm yêu thích
 */
export const removeFavorite = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { productId } = req.params
    try {
        const favorite = await Favorite.findOne({ userId, isDeleted: false })
        if (!favorite) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Favorites not found' })
            return
        }
        favorite.products = favorite.products.filter((p) => p.toString() !== productId)
        await favorite.save()
        res.status(STATUS.OK).json({ message: 'Product removed from favorites successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error removing favorite: ${error.message}` })
    }
}

/**
 * Lấy danh sách sản phẩm yêu thích
 */
export const getFavorites = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    try {
        const favorite = await Favorite.findOne({ userId, isDeleted: false }).populate('products')
        res.status(STATUS.OK).json({ message: 'Favorites retrieved successfully', data: favorite?.products || [] })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving favorites: ${error.message}` })
    }
}

/**
 * Lấy sản phẩm yêu thích theo danh mục
 */
export const getFavoritesByCategory = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { categoryId } = req.params
    try {
        const favorite = await Favorite.findOne({ userId, isDeleted: false }).populate({
            path: 'products',
            match: { categories: categoryId },
        })
        res.status(STATUS.OK).json({ message: 'Favorites retrieved successfully', data: favorite?.products || [] })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving favorites: ${error.message}` })
    }
}

/**
 * Lấy sản phẩm yêu thích theo sản phẩm
 */
export const getFavoriteByProduct = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { productId } = req.params
    try {
        const favorite = await Favorite.findOne({ userId, products: productId, isDeleted: false }).populate('products')
        if (!favorite) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Product not found in favorites' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Favorite retrieved successfully', data: favorite })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving favorite: ${error.message}` })
    }
}