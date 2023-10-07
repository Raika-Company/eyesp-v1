/**
 * A React component for displaying speed-related information.
 *
 * @component
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title or label for the speed information.
 * @param {string} props.iconSrc - The source URL for the icon representing the speed type.
 * @param {string} props.altText - The alternative text for the icon.
 * @param {number|null} props.value - The speed value to be displayed, or null if not available.
 * @param {string} props.measure - The unit of measurement for the speed value.
 * @param {string} props.filter - The filter of the component, represented as a CSS value (e.g., "0.2").
 * @param {number} [props.index] - An optional index for conditional styling.
 *
 * @returns {JSX.Element} - The rendered SpeedBox component.
 */
import React from "react";

// Import Material-UI components and styles
import { Box, Typography, useMediaQuery } from "@mui/material";

const PcSpeedBox = ({
  title,
  iconSrc,
  altText,
  value,
  measure,
  filter,
  index,
}) => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        height: "90%",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          marginX: index === 1 ? "clamp(2.3rem, 2.3rem + 1vw, 2.5rem)" : "",
        }}
        display="flex"
        flexWrap="wrap"
        alignItems="center"
        justifyContent="center"
        gap={1}
      >
        <Box
          sx={{
            filter: filter,
            width: isMdScreen ? "20px" : "30px",
            height: isMdScreen ? "20px" : "30px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={iconSrc} alt={altText} />
        </Box>
        <Typography
          fontSize="clamp(0.6rem, 0.6rem + 1vw, 2.5rem)"
          color="#FFF"
          variant="subtitle2"
          pt="0.5rem"
        >
          {title}
        </Typography>
        <Typography
          color="#909090"
          fontSize="clamp(0.6rem, 0.6rem + 1vw, 2.5rem)"
          variant="subtitle2"
          pt="0.5rem"
        >
          {measure}
        </Typography>
      </Box>

      <Box
        sx={{
          width: "100%",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="subtitle2"
          color="#FFF"
          fontSize="clamp(2.2rem, 1.4em + 2vw, 3rem)"
        >
          {value !== null ? value : "--"}
        </Typography>
      </Box>
    </Box>
  );
};

export default PcSpeedBox;
