import express from "express";
import { postFeedback, getFeedbacks } from "../controllers/courseFeedback.controller.js";

const router = express.Router();

// Route to post feedback
router.post("/:courseId", postFeedback);

// Route to get all feedbacks for a course
router.get("/:courseId", getFeedbacks);

export default router;
