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
function DrawMeter({
  amount,
  bk,
  fg,
  progress,
  prog,
  mbps = 0.0001,
  isDl,
  theme,
}) {
  const canvasRef = useRef(null);

  useEffect(() => 
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dp = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth * dp,
      ch = canvas.clientHeight * dp;
    const sizScale = ch * 0.0049;

    if (canvas.width === cw && canvas.height === ch) {
      ctx.clearRect(0, 0, cw, ch);
    } else {
      canvas.width = cw;
      canvas.height = ch;
    }
    let numberColor;

    if (theme == "dark") {
      numberColor = "#45628A";
    } else {
      numberColor = "#5E5E5E";
    }

    const startAngle = -Math.PI * 1.2;
    const endAngle = Math.PI * 0.2;





    // Drawing the trapezoid hand (pointer)
    function drawPointer(angle) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height - 78 * sizScale);
      ctx.rotate(angle);

      var pointerLength = (canvas.height / 1.6 - ctx.lineWidth) * 0.9;
      var pointerWidthTop = 0; // The triangle's top is a point, so width is 0
      var pointerWidthBottom = 15 * sizScale * 1.5;
      var smallTriangleHeight = pointerWidthBottom / 2; // Height of the small triangle at the base

      ctx.beginPath();

      // Draw the large triangle
      ctx.moveTo(0, -pointerLength); // Starting from the tip of the triangle
      ctx.lineTo(pointerWidthBottom / 2, 0); // Right bottom corner of the triangle
      ctx.lineTo(-pointerWidthBottom / 2, 0); // Left bottom corner of the triangle
      ctx.lineTo(0, -pointerLength); // Back to the tip

      // Draw the small triangle at the base of the large triangle
      ctx.moveTo(-pointerWidthBottom / 2, 0); // Left bottom corner of the large triangle
      ctx.lineTo(pointerWidthBottom / 2, 0); // Right bottom corner of the large triangle
      ctx.lineTo(0, smallTriangleHeight); // Tip of the small triangle pointing downwards

      ctx.closePath();

      // Create the gradient
      ctx.fillStyle = "#397393";
      ctx.fill();

      ctx.restore();
    }

    function normalizeMbps(mbps) {
      if (mbps <= 10) {
        return (mbps / 20);
      }
      return 0.55 + (mbps - 10) / 220;
    }

    var normalizedMbps = normalizeMbps(mbps);
    var nextPointerAngle =
      -startAngle + (endAngle - startAngle) * normalizedMbps + 0.2;

    // Animate pointer for smooth changes
    const ANIMATION_DURATION = 200;
    let startTime = null

    function animatePointer(time) {
      if (!startTime) startTime = time || performance.now()

      const deltaTime = (time - startTime) / ANIMATION_DURATION
      const currentAngle = nextPointerAngle * deltaTime

      if (deltaTime >= 1) {
        startTime = null
        drawPointer(nextPointerAngle)
      } else {
        drawPointer(currentAngle)
        requestAnimationFrame(animatePointer)
      }
    }

    animatePointer()
      , [amount, bk, fg, mbps, isDl, theme]);

  return (
    <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
  );
}

export default DrawMeter;
