import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    image: string;
    isNewArrival: boolean;
    description: string;
}

const CategorySchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        image: { type: String },
        isNewArrival: { type: Boolean, default: false },
        description: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model<ICategory>("Category", CategorySchema);
