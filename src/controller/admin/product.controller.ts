import { Request, Response } from 'express'
import { Product } from '@model/index'
import { handleFindById } from '@utils/handleFindById'
import { STATUS } from '@/constants'
import { applyFilter } from '@utils/filter'
import { applySort } from '@utils/sort'
import { ProductDocument } from '@/model/Product.Model'

// Định nghĩa kiểu cho req.params
interface ProductParams {
	id: string
	categoryId: string
}

/**
 * Thêm sản phẩm mới
 * @requires name - Tên sản phẩm (bắt buộc)
 * @requires price - Giá sản phẩm (bắt buộc)
 * @optional description - Mô tả sản phẩm
 * @optional categories - Danh sách danh mục
 */
export const addProduct = async (req: Request, res: Response) => {
	const { name, price } = req.body
	console.log(req.body)

	if (!name || !price) {
		return res.status(STATUS.BAD_REQUEST).json('Tên và giá sản phẩm là bắt buộc')
	}

	try {
		const product = new Product(req.body)
		await product.save()
		return res.json('Sản phẩm được thêm thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi thêm sản phẩm: ${(error as Error).message}`)
	}
}

/**
 * Cập nhật sản phẩm
 * @requires id - ID của sản phẩm (bắt buộc trong params)
 * @optional name - Tên sản phẩm
 * @optional price - Giá sản phẩm
 * @optional description - Mô tả sản phẩm
 * @optional categories - Danh sách danh mục
 */
export const updateProduct = async (req: Request<ProductParams>, res: Response) => {
	const { id } = req.params

	try {
		const product = await Product.findOneAndUpdate({ _id: id, isDeleted: false }, req.body, { new: true })
		if (!product) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy sản phẩm')
		}
		return res.json('Sản phẩm được cập nhật thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi cập nhật sản phẩm: ${(error as Error).message}`)
	}
}

/**
 * Xóa sản phẩm (chuyển isDeleted thành true)
 * @requires id - ID của sản phẩm (bắt buộc trong params)
 */
export const deleteProduct = async (req: Request<ProductParams>, res: Response) => {
	const { id } = req.params

	try {
		const product = await Product.findOneAndUpdate({ _id: id, isDeleted: false }, { isDeleted: true }, { new: true })
		if (!product) {
			return res.status(STATUS.NOT_FOUND).json('Không tìm thấy sản phẩm')
		}
		return res.json('Sản phẩm được xóa thành công')
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi xóa sản phẩm: ${(error as Error).message}`)
	}
}

/**
 * Lấy danh sách tất cả sản phẩm
 * @optional filter - Lọc theo name, price, categories
 * @optional sortBy - Sắp xếp theo name, price, createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getAllProducts = async (req: Request, res: Response) => {
	try {
		const requestQuery = req.query as any
		const filterQuery: ProductDocument = {
			_id: requestQuery.id,
			name: requestQuery.name,
			price: requestQuery.price,
		}
		const { sortBy, sortOrder } = req.query
		const filter = applyFilter<ProductDocument>(filterQuery, ['name', 'price', 'categories'])
		const sort = applySort({ sortBy, sortOrder }, ['name', 'price', 'createdAt'])
		const products = await Product.find(filter).populate('categories').sort(sort)
		return res.json({ message: 'Lấy danh sách sản phẩm thành công', data: products })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy danh sách sản phẩm: ${(error as Error).message}`)
	}
}

/**
 * Lấy sản phẩm theo ID
 * @requires id - ID của sản phẩm (bắt buộc trong params)
 */
export const getProductById = async (req: Request<ProductParams>, res: Response) => {
	const { id } = req.params
	await handleFindById(Product, id, res, 'Product', 'categories')
}

/**
 * Lấy sản phẩm theo danh mục
 * @requires categoryId - ID của danh mục (bắt buộc trong params)
 * @optional filter - Lọc theo name, price
 * @optional sortBy - Sắp xếp theo name, price, createdAt
 * @optional sortOrder - Thứ tự sắp xếp (asc/desc)
 */
export const getProductsByCategory = async (req: Request<ProductParams>, res: Response) => {
	const { categoryId } = req.params

	try {
		const requestQuery = req.query as any
		const filterQuery: ProductDocument = {
			_id: requestQuery.id,
			name: requestQuery.name,
			price: requestQuery.price,
		}
		const { sortBy, sortOrder } = req.query
		const filter = applyFilter<ProductDocument>(filterQuery, ['name', 'price'])
		filter.categories = categoryId
		const sort = applySort<ProductDocument>({ sortBy, sortOrder }, ['name', 'price', 'createdAt'])
		const products = await Product.find(filter).populate('categories').sort(sort)
		return res.json({ message: 'Lấy sản phẩm theo danh mục thành công', data: products })
	} catch (error) {
		return res.status(STATUS.INTERNAL_SERVER_ERROR).json(`Lỗi khi lấy sản phẩm: ${(error as Error).message}`)
	}
}
