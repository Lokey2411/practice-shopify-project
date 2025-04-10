import { Request, Response } from 'express'
import { Review } from '@model/index'
import { STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'
import { ReviewDocument } from '@/model/Review.Model'

// Định nghĩa kiểu cho req.params
interface ReviewParams {
	id: string
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
	const { id } = req.params

	try {
		const reviewToUpdate = await Review.findOne({ _id: id, userId, isDeleted: false })
		if (!reviewToUpdate) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đánh giá')
		}
		reviewToUpdate.set(req.body)
		await reviewToUpdate.save()
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
	const { id } = req.params

	try {
		const reviewToUpdate = await Review.findOne({ _id: id, userId, isDeleted: false })
		if (!reviewToUpdate) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đánh giá')
		}
		reviewToUpdate.set({ isDeleted: true })
		await reviewToUpdate.save()
		return res.json('Xóa đánh giá thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi xóa đánh giá: ${(error as Error).message}`)
	}
}

export const getAllReviews = async (req: Request, res: Response) => {
	try {
		const requestQuery = req.query as any
		const filterQuery: ReviewDocument = {
			_id: requestQuery._id,
			productId: requestQuery.productId,
			userId: requestQuery.userId,
			rating: requestQuery.rating,
		}
		const { sortBy, sortOrder } = req.query
		const filter = applyFilter<ReviewDocument>(filterQuery, ['productId', 'userId', 'rating'])
		const sort = applySort<ReviewDocument>({ sortBy, sortOrder }, ['rating', 'createdAt'])
		const reviews = await Review.find(filter).populate('userId productId').sort(sort)
		return res.json({ message: 'Lấy danh sách tất cả đánh giá thành công', data: reviews })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy đánh giá: ${(error as Error).message}`)
	}
}

export const getReviewById = async (req: Request<ReviewParams>, res: Response) => {
	const { reviewId } = req.params

	try {
		const review = await Review.findOne({ _id: reviewId, isDeleted: false })
		if (!review) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy đánh giá')
		}
		return res.json({ message: 'Lấy đánh giá theo id thông', data: review })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy đánh giá: ${(error as Error).message}`)
	}
}
