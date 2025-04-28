import { Router } from 'express'
import { upload, uploadFile } from '@/controller/upload.controller'
import mongoose from 'mongoose'
import { asyncHandler } from '@/middleware/asyncHandler'

const app = Router()

app.post('/', upload.single('image'), uploadFile)
app.get(
	'/images/:filename',
	asyncHandler(async (req: any, res) => {
		try {
			const decodedFileName = decodeURIComponent(req.params.filename)
			console.log('Requested filename:', decodedFileName)
			console.log('MongoDB connection state:', mongoose.connection.readyState)

			const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
				bucketName: 'uploads',
			})

			const files = await gfs.find({ filename: decodedFileName }).toArray()
			console.log('Found files:', files)

			if (!files || files.length === 0) {
				console.log('File not found:', decodedFileName)
				return res.status(404).json({ message: 'File not found' })
			}

			if (!files[0].contentType.startsWith('image/')) {
				console.log('Not an image:', files[0].contentType)
				return res.status(400).json({ message: 'Not an image' })
			}

			res.set('Content-Type', files[0].contentType)
			const downloadStream = gfs.openDownloadStreamByName(decodedFileName)

			downloadStream.on('error', err => {
				console.error('Stream error:', err)
				res.status(500).json({ message: 'Lỗi khi stream file', error: err.message })
			})

			downloadStream.on('end', () => {
				console.log('Stream completed for:', decodedFileName)
				res.end()
			})

			downloadStream.pipe(res)
		} catch (err: any) {
			console.error('Serve file error:', err)
			res.status(500).json({ message: 'Lỗi server', error: err.message })
		}
	}),
)

export default app
