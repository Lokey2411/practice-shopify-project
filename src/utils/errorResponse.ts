import { STATUS } from '@/constants'

/**
 * Tạo phản hồi lỗi
 * @param message - Thông điệp lỗi
 * @param status - Mã trạng thái
 * @returns {object} - Phản hồi dạng object
 */
export const errorResponse = (message = 'Something went wrong', status = STATUS.INTERNAL_SERVER_ERROR): object => {
    return { success: false, message, status }
}