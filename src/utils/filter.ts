import { FilterQuery } from 'mongoose'

/**
 * Xử lý bộ lọc dữ liệu dựa trên query từ request
 * @param query - Query từ request
 * @param allowedFields - Các trường được phép lọc
 * @returns {FilterQuery<any>} - Bộ lọc đã được xử lý
 */

export const applyFilter = <T>(query: T, allowedFields: (keyof T)[]): FilterQuery<T> => {
	const filter: FilterQuery<T> = { isDeleted: false } // Mặc định lọc các bản ghi chưa bị xóa

	for (const field of allowedFields) {
		if (query[field]) {
			filter[field] = query[field]
		}
	}

	return filter
}
