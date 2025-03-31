import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    displayName: string;
    permission: string[];
}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String },
        address: { type: String },
        displayName: { type: String },
        permission: { type: [String], default: ["user"] },
    },
    { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
