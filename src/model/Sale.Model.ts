import mongoose, { Schema, Document, InferSchemaType, ObjectId } from 'mongoose'

export interface ISale extends Document {
	product: mongoose.Types.ObjectId
	percentage: number
	isFlashSale: boolean
	isDeleted: boolean
}

const SaleSchema: Schema = new Schema(
	{
		product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		percentage: { type: Number, required: true, min: 0, max: 100 },
		isFlashSale: { type: Boolean, default: false },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true },
)

export type SaleDocument = InferSchemaType<typeof SaleSchema> & { _id: ObjectId }

export default mongoose.model<ISale>('Sale', SaleSchema)
