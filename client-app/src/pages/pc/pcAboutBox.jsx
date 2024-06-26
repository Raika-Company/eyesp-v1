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

const PcAboutBox = ({ iconSrc, altText, index }) => {
  return (
    <Box sx={{ cursor: "pointer", margin: index === 1 ? "0 1.5rem" : "" }}>
      <img src={iconSrc} alt={altText} height="31px" width="31px" />
    </Box>
  );
};

export default PcAboutBox;
