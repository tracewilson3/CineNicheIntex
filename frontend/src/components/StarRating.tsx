// src/components/StarRating.tsx

import React, { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

interface StarRatingProps {
  initialRating?: number;
  onRate?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating = 0, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(0);

  const handleClick = (value: number) => {
    setRating(value);
    onRate?.(value);
  };

  return (
    <div>
      {[1, 2, 3, 4, 5].map((star) => (
        <i
          key={star}
          className={`bi ${
            (hover || rating) >= star ? "bi-star-fill text-warning" : "bi-star text-secondary"
          } mx-1 fs-3`}
          style={{ cursor: "pointer" }}
          onClick={() => handleClick(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        ></i>
      ))}
    </div>
  );
};

export default StarRating;
