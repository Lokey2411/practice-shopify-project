import { Request, Response } from 'express'
import { User } from '@model/index'
import { hashPassword } from '@utils/hashPassword'
import { comparePassword } from '@utils/comparePassword'
import { generateToken } from '@utils/generateToken'
import { STATUS } from '@/constants'

/**
 * Đăng nhập admin
 */
export const adminLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email, permission: { $in: ['admin'] }, isDeleted: false })
        if (!user) {
            res.status(STATUS.UNAUTHORIZED).json({ message: 'Invalid credentials or not an admin' })
            return
        }

        const isMatch = await comparePassword(password, user.password)
        if (!isMatch) {
            res.status(STATUS.UNAUTHORIZED).json({ message: 'Invalid credentials' })
            return
        }

        const token = generateToken(user._id.toString())
        res.status(STATUS.OK).json({ message: 'Login successful', token })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error during login' })
    }
}

/**
 * Đăng ký admin (chỉ dùng trong dev)
 */
export const adminRegister = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }], isDeleted: false })
        if (existingUser) {
            res.status(STATUS.BAD_REQUEST).json({ message: 'User already exists' })
            return
        }

        const hashedPassword = await hashPassword(password)
        const user = new User({
            username,
            email,
            password: hashedPassword,
            permission: ['admin'],
        })
        await user.save()

        const token = generateToken(user._id.toString())
        res.status(STATUS.OK).json({ message: 'Admin registered successfully', token })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error during registration' })
    }
}