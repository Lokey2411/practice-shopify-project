import { getAllOrders, getOrderById, updateOrderStatus, getOrderProducts } from '@/controller/admin/order.controller'
import { purchaseProducts, getMyOrders, cancelOrder, getOrderDetail } from '@/controller/user/order.controller'
import { asyncHandler } from '@/middleware/asyncHandler'
import { authMiddleware } from '@/middleware/auth'
import { Router } from 'express'
const app = Router()

app.get('/', authMiddleware, asyncHandler(getAllOrders))
app.get('/my-orders', authMiddleware, asyncHandler(getMyOrders))
app.get('/:id', authMiddleware, asyncHandler(getOrderById))
app.put('/:id', authMiddleware, asyncHandler(updateOrderStatus))
app.patch('/:orderId/purchase', authMiddleware, asyncHandler(purchaseProducts))
app.get('/:id/products', authMiddleware, asyncHandler(getOrderProducts))
app.put('/:orderId/cancel', authMiddleware, asyncHandler(cancelOrder))
app.get('/my-orders/:id', authMiddleware, asyncHandler(getOrderDetail))

export default app
