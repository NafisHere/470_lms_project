import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowFeedback = () => {
  const { courseId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Fetch feedbacks for the given courseId
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch(`/api/feedback/${courseId}`);
        const data = await response.json();

        if (response.ok) {
          setFeedbacks(data.feedbacks);
        } else {
          throw new Error(data.message || "Failed to load feedbacks");
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedbacks();
  }, [courseId]);

  // Show loading state
  if (isLoading) return <div>Loading feedbacks...</div>;

  // Show error state
  if (isError) return <div>Error loading feedbacks!</div>;

  // Show feedbacks or a message if no feedbacks are found
  return (
    <div className="max-w-7xl mx-auto my-5 px-4 md:px-8">
      <h2 className="font-bold text-2xl text-blue-600 mb-4">Feedbacks</h2>

      {feedbacks?.length > 0 ? (
        feedbacks.map((feedback) => (
          <div key={feedback._id} className="my-4 p-4 border-b border-gray-300">
            <div className="flex items-center space-x-2">
              {/* Display user's name */}
              <div className="text-lg font-semibold">{feedback.userId?.name || "Anonymous"}</div>
              
              {/* Display rating */}
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    xmlns="http://www.w3.org/2000/svg"
                    className={`w-6 h-6 ${star <= feedback.rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 .587l3.668 7.568L24 9.763l-6 5.857L19.336 24 12 20.146 4.664 24 6 15.62l-6-5.857 8.332-1.608z" />
                  </svg>
                ))}
              </div>
            </div>
            
            {/* Display comment */}
            <p className="mt-2 text-gray-600">{feedback.comment}</p>
          </div>
        ))
      ) : (
        <p>No feedbacks yet. Be the first to leave a review!</p>
      )}
    </div>
  );
};

export default ShowFeedback;
