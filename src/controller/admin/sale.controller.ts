import { Request, Response } from 'express'
import { Sale, Product } from '@model/index'
import { STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'
import { SaleDocument } from '@/model/Sale.Model'

// Định nghĩa kiểu cho req.params
interface SaleParams {
	id: string
	categoryId: string
	productId: string
}

/**
 * Thêm sale mới
 * @requires product - ID sản phẩm (bắt buộc)
 * @requires percentage - Phần trăm giảm giá (bắt buộc)
 * @optional startDate - Ngày bắt đầu
 * @optional endDate - Ngày kết thúc
 */
export const addSale = async (req: Request, res: Response) => {
	const { product, percentage } = req.body

	if (!product || !percentage) {
		return res.status(STATUS.BAD_REQUEST).json('Sản phẩm và phần trăm giảm giá là bắt buộc')
	}

	try {
		const sale = new Sale(req.body)
		await sale.save()
		return res.json('Sale được thêm thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi thêm sale: ${(error as Error).message}`)
	}
}

/**
 * Cập nhật sale
 * @requires id - ID của sale (bắt buộc trong params)
 * @optional product - ID sản phẩm
 * @optional percentage - Phần trăm giảm giá
 * @optional startDate - Ngày bắt đầu
 * @optional endDate - Ngày kết thúc
 */
export const updateSale = async (req: Request<SaleParams>, res: Response) => {
	const { id } = req.params

	try {
		const sale = await Sale.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
		if (!sale) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy sale')
		}
		return res.json('Sale được cập nhật thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật sale: ${(error as Error).message}`)
	}
}

/**
 * Xóa sale (chuyển isDeleted thành true)
 * @requires id - ID của sale (bắt buộc trong params)
 */
export const deleteSale = async (req: Request<SaleParams>, res: Response) => {
	const { id } = req.params

	try {
		const sale = await Sale.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
		if (!sale) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy sale')
		}
		return res.json('Sale được xóa thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi xóa sale: ${(error as Error).message}`)
	}
}

/**
 * Lấy danh sách tất cả sản phẩm đang sale
 * @optional filter - Lọc theo product, percentage
 * @optional sortBy - Sắp xếp theo percentage, startDate
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getAllSales = async (req: Request, res: Response) => {
	try {
		const requestQuery = req.query as any
		const filterQuery: SaleDocument = {
			_id: requestQuery.id,
			percentage: requestQuery.percentage,
			product: requestQuery.product,
		}
		const { sortBy, sortOrder } = req.query
		const filter = applyFilter<SaleDocument>(filterQuery, ['product', 'percentage'])
		const sort = applySort<SaleDocument>({ sortBy, sortOrder }, ['percentage', 'createdAt'])
		const sales = await Sale.find(filter).populate('product').sort(sort)
		return res.json({ message: 'Lấy danh sách sale thành công', data: sales })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy danh sách sale: ${(error as Error).message}`)
	}
}

/**
 * Lấy sản phẩm đang sale theo danh mục
 * @requires categoryId - ID của danh mục (bắt buộc trong params)
 * @optional filter - Lọc theo percentage
 * @optional sortBy - Sắp xếp theo percentage, startDate
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getSalesByCategory = async (req: Request<SaleParams>, res: Response) => {
	const { categoryId } = req.params

	try {
		const products = await Product.find({ categories: categoryId, isDeleted: false })
		const requestQuery = req.query as any
		const filterQuery: SaleDocument = {
			_id: requestQuery.id,
			percentage: requestQuery.percentage,
		}
		const { sortBy, sortOrder } = req.query
		const filter = applyFilter<SaleDocument>(filterQuery, ['percentage'])
		filter.product = { $in: products.map(p => p._id) }
		const sort = applySort<SaleDocument>({ sortBy, sortOrder }, ['percentage', 'createdAt'])
		const sales = await Sale.find(filter).populate('product').sort(sort)
		return res.json({ message: 'Lấy sale theo danh mục thành công', data: sales })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy sale: ${(error as Error).message}`)
	}
}

export const getSaleById = async (req: Request<SaleParams>, res: Response) => {
	const { id } = req.params

	try {
		const sale = await Sale.findOne({ _id: id, isDeleted: false }).populate('product')
		if (!sale) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy sale')
		}
		return res.json({ message: 'Lấy sale theo id thông', data: sale })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy sale: ${(error as Error).message}`)
	}
}
