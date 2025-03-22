import { useState, useEffect } from "react";
import axios from "axios";
import "./RatingPharm.scss";
import { BACKEND_URL } from "../../config";

function RatingPharm({ pharmId, initialRating }) {
  const [rating, setRating] = useState(initialRating || 0);
  const [hover, setHover] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/pharmacies/${pharmId}`
        );
        if (response.data.pharmacy) {
          setRating(response.data.pharmacy.rating);
          setRatingCount(response.data.pharmacy.rating_count);
        }
      } catch (error) {
        console.error("Error fetching rating:", error);
      }
    };

    fetchRating();
  }, [pharmId]);

  const handleRating = async (selectedRating) => {
    const newRating = selectedRating === rating ? 0 : selectedRating;

    try {
      const response = await axios.post(
        `${BACKEND_URL}/pharmacies/${pharmId}/rate`,
        { rating: newRating }
      );

      if (response.data.pharmacy) {
        setRating(response.data.pharmacy.rating);
        setRatingCount(response.data.pharmacy.rating_count);
      }
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="rating-container">
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <p
            key={star}
            className={`star-rating ${
              star <= (hover || rating) ? "filled" : ""
            }`}
            onClick={() => handleRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            ★
          </p>
        ))}
      </div>

      <p className="rating-text">
        This pharmacy has a{" "}
        <strong>{rating > 0 ? rating.toFixed(1) : 0}</strong> star rating (
        {ratingCount} {ratingCount === 1 ? "review" : "reviews"})
      </p>
    </div>
  );
}

export default RatingPharm;
