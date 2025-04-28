// src/controller/upload.ts
import { BASE_URL } from '@/config/env'
import { PREFIX_PATH } from '@/constants'
import mongoose from 'mongoose'
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({ storage })

export { upload }

export const uploadFile = async (req: any, res: any) => {
	if (!req.file) {
		return res.status(400).json({ message: 'No file uploaded' })
	}

	try {
		console.log('Uploading file:', req.file.originalname) // Debug
		const gfs = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
			bucketName: 'uploads',
		})

		const fileName = `${Date.now()}_${req.file.originalname}`
		console.log('Generated filename:', fileName) // Debug

		const uploadStream = gfs.openUploadStream(fileName, {
			contentType: req.file.mimetype,
		})

		uploadStream.end(req.file.buffer)

		uploadStream.on('finish', async () => {
			try {
				// Kiểm tra uploads.files
				const files = await gfs.find({ filename: fileName }).toArray()
				console.log('Uploaded file metadata:', files) // Debug
				if (!files || files.length === 0) {
					console.error('Metadata not saved for:', fileName)
					return res.status(500).json({ message: 'Lỗi: Metadata không được lưu' })
				}

				const imageUrl = `${PREFIX_PATH}/upload/images/${encodeURIComponent(fileName)}`
				res.json({
					message: 'Upload thành công!',
					imageUrl,
				})
			} catch (err: any) {
				console.error('Post-upload check error:', err)
				res.status(500).json({ message: 'Lỗi khi kiểm tra file', error: err.message })
			}
		})

		uploadStream.on('error', (err: any) => {
			console.error('Upload stream error:', err)
			res.status(500).json({ message: 'Lỗi khi upload', error: err.message })
		})
	} catch (err: any) {
		console.error('Upload error:', err)
		res.status(500).json({ message: 'Lỗi server', error: err.message })
	}
}
