import arrowBack from "./../../app/assets/image/arrowBack.svg";
import { Box, useMediaQuery } from "@mui/material";

const ArrowBack = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box>
      {" "}
      <img
        style={{ width: isSmScreen ? "5vw" : "2vw" }}
        src={arrowBack}
        alt="arrowBack"
      />
    </Box>
  );
};

export default ArrowBack;
