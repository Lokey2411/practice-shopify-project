import { addReview, deleteReview, getAllReviews, getReviewById } from '@/controller/user/review.controller'
import { asyncHandler } from '@/middleware/asyncHandler'
import { authMiddleware } from '@/middleware/auth'
import { Router } from 'express'
const reviewRouter = Router()
reviewRouter.get('/', asyncHandler(getAllReviews))
reviewRouter.post('/', authMiddleware, asyncHandler(addReview))
reviewRouter.get('/:id', asyncHandler(getReviewById))
reviewRouter.put(':id', authMiddleware, asyncHandler(addReview))
reviewRouter.delete(':id', authMiddleware, asyncHandler(deleteReview))
export default reviewRouter
