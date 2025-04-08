import mongoose, { Schema, Document, InferSchemaType, ObjectId } from 'mongoose'

export interface ICategory extends Document {
	name: string
	image: string
	isNewArrival: boolean
	description: string
	isDeleted: boolean
}

const CategorySchema: Schema = new Schema(
	{
		name: { type: String, required: true },
		image: { type: String },
		isNewArrival: { type: Boolean, default: false },
		description: { type: String },
		isDeleted: { type: Boolean, default: false },
	},
	{ timestamps: true },
)

/**
 * Cập nhật các sản phẩm liên quan khi danh mục thay đổi
 */
CategorySchema.post('save', async function (doc, next) {
	if (this.isModified('name') || this.isModified('isDeleted')) {
		await mongoose
			.model('Product')
			.updateMany(
				{ categories: this._id },
				{ $set: { 'categories.$[elem].name': this.name, 'isDeleted': this.isDeleted } },
				{ arrayFilters: [{ 'elem._id': this._id }] },
			)
	}
	next()
})
export type CategoryDocument = InferSchemaType<typeof CategorySchema> & { _id: ObjectId }
export default mongoose.model<ICategory>('Category', CategorySchema)
