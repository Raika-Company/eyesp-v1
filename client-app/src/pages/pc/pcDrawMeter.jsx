/**
 * @file DrawMeter.js
 * This file contains the `DrawMeter` component which renders a meter gauge
 * on a canvas to visualize download/upload speed.
 */

// External dependencies
import React, { useRef, useEffect } from "react";

/**
 * DrawMeter Component
 *
 * This component renders a canvas that visually represents a meter gauge
 * to depict the speed in Mbps. The dial on the gauge indicates the speed
 * dynamically. The meter is styled with a gradient and the dial rotates
 * based on the mbps prop.
 *
 * Props:
 * @param {number} amount - Not directly used within the component. Potential for enhancement.
 * @param {string} bk - Background color for the meter gauge.
 * @param {string} fg - Foreground color for numbers and certain parts of the meter gauge.
 * @param {number} progress - Not directly used within the component. Potential for enhancement.
 * @param {number} prog - Not directly used within the component. Potential for enhancement.
 * @param {number} [mbps=0.0001] - Mbps speed value to be depicted on the gauge.
 * @param {boolean} [isDl=false] - Indicates if the speed is download (true) or upload (false).
 *
 * @returns {React.Element} Rendered DrawMeter component.
 */

// Constants
const POINTER_LENGTH_SCALE = 1.4;
const POINTER_WIDTH_TOP_SCALE = 9;
const NUMBER_MAPPING = [0, 15, 30, 50, 75, 100, 125, 150, 200];

/**
 * Creates a gradient for the canvas rendering context.
 */
function createGradient(ctx, start, end, colors) {
  const gradient = ctx.createLinearGradient(start.x, start.y, end.x, end.y);
  colors.forEach((color, index) =>
    gradient.addColorStop(index / (colors.length - 1), color)
  );
  return gradient;
}

/**
 * DrawMeter Component
 * Renders a canvas that visually represents a meter gauge to depict the speed in Mbps.
 */

function PcDrawMeter({ amount, bk, fg, mbps = 0.0001, isDl, theme }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dp = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth * dp;
    const ch = canvas.clientHeight * dp;
    const sizScale = ch * 0.0049;

    ctx.clearRect(0, 0, cw, ch); // Always clear to avoid residue when resizing.
    canvas.width = cw;
    canvas.height = ch;

    const numberColor = theme === "dark" ? "#45628A" : "#8f8f8f";
    const startAngle = -Math.PI * 1.2;
    const endAngle = Math.PI * 0.2;

    // Background arc
    ctx.beginPath();
    ctx.strokeStyle = bk;
    ctx.lineWidth = 20 * sizScale;
    ctx.arc(
      cw / 2,
      ch - 78 * sizScale,
      Math.max(ch / 1.5 - ctx.lineWidth, 0.1),
      startAngle,
      endAngle
    );
    ctx.stroke();

    // Gradient arc
    const gradientColors = ["#1D77FF", "#5A9CFF", "#1D77FF"];
    const gradient = createGradient(
      ctx,
      { x: cw / 2 - (ch / 1.5 - ctx.lineWidth), y: ch - 78 * sizScale },
      { x: cw / 2 + (ch / 1.5 - ctx.lineWidth), y: ch - 78 * sizScale },
      gradientColors
    );
    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.arc(
      cw / 2,
      ch - 78 * sizScale,
      Math.max(ch / 1.5 - ctx.lineWidth, 0.1),
      startAngle,
      startAngle + ((endAngle - startAngle) * mbps) / 100
    );
    ctx.stroke();

    // Numbers on the meter
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${12 * sizScale}px PeydaBold`;

    const calculatePosition = (angle, distance) => ({
      x: cw / 2 + Math.cos(angle) * (ch / 1.6 - ctx.lineWidth - distance),
      y:
        ch -
        78 * sizScale +
        Math.sin(angle) * (ch / 1.6 - ctx.lineWidth - distance),
    });

    function drawNumber(currentNumberIndex) {
      const displayedNumber = NUMBER_MAPPING[currentNumberIndex];

      if (displayedNumber === undefined) return; // Guard clause

      const angle =
        startAngle +
        (endAngle - startAngle) *
          (currentNumberIndex / (NUMBER_MAPPING.length - 1));
      const distanceFromEdge = 15 * sizScale;
      const position = calculatePosition(
        angle,
        distanceFromEdge,
        canvas.height,
        ctx.lineWidth
      );
      ctx.fillStyle = displayedNumber <= mbps ? "#fff" : numberColor;
      ctx.fillText(displayedNumber, position.x, position.y);
    }

    // if (isDl) {
    for (let i = 0; i < NUMBER_MAPPING.length; i++) {
      drawNumber(i);
    }
    // }

    // Drawing the trapezoid hand (pointer)
    function drawPointer(angle) {
      ctx.save();
      ctx.translate(cw / 2, ch - 78 * sizScale);
      ctx.rotate(angle);

      const pointerLength = (ch / POINTER_LENGTH_SCALE - ctx.lineWidth) * 0.6;
      const pointerWidthTop = POINTER_WIDTH_TOP_SCALE * sizScale * 0.6;
      const pointerWidthBottom = POINTER_WIDTH_TOP_SCALE * sizScale * 1.9;

      ctx.beginPath();
      ctx.moveTo(-pointerWidthTop / 2, -pointerLength);
      ctx.lineTo(pointerWidthTop / 2, -pointerLength);
      ctx.lineTo(pointerWidthBottom / 2, 0);
      ctx.lineTo(-pointerWidthBottom / 2, 0);
      ctx.closePath();

      // Create the gradient
      const pointerGradient = createGradient(ctx,
        { x: 0, y: -pointerLength },
        { x: 0, y: 0 },
        ["#7DB1FF", "rgba(26, 117, 255, 0.00)"]
      );
      ctx.fillStyle = pointerGradient;
      ctx.fill();

      ctx.restore();
    }
    drawPointer(-startAngle + ((endAngle - startAngle) * mbps) / 100 + 0.3);
  }, [amount, bk, fg, mbps, isDl, theme]);

  return (
    <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
  );
}

export default PcDrawMeter;
