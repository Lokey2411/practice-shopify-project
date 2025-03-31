import mongoose, { Schema, Document } from "mongoose";

export interface ISlider extends Document {
    image: string;
}

const SliderSchema: Schema = new Schema(
    {
        image: { type: String, required: true },
    },
    { timestamps: true }
);

export default mongoose.model<ISlider>("Slider", SliderSchema);
