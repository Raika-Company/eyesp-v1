import { Box } from "@mui/material";
import React from "react";
import PcSpeedTest from "./pcSpeedTest";
import LogoRadar from "./LogoRadar";

const Pc = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexWrap: "wrap",
        direction: "ltr",
        bgcolor: "#232323",
        alignItems: "center",
        justifyContent: "center",
        p: "2rem",
      }}
    >
      <LogoRadar />
      <PcSpeedTest />
    </Box>
  );
};

export default Pc;
