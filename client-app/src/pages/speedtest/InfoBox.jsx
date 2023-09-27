import React from 'react';
import { Box, Typography } from "@mui/material";

const InfoBox = ({ iconSrc, title, value, isColumn }) => (
  <Box display="flex" flexDirection={isColumn ? "column" : "row"} justifyContent='center' alignItems="center" gap="0.25rem">
    <img src={iconSrc} alt={title} />
    <Typography fontSize="1rem" fontFamily="PeydaLight" color="#878787">
      {title}
    </Typography>
    <Typography fontSize="0.875rem" fontFamily="PeydaLight" color="#878787">
      {value}
    </Typography>
  </Box>
);

export default InfoBox;