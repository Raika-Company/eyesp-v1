import React from 'react';
import { Box, Typography } from "@mui/material";

const InfoBox = ({ iconSrc, title, value, isColumn }) => (
  <Box display="flex" flexDirection={isColumn? "column" : "row"} alignItems="center" gap="0.25rem">
    <img src={iconSrc} alt={title} />
    <Typography variant="h5" color="text.subTitle">
      {title}
    </Typography>
    <Typography variant="h6" color="text">
      {value}
    </Typography>
  </Box>
);

export default InfoBox;