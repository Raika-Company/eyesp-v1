import React, { useRef, useEffect } from "react";

function DrawMeter({ amount, bk, fg, progress, prog, mbps = 0.0001, isDl }) {
  const canvasRef = useRef(null);

  useEffect(() => {
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

    const startAngle = -Math.PI * 1.2;
    const endAngle = Math.PI * 0.2;

    ctx.beginPath();
    ctx.strokeStyle = bk;
    ctx.lineWidth = 20 * sizScale;
    ctx.arc(
      canvas.width / 2,
      canvas.height - 78 * sizScale,
      Math.max(canvas.height / 1.5 - ctx.lineWidth, 0.1),
      startAngle,
      endAngle
    );
    ctx.stroke();

    const gradient = ctx.createLinearGradient(
      canvas.width / 2 - (canvas.height / 1.5 - ctx.lineWidth),
      canvas.height - 78 * sizScale,
      canvas.width / 2 + (canvas.height / 1.5 - ctx.lineWidth),
      canvas.height - 78 * sizScale
    );
    gradient.addColorStop(0, "#84B3FA");
    gradient.addColorStop(0.5, "#5A9CFF");
    gradient.addColorStop(1, "#126AED");

    ctx.beginPath();
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 20 * sizScale;
    ctx.arc(
      canvas.width / 2,
      canvas.height - 78 * sizScale,
      Math.max(canvas.height / 1.5 - ctx.lineWidth, 0.1),
      startAngle,
      startAngle + ((endAngle - startAngle) * mbps) / 100
    );
    ctx.stroke();

    const radiusForRoundedEffect = ctx.lineWidth / 2;

    ctx.beginPath();
    var tangentStartAngle = Math.atan2(
      -Math.sin(startAngle),
      -Math.cos(startAngle)
    );
    var tangentEndAngle = Math.atan2(-Math.sin(endAngle), -Math.cos(endAngle));
    var startHalfCircleBegin = tangentStartAngle;
    var startHalfCircleEnd = tangentStartAngle + Math.PI;

    ctx.arc(
      canvas.width / 2 + Math.cos(startAngle) * (canvas.height / 1.5 - ctx.lineWidth),
      canvas.height -
        78 * sizScale +
        Math.sin(startAngle) * (canvas.height / 1.5 - ctx.lineWidth),
      radiusForRoundedEffect,
      startHalfCircleBegin,
      startHalfCircleEnd
    );
    ctx.fillStyle = mbps > 0.1 ? "#84B3FA" : fg;
    ctx.fill();

    ctx.beginPath();
    var endHalfCircleBegin = tangentEndAngle - Math.PI;
    var endHalfCircleEnd = tangentEndAngle;

    ctx.arc(
      canvas.width / 2 + Math.cos(endAngle) * (canvas.height / 1.5 - ctx.lineWidth),
      canvas.height -
        78 * sizScale +
        Math.sin(endAngle) * (canvas.height / 1.5 - ctx.lineWidth),
      radiusForRoundedEffect,
      endHalfCircleBegin,
      endHalfCircleEnd
    );
    ctx.fillStyle = mbps > 99 ? "#126AED" : fg;
    ctx.fill();

    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = 12 * sizScale + "px Peyda-Bold";

    if (isDl) {
      let currentNumberIndex = 0;
      let frameCounter = 0;

      function drawNumber() {
        if (currentNumberIndex > 10) return;

        frameCounter++;

        if (frameCounter % 10 == 0) {
          let angle =
            startAngle + (endAngle - startAngle) * (currentNumberIndex / 10);
          let distanceFromEdge = 15 * sizScale;
          let x =
            canvas.width / 2 +
            Math.cos(angle) *
              (canvas.height / 1.6 - ctx.lineWidth - distanceFromEdge);
          let y =
            canvas.height -
            78 * sizScale +
            Math.sin(angle) *
              (canvas.height / 1.6 - ctx.lineWidth - distanceFromEdge);
          ctx.fillStyle = currentNumberIndex * 10 <= mbps ? "#126AED" : "black";
          ctx.fillText(currentNumberIndex * 10, x, y);

          currentNumberIndex++;
        }
        requestAnimationFrame(drawNumber);
      }

      drawNumber();
    } else {
      for (let i = 0; i <= 10; i++) {
        let angle = startAngle + (endAngle - startAngle) * (i / 10);
        let distanceFromEdge = 15 * sizScale;
        let x =
          canvas.width / 2 +
          Math.cos(angle) * (canvas.height / 1.6 - ctx.lineWidth - distanceFromEdge);
        let y =
          canvas.height -
          78 * sizScale +
          Math.sin(angle) * (canvas.height / 1.6 - ctx.lineWidth - distanceFromEdge);
        ctx.fillStyle = i * 10 <= mbps ? "#126AED" : "black";
        ctx.fillText(i * 10, x, y);
      }
    }

    // Drawing the trapezoid hand (pointer)
    function drawPointer(angle) {
      ctx.save();
      ctx.translate(canvas.width / 2, canvas.height - 78 * sizScale);
      ctx.rotate(angle);

      var pointerLength = (canvas.height / 1.6 - ctx.lineWidth) * 0.7;
      var pointerWidthTop = 9 * sizScale * 1.5;
      var pointerWidthBottom = 15 * sizScale * 1.5;

      ctx.beginPath();
      // Start from the narrower end
      ctx.moveTo(-pointerWidthTop / 2, -pointerLength);
      ctx.lineTo(pointerWidthTop / 2, -pointerLength);
      // Drawing the wider base
      ctx.lineTo(pointerWidthBottom / 2, 0);
      ctx.lineTo(-pointerWidthBottom / 2, 0);
      ctx.closePath();

      // Create the gradient
      var gradient = ctx.createLinearGradient(0, -pointerLength, 0, 0);
      gradient.addColorStop(0, "#126AED");
      gradient.addColorStop(1, "#84B3FA");
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.restore();
    }
    var pointerAngle =
      -startAngle + ((endAngle - startAngle) * mbps) / 100 + 0.3;
    drawPointer(pointerAngle);
  }, [amount, bk, fg, mbps, isDl]);

  return (
    <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }}></canvas>
  );
}

export default DrawMeter;
