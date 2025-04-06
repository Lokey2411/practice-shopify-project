import { Request, Response } from 'express'
import { User } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Sửa thông tin người dùng
 */
export const updateUser = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const user = await User.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
        if (!user) {
            res.status(STATUS.NOT_FOUND).json({ message: 'User not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'User updated successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error updating user: ${error.message}` })
    }
}

/**
 * Lấy danh sách tất cả người dùng
 */
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.find({ isDeleted: false })
        res.status(STATUS.OK).json({ message: 'Users retrieved successfully', data: users })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving users: ${error.message}` })
    }
}

/**
 * Lấy người dùng theo ID
 */
export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id, isDeleted: false })
        if (!user) {
            res.status(STATUS.NOT_FOUND).json({ message: 'User not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'User retrieved successfully', data: user })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error retrieving user: ${error.message}` })
    }
}