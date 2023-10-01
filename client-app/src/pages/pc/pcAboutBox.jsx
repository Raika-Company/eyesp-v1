import { Box } from "@mui/material";
import React from "react";
/**
 * A simple React component for displaying an icon.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.iconSrc - The source URL for the icon.
 * @param {string} props.altText - The alternative text for the icon.
 * @returns {JSX.Element} - The rendered AboutBox component.
 */

const PcAboutBox = ({ iconSrc, altText }) => {
  return (
    <Box sx={{ cursor: "pointer" }}>
      <img src={iconSrc} alt={altText} height="31px" />
    </Box>
  );
};

export default PcAboutBox;
