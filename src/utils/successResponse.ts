/**
 * Tạo phản hồi thành công
 * @param data - Dữ liệu trả về
 * @param message - Thông điệp
 * @returns {object} - Phản hồi dạng object
 */
export const successResponse = (data: any, message = 'Success'): object => {
    return { success: true, message, data }
}