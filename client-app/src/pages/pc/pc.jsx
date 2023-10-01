import { Box } from "@mui/material";
import React from "react";
// import PcSpeedTest from "./pcSpeedTest";
import LogoRadar from "./LogoRadar";
import PcspTest from "./pcspTest";

const Pc = () => {
  return (
    <Box sx={{ bgcolor: "#232323", direction: "ltr" }}>
      <LogoRadar />
      {/* <PcSpeedTest /> */}
      <PcspTest />
    </Box>
  );
};

export default Pc;
