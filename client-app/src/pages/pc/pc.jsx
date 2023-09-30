import { Box } from "@mui/material";
import React from "react";
import PcSpeedTest from "./pcSpeedTest";
import LogoRadar from "./LogoRadar";

const Pc = () => {
  return (
    <Box sx={{ bgcolor: "#232323", direction: "ltr" }}>
      <LogoRadar />
      <PcSpeedTest />
    </Box>
  );
};

export default Pc;
