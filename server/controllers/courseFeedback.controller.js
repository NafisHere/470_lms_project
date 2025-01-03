import { Feedback } from "../models/courseFeedback.model.js";
import { Course } from "../models/course.model.js";
import { User } from "../models/user.model.js";

// Controller to post feedback
export const postFeedback = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { comment, rating, userId } = req.body;

    // Validate course and user
    const course = await Course.findById(courseId);
    const user = await User.findById(userId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Create new feedback
    const newFeedback = new Feedback({
      courseId,
      userId,
      comment,
      rating,
    });

    await newFeedback.save();

    // Add feedback to the course (optional)
    course.feedbacks.push(newFeedback._id);
    await course.save();

    return res.status(201).json({ message: "Feedback posted successfully", feedback: newFeedback });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};

// Controller to get all feedbacks for a course
export const getFeedbacks = async (req, res) => {
  try {
    const { courseId } = req.params;

    // Get all feedback for the given courseId
    const feedbacks = await Feedback.find({ courseId }).populate("userId", "name email");

    if (!feedbacks) {
      return res.status(404).json({ message: "No feedbacks found for this course" });
    }

    return res.status(200).json({ feedbacks });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error });
  }
};
