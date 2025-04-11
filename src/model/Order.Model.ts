import mongoose, { Schema, Document, InferSchemaType, Types } from 'mongoose'

export interface IOrder extends Document {
	userId: Types.ObjectId
	products: { productId: Types.ObjectId; quantity: number }[]
	price: number
	status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled'
	address: string
	isDeleted: boolean
	createdAt: Date
	updatedAt: Date
}

const OrderSchema: Schema = new Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		products: [
			{
				productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
				quantity: { type: Number, required: true, min: 1 },
			},
		],
		price: { type: Number, required: true, min: 0 },
		status: {
			type: String,
			enum: ['Pending', 'Processing', 'Completed', 'Cancelled'],
			default: 'Pending',
		},
		address: { type: String, required: true, trim: true },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true },
)

export type OrderDocument = InferSchemaType<typeof OrderSchema> & { _id: Types.ObjectId }

export default mongoose.model<IOrder>('Order', OrderSchema)
