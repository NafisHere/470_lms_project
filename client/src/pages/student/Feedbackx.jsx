import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import 'tailwindcss/tailwind.css';

const Feedbackx = () => {
  const { courseId } = useParams(); // Get courseId from the route parameters
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch feedbacks for the given courseId
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/v1/feedback/${courseId}`
        );
        setFeedbacks(response.data.feedbacks);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [courseId]);

  // Calculate the average rating
  const calculateAverageRating = () => {
    if (feedbacks.length === 0) return 0;
    const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
    return (totalRating / feedbacks.length).toFixed(1); // Return rounded to 1 decimal place
  };

  if (loading) {
    return <div className="text-center text-xl mt-10">Loading feedbacks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl mt-10">Error: {error}</div>;
  }

  const averageRating = calculateAverageRating();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">Feedback for Course</h1>
      
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold">Average Rating: {averageRating}</h2>
      </div>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500">No feedbacks found for this course.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {feedbacks.map((feedback) => (
            <div 
              key={feedback._id} 
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out transform hover:-translate-y-1"
            >
              <h3 className="text-lg font-semibold mb-1 text-blue-600">User: {feedback.userId?.name || "Anonymous"}</h3>
              <p className="text-gray-600 mb-1 text-sm">Email: {feedback.userId?.email || "N/A"}</p>
              <p className="text-yellow-500 mb-1 text-sm">Rating: {feedback.rating}</p>
              <p className="text-gray-800 mb-2 text-sm">Comment: {feedback.comment}</p>
              <small className="text-gray-500 text-xs">Posted on: {new Date(feedback.createdAt).toLocaleString()}</small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Feedbackx;
