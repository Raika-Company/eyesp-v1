import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";

const XAxisLine = ({ max, unit, height }) => {
  const theme = useTheme();
  const valueOfEachRow = Math.ceil(max / 3);
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const createVlues = (time, date) => ({
    time,
    date,
  });
  const values = [
    createVlues("22 تير", "12:24:45PM"),
    createVlues("22 تير", "12:24:45PM"),
    createVlues("22 تير", "12:24:45PM"),
    createVlues("22 تير", "12:24:45PM"),
  ];
  for (let i = 1; i <= 3; i++) {
    values.push(Math.floor(Math.min(i * valueOfEachRow, max)));
  }

  return (
    <Box
      sx={{
        display: "flex",
        gap: ".5rem",
        position: "absolute",
        right: "-0.7rem",
        bottom: "0.2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: ".5rem",
        }}
      >
        <div
          style={{
            width: isSmScreen ? "15.6rem" : "35.5rem",
            background: theme.palette.mode === "dark" ? "#C9C9C9" : "#aaaa",
            borderRadius: ".5rem",
            height: height || "0.3rem",
          }}
        ></div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
          }}
        >
          {values.map((value, index) => (
            <Box
              key={index}
              color={theme.palette.mode === "dark" ? "#fffa" : "#777"}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography>{value.time}</Typography>
              <Typography>{value.date}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default XAxisLine;
