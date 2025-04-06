import mongoose, { Schema, Document } from 'mongoose'

export interface IOrder extends Document {
    userId: mongoose.Types.ObjectId
    products: mongoose.Types.ObjectId[]
    price: string
    status: string
    address: string
    isDeleted: boolean
}

const OrderSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
        price: { type: String, required: true },
        status: { type: String, enum: ['Pending', 'Processing', 'Completed', 'Cancelled'], default: 'Pending' },
        address: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
)

export default mongoose.model<IOrder>('Order', OrderSchema)