import { Box, Typography } from "@mui/material";
import React from "react";

const PcMiniSpeedBox = ({
  title,
  iconSrc,
  altText,
  value,
  measure,
  opacity,
}) => {
  return (
    <Box>
      <Typography color="#FFF" fontSize="2rem">
        {value !== null ? value : "--"}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Box sx={{ opacity: opacity }}>
          <img src={iconSrc} alt={altText} height="20px" width="20px" />
        </Box>

        <Typography color="#909090" fontSize="1.5rem" variant="subtitle2">
          {measure}
        </Typography>
      </Box>
    </Box>
  );
};

export default PcMiniSpeedBox;
