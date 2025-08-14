import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

export default mongoose.model("Review", reviewSchema);
