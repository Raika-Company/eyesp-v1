import { useState, useEffect } from "react";

const CircleChart = ({
  id,
  finalPercentage = 0,
  strokeWidth = 10,
  size = 100,
  gradientColors = ["#960000", "rgba(157, 0, 0, 0.40)"],
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const [percentage, setPercentage] = useState(0);
  const offset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      setPercentage((prevPercentage) => {
        if (prevPercentage < finalPercentage) {
          return prevPercentage + 1;
        } else if (prevPercentage > finalPercentage) {
          return prevPercentage - 1;
        } else {
          clearInterval(interval);
          return prevPercentage;
        }
      });
    }, 20);

    return () => clearInterval(interval);
  }, [finalPercentage]);
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <svg width={size} height={size}>
        <defs>
          <linearGradient
            id={"circleGradient" + id}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            {gradientColors.map((color, index) => (
              <stop
                key={index}
                offset={`${(index / (gradientColors.length - 1)) * 100}%`}
                stopColor={color}
              />
            ))}
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke="lightgray"
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={`url(#circleGradient${id})`}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90, ${size / 2}, ${size / 2})`}
          style={{
            transition: "stroke-dashoffset .05s linear",
          }}
        />
      </svg>
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "1.5rem",
        }}
      >
        {percentage}%
      </span>
    </div>
  );
};

export default CircleChart;
