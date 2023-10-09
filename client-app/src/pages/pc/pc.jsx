import {Box} from "@mui/material";
import PcSpeedTest from "./pcSpeedTest";
import LogoRadar from "./LogoRadar";

const Pc = () => {
  return (
    <Box
      sx={{
        direction: "ltr",
        minHeight: "100vh",
        bgcolor: "#232323",
        p: "1rem",
      }}
    >
      <LogoRadar />
      <PcSpeedTest />
    </Box>
  );
};

export default Pc;
