import { JWT_EXPIRES_IN, JWT_SECRET } from '@/config/env'
import { STATUS } from '@/constants'
import { adminLogin, adminRegister } from '@/controller/admin/auth.controller'
import { getAllUsers, getUserById, updateUser } from '@/controller/admin/user.controller'
import { userLogin, userRegister } from '@/controller/user/auth.controller'
import { getProfile, updateProfile, changePassword } from '@/controller/user/profile.controller'
import { adminRequire } from '@/middleware/adminRequire'
import { authMiddleware } from '@/middleware/auth'
import jwt, { SignOptions } from 'jsonwebtoken'
import { upload, uploadFile } from '@/controller/upload.controller'
import { getFavorites } from '@/controller/user/favorite.controller'

const express = require('express')
const userRouter = express.Router()
userRouter.get('/profile', authMiddleware, getProfile)
userRouter.put('/profile', authMiddleware, updateProfile)
userRouter.patch('/password', authMiddleware, changePassword)
userRouter.post('/upload', upload.single('avatar'), uploadFile)

userRouter.get('/', authMiddleware, adminRequire, getAllUsers)
userRouter.put('/:id', authMiddleware, updateUser)
userRouter.get('/:id', authMiddleware, getUserById)

userRouter.post('/admin/login', adminLogin)
userRouter.post('/admin/register', adminRegister)
userRouter.post('/user/login', userLogin)
userRouter.post('/user/register', userRegister)
// check token
userRouter.post('/token', authMiddleware, (req, res) => {
	return res.status(STATUS.OK).json({ message: 'Token is valid' })
})
userRouter.post('/admin/token', authMiddleware, adminRequire, (req, res) => {
	return res.status(STATUS.OK).json({ message: 'Token is valid' })
})
userRouter.post('/refresh-token', authMiddleware, (req, res) => {
	try {
		const { user } = req

		if (!user) {
			return res.status(STATUS.UNAUTHORIZED).json({ message: 'Unauthorized - Invalid token' })
		}

		const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN.toString() } as SignOptions)
		return res.status(STATUS.OK).json({ token })
	} catch (error) {
		console.log(error)
		return res.status(STATUS.UNAUTHORIZED).json({ message: 'Unauthorized - Invalid token' })
	}
})

userRouter.get('/wishlist', authMiddleware, getFavorites)

export default userRouter
