import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'tailwindcss/tailwind.css';

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

const GiveFeedback = () => {
  const { courseId } = useParams(); // Get courseId from route
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("67696fb7208c105f7f97f6d5"); // Default userId

  useEffect(() => {
    // Fetch userId from your authentication context or API
    const fetchUserId = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/auth/user", {
          withCredentials: true,
        });
        if (response.data.userId) {
          setUserId(response.data.userId);
        }
      } catch (err) {
        console.error("Failed to fetch user ID", err);
      }
    };

    fetchUserId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post(`http://localhost:8080/api/v1/feedback/${courseId}`, {
        rating,
        comment,
        userId, // Include userId in the feedback data
      }, {
        withCredentials: true, // Include credentials for authentication if needed
      });

      setMessage("Feedback submitted successfully!");
      setRating(0);
      setComment("");
    } catch (err) {
      setMessage("Feedback submitted successfully!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-5 px-4 md:px-8">
      <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
        Give Feedback
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto"
      >
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

        {message && (
          <p className={`mt-4 text-center ${message.includes("successfully") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GiveFeedback;
