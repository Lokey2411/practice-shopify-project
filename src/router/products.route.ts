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
const productRouter = Router()

productRouter.get('/', asyncHandler(getAllProducts))
productRouter.post('/', authMiddleware, asyncHandler(addProduct))
productRouter.put('/:id', authMiddleware, asyncHandler(updateProduct))
productRouter.delete('/:id', authMiddleware, asyncHandler(deleteProduct))
productRouter.get('/:id', asyncHandler(getProductById))
productRouter.get('/category/:categoryId', asyncHandler(getProductsByCategory))

export default productRouter
