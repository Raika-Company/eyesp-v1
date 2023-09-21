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
    <Box
      sx={{
        position: "absolute",
        bottom: "0.5rem",
        left: "1rem",
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "baseline",
      }}
    >
      <Typography
        color="#676767"
        fontSize="2rem"
        fontFamily="PeydaLight"
        fontWeight="300"
        component="span"
      >
        {value}
      </Typography>
      <Typography
        color="#676767"
        fontFamily="PeydaRegular"
        fontSize="1.25rem"
        component="span"
        mr={1} 
      >
        {unit}
      </Typography>
    </Box>
  </Box>
);

export default StatisticBox;