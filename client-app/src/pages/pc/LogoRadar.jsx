/**
 * @module LogoRadar
 */

/**
 * @fileoverview This module provides a React component representing the RADAR GAME logo.
 */

import React from "react";

// Import Material-UI components and styles
import { Box } from "@mui/material";

/**
 * Radar logo image asset.
 * @type {string}
 */
import RadarLogo from "../../app/assets/image/Img-SpeedTest/Radar-logo.svg";

/**
 * LogoRadar Component.
 * A React component that renders the RADAR GAME logo inside a styled container.
 *
 * @function
 * @returns {JSX.Element} The RADAR GAME logo inside a styled container.
 */
const LogoRadar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "9%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <img
        style={{
          width: "auto",
          height: "100%",
        }}
        src={RadarLogo}
        alt="Radar-Logo"
      />
    </Box>
  );
};

export default LogoRadar;
