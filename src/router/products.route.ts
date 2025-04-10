import {
	addProduct,
	deleteProduct,
	getAllProducts,
	getProductById,
	updateProduct,
	getProductsByCategory,
} from '@/controller/admin/product.controller'
import { authMiddleware } from '@/middleware/auth'
import { asyncHandler } from '@/middleware/asyncHandler'
import { Router } from 'express'
import { adminRequire } from '@/middleware/adminRequire'
const productRouter = Router()

productRouter.get('/', asyncHandler(getAllProducts))
productRouter.post('/', authMiddleware, adminRequire, asyncHandler(addProduct))
productRouter.put('/:id', authMiddleware, adminRequire, asyncHandler(updateProduct))
productRouter.delete('/:id', authMiddleware, adminRequire, asyncHandler(deleteProduct))
productRouter.get('/:id', asyncHandler(getProductById))
productRouter.get('/category/:categoryId', asyncHandler(getProductsByCategory))

export default productRouter
