import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetCourseDetailWithStatusQuery } from "@/features/api/purchaseApi";

const StarRating = ({ rating, setRating }) => {
  return (
    <div className="flex items-center space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => setRating(star)}
          xmlns="http://www.w3.org/2000/svg"
          className={`w-8 h-8 cursor-pointer transition duration-200 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 .587l3.668 7.568L24 9.763l-6 5.857L19.336 24 12 20.146 4.664 24 6 15.62l-6-5.857 8.332-1.608z" />
        </svg>
      ))}
    </div>
  );
};

const CourseFeedback = () => {
  const { courseId } = useParams();
  const { data: courseData, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5); // Default rating is 5
  const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false); // Feedback submission confirmation
  const navigate = useNavigate();

  // Function to handle the post comment action
  const handlePostComment = () => {
    if (comment.trim() && rating) {
      setIsSubmitting(true); // Set submitting state
      console.log("Feedback Posted:", { comment, rating });
      // Add logic to submit the feedback to the server here
      // After submission, reset state
      setComment(""); // Clear the textarea after posting
      setRating(5); // Reset rating to default
      setIsSubmitting(false); // Reset submitting state
      setFeedbackSubmitted(true); // Show feedback submission confirmation

      // Optionally, you can redirect the user after submitting the feedback:
      // navigate(`/course-detail/${courseId}`); // Redirect to course detail page
    } else {
      console.log("Please provide both a comment and a rating before posting.");
    }
  };

  // Ensure courseData is loaded before rendering
  if (isLoading) return <div>Loading...</div>;
  if (isError || !courseData?.course) return <div>Failed to load course data</div>;

  return (
    <div className="max-w-7xl mx-auto my-5 px-4 md:px-8">
      {/* Course Title and Description */}
      <div className="mb-6">
        <h1 className="font-bold text-3xl text-blue-600">{courseData?.course?.courseTitle}</h1>
        <p className="text-lg text-gray-500">{courseData?.course?.subTitle}</p>
        {/* Render course description as HTML */}
        <div
          className="text-gray-400 mt-2"
          dangerouslySetInnerHTML={{ __html: courseData?.course?.description }}
        />
        <div className="mt-4">
          <p className="text-lg font-semibold text-gray-500">Price: ${courseData?.course?.coursePrice}</p>
          <p className="text-lg font-semibold text-gray-500">Category: {courseData?.course?.category}</p>
          <p className="text-lg font-semibold text-gray-500">Level: {courseData?.course?.courseLevel}</p>
        </div>
      </div>

      {/* Feedback Section */}
      <div className="my-4">
        <label htmlFor="rating" className="block text-xl font-medium text-gray-500">
          Rate this course
        </label>
        <StarRating rating={rating} setRating={setRating} />
      </div>

      <div className="my-4">
        <label htmlFor="comment" className="block text-xl font-medium text-gray-500">
          Leave a comment
        </label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add your comment"
          className="w-full p-4 mt-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 resize-none text-blue-800"
          rows="5"
        />
      </div>

      {/* Feedback Submission Confirmation */}
      {feedbackSubmitted && (
        <div className="text-green-600 font-semibold text-xl mt-4">
          Feedback submitted successfully!
        </div>
      )}

      {/* Post Feedback Button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={handlePostComment}
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          {isSubmitting ? "Submitting..." : "Post Feedback"}
        </button>
      </div>
    </div>
  );
};

export default CourseFeedback;
