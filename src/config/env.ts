import dotenv from 'dotenv'
import { PORT } from '@/constants'

dotenv.config()
export const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/shop'
export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d'
export const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`
