import { Box, Typography } from "@mui/material";
import React from "react";

const SoloSwitch = ({ text }) => {
  return (
    <Box
      sx={{
        padding: "0.25rem",
        backgroundColor: "#F4F4F4",
        borderRadius: "1.21875rem",
      }}
    >
      <Box
        sx={{
          paddingX: "1.25rem",
          paddingY: "0.25rem",
          backgroundColor: "#259FDA",
          borderRadius: "1.21875rem",
        }}
      >
        <Typography
          fontSize="0.875rem"
          fontFamily="PeydaBold"
          color="#FFF"
          textAlign="center"
        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default SoloSwitch;
