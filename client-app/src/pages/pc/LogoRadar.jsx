/**
 * @module LogoRadar
 */

/**
 * @fileoverview This module provides a React component representing the RADAR GAME logo.
 */

import React from "react";

// Import Material-UI components and styles
import {Box} from "@mui/material";

/**
 * Radar logo image asset.
 * @type {string}
 */
import RadarLogo from "../../app/assets/image/Img-SpeedTest/Radar-logo.svg";
import {useMediaQuery} from "@mui/material";

/**
 * LogoRadar Component.
 * A React component that renders the RADAR GAME logo inside a styled container.
 *
 * @function
 * @returns {JSX.Element} The RADAR GAME logo inside a styled container.
 */
const LogoRadar = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Box
      sx={{
        textAlign: isSmScreen ? "center" : "",
        px: "0.6rem",
      }}
    >
      <img
        style={{
          height: isSmScreen ? "3rem" : "4rem",
        }}
        src={RadarLogo}
        alt="Radar-Logo"
      />
    </Box>
  );
};

export default LogoRadar;
