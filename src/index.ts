import express from "express";
import routers from "./router";
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import connectDB from '@config/db'
import routes from '@router/index'
import { logger } from '@middleware/logger'
import { errorHandler } from '@middleware/errorHandler'
import { PREFIX_PATH, PORT  } from "./constants";

dotenv.config()

const app = express();

/**
 * Cấu hình middleware cơ bản
 */
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(logger)

/**
 * Định tuyến API với prefix từ constants
 */
// app.use(PREFIX_PATH, routes)

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

startServer().catch((err) => {
	console.error('Server startup error:', err)
	process.exit(1)
})

app.get("/", (req, res) => {
	res.send("Hello World");
});

routers.forEach((router) => {
	app.use(PREFIX_PATH + router.path, router.router);
});

app.listen(8000, () => {
	console.log("Server running on port 8000");
});
