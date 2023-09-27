import React from 'react';
import { Box, Typography } from "@mui/material";

const InfoBox = ({ iconSrc, title, value, isColumn, isTestEnds, unit }) => (
  <Box display="flex" flexDirection={isColumn ? "column" : "row"} justifyContent='center' alignItems="center" gap="0.25rem">
    <Box display='flex' >
      <img src={iconSrc} alt={title} />
      <Typography fontSize="1rem" fontFamily="PeydaLight" color="#878787">
        {title}
      </Typography>
    </Box>
    <Typography fontSize={isTestEnds ? '1.5rem !important' : '.875rem'} marginTop='.5rem' fontFamily="PeydaLight" color={isTestEnds ? '#676767' : "#878787"} >
      {value}
    </Typography>
    {isTestEnds && <Typography color='#676767aa' marginTop='-.8rem'>
      {unit}
    </Typography>}
  </Box >
);

export default InfoBox;