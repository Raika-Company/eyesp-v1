import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";

// Styles
const styles = {
  svg: {
    transform: "rotate(-270deg)",
  },
  line: {
    stroke: "#326589",
    strokeWidth: "4",
  },
  lineActive: {
    stroke: "#57B1F0",
    strokeWidth: "6",
  },
  row: {
    padding: "50px",
  },
};

const toRadians = (angle) => angle * (Math.PI / 180);

const CircularProgressBar = ({ percentage, children }) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);

  useEffect(() => {
    const animationDuration = 0.2 * 1000; // in ms
    const frameRate = 10; // ms per frame
    const frames = animationDuration / frameRate;
    const incrementValue = (percentage - animatedPercentage) / frames;

    let currentFrame = 0;

    const interval = setInterval(() => {
      currentFrame += 1;
      setAnimatedPercentage((prev) => {
        const nextValue = prev + incrementValue;
        if (incrementValue > 0) {
          return nextValue > percentage ? percentage : nextValue;
        } else {
          return nextValue < percentage ? percentage : nextValue;
        }
      });

      if (currentFrame >= frames || animatedPercentage === percentage) {
        clearInterval(interval);
      }
    }, frameRate);

    return () => clearInterval(interval);
  }, [percentage]);

  const renderLines = () => {
    const percentageRadius = (animatedPercentage / 100) * 360;
    const lines = [];
    const radiusRate = 5;

    // This will adjust the line's starting position to be closer to the ending position by 90%
    const lineLength = 250;
    const startOffset = lineLength * 0.9;

    for (let radius = 0; radius < 360; radius += radiusRate) {
      const active =
        percentageRadius >= radius ? styles.lineActive : styles.line;

      const radiusRadians = toRadians(radius);

      const x1 = 255 + startOffset * Math.cos(radiusRadians);
      const y1 = 250 + startOffset * Math.sin(radiusRadians);
      const x2 = 255 + lineLength * Math.cos(radiusRadians);
      const y2 = 250 + lineLength * Math.sin(radiusRadians);

      lines.push(<line style={active} x1={x1} y1={y1} x2={x2} y2={y2} />);
    }
    return lines;
  };
  
  return (
    <Box
      position="relative"
      borderRadius="50%"
      padding="0.5rem"
      border="2px solid #326589"
      boxShadow={
        animatedPercentage
          ? `inset 0 0 ${animatedPercentage / 2}px #326589, 0px 0px ${
              animatedPercentage / 2
            }px #326589`
          : "none"
      }
    >
      <svg viewBox="0 0 500 500" style={styles.svg}>
        {renderLines()}
      </svg>
      {children}
    </Box>
  );
};

export default CircularProgressBar;