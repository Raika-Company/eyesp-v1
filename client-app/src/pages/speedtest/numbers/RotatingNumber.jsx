import {Box, Typography} from "@mui/material";

function RotatingNumber({value, color}) {
  const numbers = Array.from({length: 10}).map((_, i) => i);
  const offset = -value * 10; // each number takes up 10% of the space

  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "2.5rem",
        width: "1.5rem",
        fontSize: "2.5rem",
        display: "inline-block",
        verticalAlign: "middle",
      }}
    >
      <div
        style={{
          transform: `translateY(${offset}%)`,
          transition: "transform .5s ease-in-out",
        }}
      >
        {numbers.map((n) => (
          <Typography
            sx={{
              height: "10%",
              fontSize: "2rem !important",
              color: color,
              fontWeight: "800",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={n}
          >
            {n}
          </Typography>
        ))}
      </div>
    </Box>
  );
}

export default RotatingNumber;
