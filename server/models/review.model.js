import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    description:{ type:String, required:true},
    rating:{ type: Number, required:true},
    isEnabled: {type:Boolean, required:true, default:true},
    userId:{ type: mongoose.Schema.Types.ObjectId, ref:'User', required:true},
    courseId:{ type: mongoose.Schema.Types.ObjectId, ref:'Course', required:true}
},{timestamps:true});

reviewSchema.index({ userId: 1, courseId: 1 }, { unique: true });

export const Review = mongoose.model("Review", reviewSchema);