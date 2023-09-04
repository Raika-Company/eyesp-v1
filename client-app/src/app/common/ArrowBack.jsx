import arrowBack from "./../../app/assets/image/arrowBack.svg";
import { Box, useMediaQuery } from "@mui/material";

const ArrowBack = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box>
      {" "}
      <img
        style={{ width: isSmScreen ? "5vw" : isMdScreen ? "5vw" : "2vw" }}
        src={arrowBack}
        alt="arrowBack"
      />
    </Box>
  );
};

export default ArrowBack;
