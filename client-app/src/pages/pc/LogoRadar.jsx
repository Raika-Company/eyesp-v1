/**
 * A React component representing the RADAR GAME logo.
 * @component
 * @returns {JSX.Element} - The rendered LogoRadar component.
 */

import React from "react";

// Import Material-UI components and styles
import { Box, Typography } from "@mui/material";

const LogoRadar = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "14%",
        padding: "0 0 0 2.2rem",
        color: "#fff",
        position: "relative",
      }}
    >
      <Typography variant="text" sx={{ fontSize: "2.5rem" }}>
        RADAR
      </Typography>
      <Typography
        variant="text"
        sx={{
          position: "absolute",
          left: "33.4px",
          top: "28px",
          fontSize: "3rem",
        }}
      >
        GAME
      </Typography>
      <Box
        sx={{
          width: "18px",
          height: "18px",
          bgcolor: "red",
          borderRadius: "11rem",
          position: "absolute",
          top: "63px",
          left: "26px",
          border: "4px solid #232323",
        }}
      ></Box>
    </Box>
  );
};

export default LogoRadar;
