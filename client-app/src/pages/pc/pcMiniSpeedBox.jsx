import { Box, Typography } from "@mui/material";
import React from "react";

const PcMiniSpeedBox = ({
  title,
  iconSrc,
  altText,
  value,
  measure,
  filter,
}) => {
  return (
    <Box>
      <Typography color="#FFF" fontSize="1.5rem">
        {value !== null ? value : "--"}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Box sx={{ filter: filter }}>
          <img src={iconSrc} alt={altText} height="20px" width="20px" />
        </Box>

        <Typography color="#909090" fontSize="1rem" variant="subtitle2">
          {measure}
        </Typography>
      </Box>
    </Box>
  );
};

export default PcMiniSpeedBox;
