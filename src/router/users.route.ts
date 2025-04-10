import { adminLogin, adminRegister } from '@/controller/admin/auth.controller'
import { getAllUsers, getUserById, updateUser } from '@/controller/admin/user.controller'
import { userLogin, userRegister } from '@/controller/user/auth.controller'
import { adminRequire } from '@/middleware/adminRequire'
import { authMiddleware } from '@/middleware/auth'

const express = require('express')
const userRouter = express.Router()

userRouter.get('/', authMiddleware, adminRequire, getAllUsers)
userRouter.put('/:id', authMiddleware, updateUser)
userRouter.get('/:id', authMiddleware, getUserById)

userRouter.post('/admin/login', adminLogin)
userRouter.post('/admin/register', adminRegister)
userRouter.post('/user/login', userLogin)
userRouter.post('/user/login', userRegister)
export default userRouter
