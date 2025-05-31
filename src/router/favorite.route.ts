import { addFavorite, getFavorites, removeFavorite, updateFavorite } from '@/controller/user/favorite.controller'
import { asyncHandler } from '@/middleware/asyncHandler'
import { authMiddleware } from '@/middleware/auth'
import { Router } from 'express'
const favoriteRouter = Router()

favoriteRouter.get('/', authMiddleware, asyncHandler(getFavorites))
favoriteRouter.post('/', authMiddleware, asyncHandler(addFavorite))
favoriteRouter.put('/', authMiddleware, asyncHandler(updateFavorite))
favoriteRouter.delete('/', authMiddleware, asyncHandler(removeFavorite))

export default favoriteRouter
