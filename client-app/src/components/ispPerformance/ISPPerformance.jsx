import { Box, Typography } from "@mui/material";
import ISPNavbar from "./ISPNavbar";
import ArrowBack from "../../app/common/ArrowBack";

const ISPPerformance = () => {
  return (
    <Box display="flex">
      <ISPNavbar />
      <Box width="100%" padding="2.5vw">
        <Box display="flex" justifyContent="space-between">
          <Typography>میانگین عملکرد ISPهای استان فارس</Typography>
          <ArrowBack />
        </Box>
      </Box>
    </Box>
  );
};

export default ISPPerformance;
