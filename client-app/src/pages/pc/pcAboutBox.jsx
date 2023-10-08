import React from "react";
import { Box } from "@mui/material";

/**
 * A simple React component for displaying an icon.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.iconSrc - The source URL for the icon.
 * @param {string} props.altText - The alternative text for the icon.
 * @param {number} props.index - Index value to conditionally set the margin.
 *
 * @returns {JSX.Element} - The rendered PcAboutBox component.
 */
const PcAboutBox = ({ iconSrc, altText, index }) => {
  return (
    <Box
      sx={{
        cursor: "pointer",
        margin: index === 1 ? "0 0.8rem" : "",
        userSelect: "none",
      }}
    >
      <img src={iconSrc} alt={altText} height="31px" width="31px" />
    </Box>
  );
};

export default PcAboutBox;
