import { Box } from "@mui/material";
import React from "react";
import PcSpeedTest from "./pcSpeedTest";
import LogoRadar from "./LogoRadar";

const Pc = () => {
  return (
    <Box
      sx={{
        bgcolor: "#232323",
        direction: "ltr",
        height: "100vh",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LogoRadar />
      <PcSpeedTest />
    </Box>
  );
};

export default Pc;
