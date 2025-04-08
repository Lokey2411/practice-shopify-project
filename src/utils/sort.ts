import { SortOrder } from 'mongoose'

/**
 * Xử lý sắp xếp dữ liệu dựa trên query từ request
 * @param query - Query từ request
 * @param allowedFields - Các trường được phép sắp xếp
 * @returns {Record<string, SortOrder>} - Đối tượng sắp xếp
 */
export const applySort = <T extends Object>(
	query: { sortBy: keyof T; sortOrder: 'asc' | 'desc' } | {},
	allowedFields: (keyof T)[],
): Record<string, SortOrder> => {
	const sort: Record<string, SortOrder> = {}

	if ('sortBy' in query && query.sortBy && allowedFields.includes(query.sortBy)) {
		sort[query.sortBy as string] = query.sortOrder === 'desc' ? -1 : 1
	}

	return sort
}
