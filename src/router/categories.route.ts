import { Router } from 'express'
import {
	addCategory,
	deleteCategory,
	getAllCategories,
	getCategoryById,
	updateCategory,
} from '@/controller/admin/category.controller'
import { authMiddleware } from '@/middleware/auth'
import { asyncHandler } from '@/middleware/asyncHandler'
const categoryRouter = Router()

categoryRouter.get('/', asyncHandler(getAllCategories))
categoryRouter.post('/', authMiddleware, asyncHandler(addCategory))
categoryRouter.put('/:id', authMiddleware, asyncHandler(updateCategory))
categoryRouter.delete('/:id', authMiddleware, asyncHandler(deleteCategory))
categoryRouter.get('/:id', asyncHandler(getCategoryById))

export default categoryRouter
