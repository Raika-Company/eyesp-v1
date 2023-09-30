import { Box, Typography } from "@mui/material";
import React from "react";

const PcSpeedBox = ({ title, iconSrc, altText, value, measure, opacity }) => {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Box sx={{ opacity: opacity }}>
          <img src={iconSrc} alt={altText} height="31px" />
        </Box>
        <Typography fontSize="1.8rem" color="#FFF" variant="subtitle2">
          {title}
        </Typography>
        <Typography color="#909090" fontSize="1.5rem" variant="subtitle2">
          {measure}
        </Typography>
      </Box>
      <Typography color="#FFF">{value !== null ? value : "--"}</Typography>
    </Box>
  );
};

export default PcSpeedBox;
