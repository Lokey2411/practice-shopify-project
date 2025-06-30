import mongoose, { Schema, Document, InferSchemaType, ObjectId } from 'mongoose'

export interface IUser extends Document {
	username: string
	email: string
	password: string
	phone: string
	address: string
	displayName: string
	permission: string[]
	isDeleted: boolean
	lastName: string
	firstName: string
	avatar: string
}

const UserSchema: Schema = new Schema(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		phone: { type: String },
		address: { type: String },
		displayName: { type: String },
		permission: { type: [String], default: ['user'] },
		isDeleted: { type: Boolean, default: false },
		lastName: { type: String, default: '' },
		firstName: { type: String, default: '' },
		avatar: { type: String, default: '' },
	},
	{ timestamps: true },
)

/**
 * Cập nhật các tài liệu liên quan khi thông tin user thay đổi
 */
UserSchema.pre('save', async function (next) {
	if (this.isModified('username') || this.isModified('email') || this.isModified('isDeleted')) {
		await Promise.all([
			mongoose.model('Order').updateMany({ userId: this._id }, { $set: { isDeleted: this.isDeleted } }),
			mongoose.model('Favorite').updateMany({ userId: this._id }, { $set: { isDeleted: this.isDeleted } }),
			mongoose.model('Review').updateMany({ userId: this._id }, { $set: { isDeleted: this.isDeleted } }),
		])
	}
	next()
})

export type UserDocument = InferSchemaType<typeof UserSchema> & { _id: ObjectId }

export default mongoose.model<IUser>('User', UserSchema)
