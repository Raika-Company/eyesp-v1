import React from "react";
import { Box, Typography } from "@mui/material";

const PcMiniSpeedBox = ({ iconSrc, altText, value, measure }) => {
  return (
    <Box>
      <Typography color="#FFF" fontSize="1.5rem">
        {value !== null ? value : "--"}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <div>
          <img src={iconSrc} alt={altText} height="20px" width="20px" />
        </div>
        <Typography color="#909090" fontSize="1rem" variant="subtitle2">
          {measure}
        </Typography>
      </Box>
    </Box>
  );
};

export default PcMiniSpeedBox;
