import { addToCart, getCart, getCartByCategory } from '@/controller/user/cart.controller'
import { asyncHandler } from '@/middleware/asyncHandler'
import { authMiddleware } from '@/middleware/auth'
import { Router } from 'express'

const cartRouter = Router()
cartRouter.get('/', authMiddleware, asyncHandler(getCart))
cartRouter.post('/', authMiddleware, asyncHandler(addToCart))
cartRouter.get('/:categoryId', authMiddleware, asyncHandler(getCartByCategory))
export default cartRouter
