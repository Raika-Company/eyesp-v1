import { Box, Typography } from "@mui/material";

const StatisticBox = ({ background, title, unit, value }) => (
  <Box
    sx={{
      background,
      height: "8.1875rem",
      borderRadius: "1.25rem",
      position: "relative",
      padding: "1rem",
    }}
  >
    <Typography
      color="#676767"
      fontSize="1.25rem"
      fontFamily="PeydaRegular"
    >
      {title}:
    </Typography>
    <Typography
      color="#676767"
      fontSize="2.5rem"
      fontFamily="PeydaLight"
      fontWeight="300"
      sx={{ position: "absolute", bottom: "1rem", left: "1rem" }}
    >
      {value}
      <Typography
        color="#676767"
        fontFamily="PeydaRegular"
        fontSize="1.25rem"
        component="span"
      >
        {unit}
      </Typography>
    </Typography>
  </Box>
);

export default StatisticBox;
