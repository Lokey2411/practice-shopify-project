import { SortOrder } from 'mongoose'

/**
 * Xử lý sắp xếp dữ liệu dựa trên query từ request
 * @param query - Query từ request
 * @param allowedFields - Các trường được phép sắp xếp
 * @returns {Record<string, SortOrder>} - Đối tượng sắp xếp
 */
export const applySort = (query: any, allowedFields: string[]): Record<string, SortOrder> => {
    const sort: Record<string, SortOrder> = {}

    if (query.sortBy && allowedFields.includes(query.sortBy)) {
        sort[query.sortBy] = query.sortOrder === 'desc' ? -1 : 1
    }

    return sort
}