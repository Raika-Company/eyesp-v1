import React, { useState, useEffect } from "react";

const StartAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (isAnimating) {
      setTimeout(() => {
        setIsAnimating(false);
      }, 1500);
    }
  }, [isAnimating]);

  return (
    <div>
      {isAnimating ? (
        <svg width="176" height="176" viewBox="0 0 176 176">
          <circle
            cx="88"
            cy="88"
            r="78"
            fill="none"
            strokeWidth="10"
            strokeDasharray="270, 999" // 75% of full circumference to leave 25% transparent
            stroke="blue"
            style={{
              transform: "scale(1.1)",
              transformOrigin: "center center",
              transition: "transform 0.5s ease-in-out",
            }}
          />
        </svg>
      ) : null}
    </div>
  );
};

export default StartAnimation;
