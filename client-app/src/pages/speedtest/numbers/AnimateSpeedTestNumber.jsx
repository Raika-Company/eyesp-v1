import {Box, Typography} from "@mui/material";

function valueToColor(value) {
  // Clamp the value between 1 and 200
  value = Math.min(Math.max(value, 1), 200);

  // Normalize the value to a 0-1 range
  const normalizedValue = (value - 1) / 199;

  const r = 255;
  const g = Math.round(255 * (1 - normalizedValue));
  const b = g;

  return `rgb(${r},${g},${b})`;
}

const AnimatesSpeedTestNumber = ({value, unit}) => {
  return (
    <Box
      sx={{
        display: "flex",
        transform: value > 3 ? "scale(2)" : "",
        transition: "all .25s linear",
        flexDirection: "column",
        alignItems: "center",
        background:
          "radial-gradient(circle at center top, #383e6faa 10% , #0c0d2100 55%)",
        opacity: ".8",
        width: "180px",
        height: "150px",
        borderRadius: "50% 50% 0 0",
      }}
    >
      <div
        style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          marginTop: "1rem",
          textShadow: "0 0 10px #8b96fe",
          color: valueToColor(value * 3 || 0),
          transition: "all .25s linear",
        }}
      >
        {value}
      </div>
      <Typography
        sx={{
          color: valueToColor(value * 3 || 0),
          transition: "all .25s linear",
        }}
      >
        {unit}
      </Typography>
    </Box>
  );
};
export default AnimatesSpeedTestNumber;
