import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string;
    categories: mongoose.Types.ObjectId[];
    images: string[];
    price: string;
    sizes: string[];
    colors: string[];
    description: string;
}

const ProductSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        categories: [{ type: Schema.Types.ObjectId, ref: "Category", required: true }],
        images: [{ type: String, required: true }],
        price: { type: String, required: true },
        sizes: [{ type: String }],
        colors: [{ type: String }],
        description: { type: String },
    },
    { timestamps: true }
);

export default mongoose.model<IProduct>("Product", ProductSchema);
