import {Review} from "../models/review.model.js";

export const createReview = async (req,res) => {
    try {
        const reviewInfo = req.body;
        reviewInfo.userId = req.id;
        reviewInfo.courseId = req.params.courseId;
        if (!Object.values(reviewInfo).every(value => value && value.toString().trim().length !== 0)) {
            return res.status(400).json({
                success:false,
                message:"All fields are required."
            })
        }
        const newReview = await Review.create(reviewInfo);
        return res.status(201).json({
            success:true,
            message:"Course reviewed successfully.",
            review: newReview
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed to review course"
        })
    }
}

export const getReviewsByCourseId = async (req,res) => {
    try {
        const {courseId} = req.params;
        const reviews = await Review.find({courseId}).populate("userId", "name photoUrl");
        return res.status(200).json({
            success: true,
            reviews
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Failed to get reviews"
        })
    }
}

export const deleteReview = async (req, res) => {
    try {
        const {reviewId} = req.params;
        const review = await Review.findByIdAndDelete(reviewId);
        if(!review){
            return res.status(404).json({
                success:false,
                message:"Review not found."
            })
        }
        return res.status(200).json({
            success: true,
            message:"Review deleted successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Failed to delete review"
        })
    }
}