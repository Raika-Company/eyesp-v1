import React from "react";
import {Box, Typography} from "@mui/material";

const PcMiniSpeedBox = ({iconSrc, altText, value, measure}) => {
  return (
    <Box>
      <Typography color="#FFF" fontSize="1.8rem">
        {value || "--"}
      </Typography>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <div>
          <img src={iconSrc} alt={altText} height="18px" width="18px" />
        </div>
        <Typography color="#909090" fontSize="1rem" variant="subtitle2">
          {measure}
        </Typography>
      </Box>
    </Box>
  );
};

export default PcMiniSpeedBox;
