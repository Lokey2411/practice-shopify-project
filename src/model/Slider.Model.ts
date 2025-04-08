import mongoose, { Schema, Document, InferSchemaType, ObjectId } from 'mongoose'

export interface ISlider extends Document {
	image: string
	isDeleted: boolean
}

const SliderSchema: Schema = new Schema(
	{
		image: { type: String, required: true },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true },
)

export type SliderDocument = InferSchemaType<typeof SliderSchema> & { _id: ObjectId }

export default mongoose.model<ISlider>('Slider', SliderSchema)
