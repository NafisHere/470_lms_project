import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createReview, getReviewsByCourseId, deleteReview } from "../controllers/review.controller.js";
const router = express.Router();

router.route("/:courseId").post(isAuthenticated,createReview);
router.route("/:courseId").get(getReviewsByCourseId);
router.route("/:reviewId").delete(isAuthenticated,deleteReview);

export default router;