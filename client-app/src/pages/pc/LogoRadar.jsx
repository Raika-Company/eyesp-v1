import { Box, Typography } from "@mui/material";
import React from "react";

const LogoRadar = () => {
  return (
    <Box sx={{ padding: "0.3rem 0  0 2.7rem", color: "#fff", position: "relative" }}>
      <Typography variant="text" sx={{ fontSize: "2.5rem" }}>
        RADAR
      </Typography>
      <Typography
        variant="text"
        sx={{
          position: "absolute",
          left: "41px",
          top: "33px",
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
          top: "68px",
          left: "33px",
          border:"4px solid #232323"
        }}
      ></Box>
    </Box>
  );
};

export default LogoRadar;
