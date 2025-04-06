import mongoose from 'mongoose'
import { MONGO_URI } from '@config/env'

/**
 * Kết nối tới MongoDB sử dụng URI từ biến môi trường
 * @returns {Promise<void>}
 */
const connectDB = async (): Promise<void> => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log('MongoDB Connected...')
    } catch (error) {
        console.error('MongoDB Connection Error:', error)
        process.exit(1)
    }
}

export default connectDB