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
import { adminRequire } from '@/middleware/adminRequire'
const categoryRouter = Router()

categoryRouter.get('/', asyncHandler(getAllCategories))
categoryRouter.post('/', authMiddleware, adminRequire, asyncHandler(addCategory))
categoryRouter.put('/:id', authMiddleware, adminRequire, asyncHandler(updateCategory))
categoryRouter.delete('/:id', authMiddleware, adminRequire, asyncHandler(deleteCategory))
categoryRouter.get('/:id', asyncHandler(getCategoryById))

export default categoryRouter
