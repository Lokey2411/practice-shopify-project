import express from 'express'
import routers from './router'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from '@config/db'
import { logger } from '@middleware/logger'
import { errorHandler } from '@middleware/errorHandler'
import { PREFIX_PATH, PORT } from './constants'
import path from 'path'
import fs from 'fs'
import conversation from './router/conversation.route'
import { createServer } from 'http'
import { Server } from 'socket.io'

dotenv.config()

const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
	cors: {
		origin: ["http://localhost:3000", "http://localhost:5173"],
		methods: ["GET", "POST"],
		credentials: true
	}
})

io.on('connection', (socket) => {
	console.log('User connected:', socket.id)
})

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
	httpServer.listen(PORT, () => {
		console.log(`Server + socket.io running on port ${PORT}`)
	})
}

app.get('/', (req, res) => {
	res.send('Hello World')
})

console.log('router signing: ', routers)

routers.forEach(router => {
	console.log('router path: ', PREFIX_PATH + router.path)
	app.use(PREFIX_PATH + router.path, router.router)
})

app.use('/services/api/upload/images', express.static(path.join(__dirname, 'uploads/images')))

app.get('/images/:filename', (req, res) => {
	const filePath = path.join(__dirname, '../uploads/images', req.params.filename)
	if (fs.existsSync(filePath)) {
		res.sendFile(filePath)
	} else {
		res.status(404).json({ message: 'File not found' })
	}
})

routers.push({
	path: '/conversations',
	router: conversation
})

startServer().catch(err => {
	console.error('Server startup error:', err)
	process.exit(1)
})
export default app
