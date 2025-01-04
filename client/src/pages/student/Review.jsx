import { useCreateReviewMutation } from "@/features/api/reviewApi";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const StarRating = ({ rating, setRating }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            className={`text-2xl ${
              star <= rating ? "text-yellow-500" : "text-gray-300"
            }`}
            onClick={() => setRating(star)}
          >
            ★
          </button>
        ))}
      </div>
    );
  };

const Review = () => {
  const params = useParams();
  const courseId = params.courseId;

  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() || rating <= 0) {
        toast.error("Please provide a valid description and rating.")
        return;
    }

    try {
      await createReview({ description, rating, courseId }).unwrap();
      setDescription("");
      setRating(0);
      toast.success("Review added successfully!")
    } catch (error) {
      console.error("Error adding review:", error);
      toast.error("Failed to add review. Please try again.")
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-semibold text-gray-700 mb-4">Add a Review</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
            </label>
            <StarRating rating={rating} setRating={setRating} />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Review Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-400 p-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Write your review here..."
            rows="4"></textarea>

        </div>
        <div>
          <button
            type="submit"
            className={`w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Review"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Review;