import { Request, Response } from 'express'
import { Category } from '@model/index'
import { STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'
import { CategoryDocument } from '@/model/Category.Model'

/**
 * Thêm danh mục mới
 * @requires name - Tên danh mục (bắt buộc)
 * @optional description - Mô tả danh mục
 */
export const addCategory = async (req: Request, res: Response) => {
	const { name } = req.body

	if (!name) {
		return res.status(STATUS.BAD_REQUEST).json('Tên danh mục là bắt buộc')
	}

	try {
		const category = new Category({
			name,
			image: req.body.image ?? '',
			isNewArrival: req.body.isNewArrival ?? false,
			description: req.body.description ?? '',
		})
		await category.save()
		return res.json('Danh mục được thêm thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi thêm danh mục: ${(error as Error).message}`)
	}
}

/**
 * Cập nhật danh mục
 * @requires id - ID của danh mục (bắt buộc trong params)
 * @optional name - Tên danh mục
 * @optional description - Mô tả danh mục
 */
export const updateCategory = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const category = await Category.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
		if (!category) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy danh mục')
		}
		return res.json('Danh mục được cập nhật thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật danh mục: ${(error as Error).message}`)
	}
}

/**
 * Xóa danh mục (chuyển isDeleted thành true)
 * @requires id - ID của danh mục (bắt buộc trong params)
 */
export const deleteCategory = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const category = await Category.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
		if (!category) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy danh mục')
		}
		return res.json('Danh mục được xóa thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi xóa danh mục: ${(error as Error).message}`)
	}
}

/**
 * Lấy danh sách tất cả danh mục
 * @optional filter - Lọc theo name, description
 * @optional sortBy - Sắp xếp theo name, description
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getAllCategories = async (req: Request, res: Response) => {
	try {
		const requestQuery = req.query as any
		const filterQuery: CategoryDocument = {
			name: requestQuery.name,
			description: requestQuery.description,
			_id: requestQuery.id,
		}
		const { sortBy, sortOrder } = requestQuery
		const filter = applyFilter<CategoryDocument>(filterQuery, ['name', 'description'])
		const sort = applySort<CategoryDocument>({ sortBy, sortOrder }, ['name', 'description'])
		const categories = await Category.find(filter).sort(sort)
		return res.json({ message: 'Lấy danh sách danh mục thành công', data: categories })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy danh sách danh mục: ${(error as Error).message}`)
	}
}

/**
 * Lấy danh mục theo ID
 * @requires id - ID của danh mục (bắt buộc trong params)
 */
export const getCategoryById = async (req: Request, res: Response) => {
	const { id } = req.params

	try {
		const category = await Category.findOne({ _id: id, isDeleted: false })
		if (!category) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy danh mục')
		}
		return res.json({ message: 'Lấy danh mục thành công', data: category })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy danh mục: ${(error as Error).message}`)
	}
}
