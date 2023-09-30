import { Box } from "@mui/material";
import React from "react";

const PcAboutBox = ({ iconSrc, altText }) => {
  return (
    <Box sx={{ cursor: "pointer" }}>
      <img src={iconSrc} alt={altText} height="31px" />
    </Box>
  );
};

export default PcAboutBox;
