import { adminLogin, adminRegister } from '@/controller/admin/auth.controller'
import { userLogin, userRegister } from '@/controller/user/auth.controller'

const express = require('express')
const userRouter = express.Router()

userRouter.post('/admin/login', adminLogin)
userRouter.post('/admin/register', adminRegister)
userRouter.post('/user/login', userLogin)
userRouter.post('/user/login', userRegister)
export default userRouter
