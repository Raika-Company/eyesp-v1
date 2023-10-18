import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const CardInformation = ({ title, value, subTitle, subValue, color }) => {
  const theme = useTheme();
  const isdark = theme.palette.mode === "dark";
  return (
    <Box position="relative">
      <Box
        display="flex"
        justifyContent="space-between"
        gap="5rem"
        alignItems="center"
        borderRadius="0.75rem"
        padding="0.81rem"
        border={isdark ? "none" : "1px solid #DADADA"}
        backgroundColor={isdark ? "#262626" : "transparent"}
      >
        <Typography variant="button1" component="span" color="text.main">
          {title}
        </Typography>
        <Typography
          variant="boxValue"
          component="span"
          color="text.main"
          lineHeight="0"
        >
          {value}
        </Typography>
      </Box>
      <Box
        position="absolute"
        display="flex"
        justifyContent="space-between"
        gap="0.4rem"
        alignItems="center"
        padding="0.35rem"
        borderRadius="0.375rem"
        backgroundColor={theme.palette.mode === "dark" ? "#404040" : "#DADADA"}
        left="1rem"
        bottom="-1.2rem"
      >
        <Typography variant="subtitle1" component="span">
          {subTitle}
        </Typography>
        <Typography
          variant="button1"
          component="span"
          color={color}
          lineHeight="0"
        >
          {subValue}
        </Typography>
      </Box>
    </Box>
  );
};

export default CardInformation;
