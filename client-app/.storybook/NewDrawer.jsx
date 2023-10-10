import React, { useState, useEffect } from "react";

const NewDrawer = ({ mbps }) => {
  const baseStyle = {
    position: "absolute",
    width: "2px",
    height: "15px",
    left: "50%",
    top: "85%",
    transformOrigin: "0 -100px ",
    transition: "background-color 1s",
  };

  const startAngle = -Math.PI * 1.2;
  const endAngle = Math.PI * 0.2;
  const TOTAL_LINES = 120;

  const [isPurple, setIsPurple] = useState(Array(TOTAL_LINES).fill(false));

  function normalizeMbps(mbps) {
    mbps = Math.min(mbps, 120);
    if (mbps <= 10) {
      return mbps / 20;
    }
    return 0.55 + (mbps - 10) / 220;
  }

  const normalizedMbps = normalizeMbps(mbps);
  const pointerAngle = (endAngle - startAngle) * normalizedMbps;

  useEffect(() => {
    const currentDegree = normalizedMbps * 360;
    const purpleLinesCount = Math.floor(currentDegree / 3);
    const newIsPurple = Array(TOTAL_LINES).fill(false);

    for (let i = 0; i < purpleLinesCount; i++) {
      newIsPurple[i] = true;
    }
    setIsPurple(newIsPurple);
  }, [mbps]);

  const lines = Array.from({ length: TOTAL_LINES }).map((_, i) => {
    const degree = i * 3;
    const transitionDelay = `${i * 0.02}s`;
    const currentStyle = isPurple[i]
      ? {
          ...baseStyle,
          backgroundColor: "rgb(98, 53, 194)",
          transitionDelay: transitionDelay,
        }
      : { ...baseStyle, backgroundColor: "#1E2A37" };

    return (
      <div
        key={i}
        style={{ ...currentStyle, transform: `rotate(${degree}deg)` }}
      ></div>
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        width: "300px",
        height: "300px",
        borderRadius: "11em",
        border: "1px solid",
        boxShadow: `
            inset 0 0 90px rgb(101, 52, 193),  /* inner shadow */
            0px 4px 59px 0px rgb(101, 52, 193)  /* outer shadow */
        `,
      }}
    >
      {lines}
    </div>
  );
};

export default NewDrawer;
