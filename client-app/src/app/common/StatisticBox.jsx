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
    <Typography color="text.main" variant="h3">
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
      <Typography variant="h2" color="text.main" component="span">
        {value}
      </Typography>
      <Typography variant="h5" color="text.main" component="span" mr={1}>
        {unit}
      </Typography>
    </Box>
  </Box>
);

export default StatisticBox;
