import { Request, Response } from 'express'
import { Slider } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Thêm slider mới
 */
export const addSlider = async (req: Request, res: Response): Promise<void> => {
    try {
        const slider = new Slider(req.body)
        await slider.save()
        res.status(STATUS.OK).json({ message: 'Slider added successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error adding slider: ${error.message}` })
    }
}

/**
 * Cập nhật slider
 */
export const updateSlider = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const slider = await Slider.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
        if (!slider) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Slider not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Slider updated successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error updating slider: ${error.message}` })
    }
}

/**
 * Xóa slider (chuyển isDeleted thành true)
 */
export const deleteSlider = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params
    try {
        const slider = await Slider.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!slider) {
            res.status(STATUS.NOT_FOUND).json({ message: 'Slider not found' })
            return
        }
        res.status(STATUS.OK).json({ message: 'Slider deleted successfully' })
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Error deleting slider: ${error.message}` })
    }
}