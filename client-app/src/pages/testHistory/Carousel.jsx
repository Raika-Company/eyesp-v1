import React, { useState } from 'react';
import { Box, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Carousel = ({ children, itemsToShow, itemsToShowSm }) => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 >= 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1 < children.length ? prevIndex + 1 : prevIndex));
  };

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up('md'));
  const itemsToShowAdaptive = isMD ? itemsToShow : itemsToShowSm;

  return (
    <Box position="relative" width="100%">
      <Box position="absolute" top="50%" left="0">
        <IconButton onClick={handlePrev} disabled={startIndex === 0}>
          <ArrowBackIosIcon />
        </IconButton>
      </Box>
      <Box display="flex" justifyContent="space-around">
        {React.Children.map(children, (child, index) => (
          <Box display={index >= startIndex && index < startIndex + itemsToShowAdaptive ? 'block' : 'none'} key={index}>
            {child}
          </Box>
        ))}
      </Box>
      <Box position="absolute" top="50%" right="0">
        <IconButton onClick={handleNext} disabled={startIndex + itemsToShow >= children.length}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Carousel;