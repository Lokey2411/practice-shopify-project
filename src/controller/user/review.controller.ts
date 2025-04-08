import { Request, Response } from 'express'
import { Review } from '@model/index'
import { STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'

// Định nghĩa kiểu cho req.params
interface ReviewParams {
    reviewId: string
    productId: string
}

/**
 * Thêm đánh giá sản phẩm
 * @requires productId - ID của sản phẩm (bắt buộc)
 * @requires rating - Điểm đánh giá (bắt buộc)
 * @optional comment - Bình luận
 * @optional images - Hình ảnh
 */
export const addReview = async (req: Request, res: Response) => {
    const { userId } = (req as any).user
    const { productId, rating } = req.body

    if (!productId || !rating) {
        return res.status(STATUS.BAD_REQUEST).json('ID sản phẩm và điểm đánh giá là bắt buộc')
    }

    try {
        const review = new Review({ userId, productId, rating, ...req.body })
        await review.save()
        return res.json('Thêm đánh giá thành công')
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi thêm đánh giá: ${(error as Error).message}`)
    }
}

/**
 * Cập nhật đánh giá
 * @requires reviewId - ID của đánh giá (bắt buộc trong params)
 * @optional rating - Điểm đánh giá
 * @optional comment - Bình luận
 * @optional images - Hình ảnh
 */
export const updateReview = async (req: Request<ReviewParams>, res: Response) => {
    const { userId } = (req as any).user
    const { reviewId } = req.params

    try {
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, userId, isDeleted: false },
            req.body,
            { new: true },
        )
        if (!review) {
            return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đánh giá')
        }
        return res.json('Cập nhật đánh giá thành công')
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật đánh giá: ${(error as Error).message}`)
    }
}

/**
 * Xóa đánh giá
 * @requires reviewId - ID của đánh giá (bắt buộc trong params)
 */
export const deleteReview = async (req: Request<ReviewParams>, res: Response) => {
    const { userId } = (req as any).user
    const { reviewId } = req.params

    try {
        const review = await Review.findOneAndUpdate(
            { _id: reviewId, userId, isDeleted: false },
            { isDeleted: true },
            { new: true },
        )
        if (!review) {
            return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đánh giá')
        }
        return res.json('Xóa đánh giá thành công')
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi xóa đánh giá: ${(error as Error).message}`)
    }
}

/**
 * Lấy danh sách đánh giá của sản phẩm
 * @requires productId - ID của sản phẩm (bắt buộc trong params)
 * @optional filter - Lọc theo rating
 * @optional sortBy - Sắp xếp theo rating, createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getReviewsByProduct = async (req: Request<ReviewParams>, res: Response) => {
    const { productId } = req.params

    try {
        const filter = applyFilter(req.query, ['rating'])
        filter.productId = productId
        const sort = applySort(req.query, ['rating', 'createdAt'])
        const reviews = await Review.find(filter).populate('userId').sort(sort)
        return res.json({ message: 'Lấy danh sách đánh giá thành công', data: reviews })
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy đánh giá: ${(error as Error).message}`)
    }
}

/**
 * Lấy đánh giá theo User ID
 * @optional filter - Lọc theo productId, rating
 * @optional sortBy - Sắp xếp theo rating, createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getReviewsByUser = async (req: Request, res: Response) => {
    const { userId } = (req as any).user

    try {
        const filter = applyFilter(req.query, ['productId', 'rating'])
        filter.userId = userId
        const sort = applySort(req.query, ['rating', 'createdAt'])
        const reviews = await Review.find(filter).populate('productId').sort(sort)
        return res.json({ message: 'Lấy đánh giá theo user thành công', data: reviews })
    } catch (error) {
        return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy đánh giá: ${(error as Error).message}`)
    }
}