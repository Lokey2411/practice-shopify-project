import { Request, Response } from 'express'
import { User } from '@model/index'
import { hashPassword } from '@utils/hashPassword'
import { comparePassword } from '@utils/comparePassword'
import { generateToken } from '@utils/generateToken'
import { STATUS } from '@/constants'

/**
 * Đăng nhập người dùng
 */
export const userLogin = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email, isDeleted: false })
        if (!user) {
            res.status(STATUS.UNAUTHORIZED).json({ message: 'Invalid credentials' })
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
 * Đăng ký người dùng
 */
export const userRegister = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body

    try {
        const existingUser = await User.findOne({ $or: [{ email }, { username }], isDeleted: false })
        if (existingUser) {
            res.status(STATUS.BAD_REQUEST).json({ message: 'User already exists' })
            return
        }

        const hashedPassword = await hashPassword(password)
        const user = new User({ username, email, password: hashedPassword })
        await user.save()

        const token = generateToken(user._id.toString())
        res.status(STATUS.OK).json({ message: 'User registered successfully', token })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: 'Server error during registration' })
    }
}