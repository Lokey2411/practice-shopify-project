import bcrypt from 'bcryptjs'

/**
 * So sánh mật khẩu với bản mã hóa
 * @param password - Mật khẩu gốc
 * @param hashedPassword - Mật khẩu đã mã hóa
 * @returns {Promise<boolean>} - Kết quả so sánh
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return bcrypt.compare(password, hashedPassword)
}