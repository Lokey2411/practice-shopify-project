import { Request, Response } from 'express'
import { Slider } from '@model/index'
import { STATUS } from '@/constants'

/**
 * Thêm slider mới
 * @requires image - Đường dẫn hình ảnh (bắt buộc)
 * @optional title - Tiêu đề slider
 * @optional link - Liên kết slider
 */
export const addSlider = async (req: Request, res: Response) => {
	const { image } = req.body

	if (!image) {
		return res.status(STATUS.BAD_REQUEST).json('Hình ảnh là bắt buộc')
	}

	try {
		const slider = new Slider(req.body)
		await slider.save()
		return res.json('Slider được thêm thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi thêm slider: ${(error as Error).message}`)
	}
}

/**
 * Cập nhật slider
 * @requires id - ID của slider (bắt buộc trong params)
 * @optional image - Đường dẫn hình ảnh
 * @optional title - Tiêu đề slider
 * @optional link - Liên kết slider
 */
export const updateSlider = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const slider = await Slider.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
		if (!slider) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy slider')
		}
		return res.json('Slider được cập nhật thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật slider: ${(error as Error).message}`)
	}
}

/**
 * Xóa slider (chuyển isDeleted thành true)
 * @requires id - ID của slider (bắt buộc trong params)
 */
export const deleteSlider = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const slider = await Slider.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
		if (!slider) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy slider')
		}
		return res.json('Slider được xóa thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi xóa slider: ${(error as Error).message}`)
	}
}

export const getAllSliders = async (req: Request, res: Response) => {
	try {
		const sliders = await Slider.find({ isDeleted: false }).sort({ createdAt: -1 })
		return res.json({ message: 'Lấy danh sách slider thành công', data: sliders })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi tìm thấy slider: ${(error as Error).message}`)
	}
}

export const getSliderById = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const slider = await Slider.findOne({ _id: id, isDeleted: false })
		if (!slider) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy slider')
		}
		return res.json({ message: 'Lấy slider theo id thành công', data: slider })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy slider: ${(error as Error).message}`)
	}
}
