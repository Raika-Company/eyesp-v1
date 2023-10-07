/**
 * A React component representing the RADAR GAME logo.
 * @component
 * @returns {JSX.Element} - The rendered LogoRadar component.
 */

import React from "react";

// Import Material-UI components and styles
import { Box } from "@mui/material";

import RadarLogo from "../../app/assets/image/Img-SpeedTest/Radar-logo.svg";

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
