import bcrypt from 'bcryptjs'

/**
 * Mã hóa mật khẩu bằng bcrypt
 * @param password - Mật khẩu cần mã hóa
 * @returns {Promise<string>} - Mật khẩu đã mã hóa
 */
export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}