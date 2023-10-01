/**
 * A React component for displaying speed-related information.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title or label for the speed information.
 * @param {string} props.iconSrc - The source URL for the icon representing the speed type.
 * @param {string} props.altText - The alternative text for the icon.
 * @param {number|null} props.value - The speed value to be displayed, or null if not available.
 * @param {string} props.measure - The unit of measurement for the speed value.
 * @param {string} props.opacity - The opacity of the component, represented as a CSS value (e.g., "0.2").
 * @returns {JSX.Element} - The rendered SpeedBox component.
 */
import React from "react";

// Import Material-UI components and styles
import { Box, Typography } from "@mui/material";

const PcSpeedBox = ({ title, iconSrc, altText, value, measure, opacity }) => {
  return (
    <Box>
      <Box display="flex" alignItems="center" justifyContent="center" gap={1}>
        <Box sx={{ opacity: opacity }}>
          <img src={iconSrc} alt={altText} height="31px" width="31px" />
        </Box>
        <Typography fontSize="1.8rem" color="#FFF" variant="subtitle2">
          {title}
        </Typography>
        <Typography color="#909090" fontSize="1.5rem" variant="subtitle2">
          {measure}
        </Typography>
      </Box>
      <Typography color="#FFF">{value !== null ? value : "--"}</Typography>
    </Box>
  );
};

export default PcSpeedBox;