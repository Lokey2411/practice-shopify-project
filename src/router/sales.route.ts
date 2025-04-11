import {
	addSale,
	deleteSale,
	getAllSales,
	getSaleById,
	getSalesByCategory,
	updateSale,
} from '@/controller/admin/sale.controller'
import { adminRequire } from '@/middleware/adminRequire'
import { asyncHandler } from '@/middleware/asyncHandler'
import { authMiddleware } from '@/middleware/auth'
import { Router } from 'express'
const saleRouter = Router()

saleRouter.get('/', asyncHandler(getAllSales))
saleRouter.post('/', authMiddleware, adminRequire, asyncHandler(addSale))
saleRouter.put('/:id', authMiddleware, adminRequire, asyncHandler(updateSale))
saleRouter.delete('/:id', authMiddleware, adminRequire, asyncHandler(deleteSale))
saleRouter.get('/:id', authMiddleware, adminRequire, asyncHandler(getSaleById))
saleRouter.get('/category/:categoryId', asyncHandler(getSalesByCategory))
export default saleRouter
