import mongoose, { Schema, Document } from 'mongoose'

export interface IFavorite extends Document {
    userId: mongoose.Types.ObjectId
    products: mongoose.Types.ObjectId[]
    isDeleted: boolean
}

const FavoriteSchema: Schema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        products: [{ type: Schema.Types.ObjectId, ref: 'Product', required: true }],
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true },
)

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema)