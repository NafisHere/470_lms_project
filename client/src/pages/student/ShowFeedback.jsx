import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ShowFeedback = () => {
  const { courseId } = useParams(); // Extract courseId from the route
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch feedbacks for a specific course
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:8080/api/v1/feedback/${courseId}`);
        setFeedbacks(response.data); // Assuming the API returns feedbacks in an array
      } catch (err) {
        setError("Failed to fetch feedbacks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchFeedbacks();
    }
  }, [courseId]);

  if (loading) {
    return <p>Loading feedbacks...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Feedback for Course ID: {courseId}</h2>
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback._id}>
              <p>
                <strong>User ID:</strong> {feedback.userId.name} {/* Assuming userId is populated with user details */}
              </p>
              <p>
                <strong>Rating:</strong> {feedback.rating} / 5
              </p>
              <p>
                <strong>Comment:</strong> {feedback.comment}
              </p>
              <hr />
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedbacks available for this course.</p>
      )}
    </div>
  );
};

export default ShowFeedback;
