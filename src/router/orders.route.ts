import { getAllOrders, getOrderById, updateOrderStatus } from '@/controller/admin/order.controller'
import { purchaseProducts } from '@/controller/user/order.controller'
import { asyncHandler } from '@/middleware/asyncHandler'
import { authMiddleware } from '@/middleware/auth'
import { Router } from 'express'
const app = Router()

app.get('/', authMiddleware, asyncHandler(getAllOrders))
app.get('/:id', authMiddleware, asyncHandler(getOrderById))
app.put('/:id', authMiddleware, asyncHandler(updateOrderStatus))
app.patch('/:orderId', authMiddleware, asyncHandler(purchaseProducts))

export default app
