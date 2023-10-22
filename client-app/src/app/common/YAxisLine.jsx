import { Box, Typography, useTheme } from "@mui/material";

const YAxisLine = ({ max, unit, height, onValuesGenerated }) => {
  const theme = useTheme();
  const valueOfEachRow = Math.ceil(max / 3);

  const values = [0];
  for (let i = 1; i <= 3; i++) {
    values.push(Math.floor(Math.min(i * valueOfEachRow, max)));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        position: "absolute",
        left: "-2.5rem",
      }}
    >
      <Typography>{unit}</Typography>
      <Box
        sx={{
          display: "flex",
          gap: ".5rem",
        }}
      >
        <div
          style={{
            width: ".3rem",
            background: theme.palette.mode === "dark" ? "#C9C9C9" : "#aaaa",
            borderRadius: ".5rem",
            height: height || "18.3rem",
          }}
        ></div>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column-reverse",
            justifyContent: "space-around",
          }}
        >
          {values.map((value, index) => (
            <Typography
              key={index}
              color={theme.palette.mode === "dark" ? "#fffa" : "#777"}
            >
              {value}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default YAxisLine;
