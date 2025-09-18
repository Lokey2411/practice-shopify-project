import express, { Response } from 'express'
import routers from './router'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from '@config/db'
import { logger } from '@middleware/logger'
import { errorHandler } from '@middleware/errorHandler'
import { PREFIX_PATH, PORT, STATUS } from './constants'
import cloudinaryConfig from './config/cloudinary'

dotenv.config()

const app = express()

/**
 * Cấu hình middleware cơ bản
 */
app.use(express.json())
app.use(helmet())
app.use(morgan('dev'))
app.use(logger)

/**
 * Xử lý lỗi toàn cục
 */
app.use(errorHandler)

/**
 * Kết nối DB và khởi động server
 */
const startServer = async (): Promise<void> => {
	await connectDB()
	app.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`)
	})
}

app.get('/', (req, res) => {
	res.send('Hello World')
})

routers.forEach(router => {
	console.log('router path: ', PREFIX_PATH + router.path)
	app.use(PREFIX_PATH + router.path, router.router)
})

const uploadHandler = (req: any, res: Response) => {
	try {
		if (!req.file) {
			res.status(STATUS.BAD_REQUEST).json({ error: 'No file uploaded' })
			return
		}
		if (!req.file.mimetype.startsWith('image/')) {
			res.status(STATUS.BAD_REQUEST).json({ error: 'Invalid file type' })
			return
		}
		res.json({ file_url: req.file.path })
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : JSON.stringify(error, null, 2)
		res.status(500).json({ error: errorMessage })
	}
}
app.post(PREFIX_PATH + '/upload', cloudinaryConfig, uploadHandler)

startServer().catch(err => {
	console.error('Server startup error:', err)
	process.exit(1)
})
export default app
