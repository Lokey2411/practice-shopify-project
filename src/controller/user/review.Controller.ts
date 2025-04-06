import { Request, Response } from 'express'
import { Review } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Thêm đánh giá sản phẩm
 */
export const addReview = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { productId, rating, comment, images } = req.body
    try {
        const review = new Review({ userId, productId, rating, comment, images })
        await review.save()
        res.status(STATUS.OK).json({ message: 'Review added successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error adding review: ${error.message}` })
    }
}

/**
 * Cập nhật đánh giá
 */
export const updateReview = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { reviewId } = req.params
    try {
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, userId, isDeleted: false },
            req.body,
            { new: true },
        )
        if (!review) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Review not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Review updated successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error updating review: ${error.message}` })
    }
}

/**
 * Xóa đánh giá
 */
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    const { reviewId } = req.params
    try {
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, userId, isDeleted: false },
            { isDeleted: true },
            { new: true },
        )
        if (!review) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Review not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Review deleted successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error deleting review: ${error.message}` })
    }
}

/**
 * Lấy danh sách đánh giá của sản phẩm
 */
export const getReviewsByProduct = async (req: Request, res: Response): Promise<void> => {
    const { productId } = req.params
    try {
        const reviews = await Review.find({ productId, isDeleted: false }).populate('userId')
        res.status(STATUS.OK).json({ message: 'Reviews retrieved successfully', data: reviews })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving reviews: ${error.message}` })
    }
}

/**
 * Lấy đánh giá theo User ID
 */
export const getReviewsByUser = async (req: Request, res: Response): Promise<void> => {
    const { userId } = (req as any).user
    try {
        const reviews = await Review.find({ userId, isDeleted: false }).populate('productId')
        res.status(STATUS.OK).json({ message: 'Reviews retrieved successfully', data: reviews })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving reviews: ${error.message}` })
    }
}