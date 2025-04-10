import {
	addSlider,
	deleteSlider,
	getAllSliders,
	getSliderById,
	updateSlider,
} from '@/controller/admin/slider.controller'
import { adminRequire } from '@/middleware/adminRequire'
import { asyncHandler } from '@/middleware/asyncHandler'
import { authMiddleware } from '@/middleware/auth'
import { Router } from 'express'
const sliderRouter = Router()
sliderRouter.get('/', asyncHandler(getAllSliders))
sliderRouter.post('/', authMiddleware, adminRequire, asyncHandler(addSlider))
sliderRouter.get('/:id', asyncHandler(getSliderById))
sliderRouter.put('/:id', authMiddleware, adminRequire, asyncHandler(updateSlider))
sliderRouter.delete('/:id', authMiddleware, adminRequire, asyncHandler(deleteSlider))

export default sliderRouter
