import { Link } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import arrowBack from "./../../app/assets/image/arrowBack.svg";

const ArrowBack = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box>
      <Link to="/admin">
        <img
          style={{
            width: isSmScreen ? "5vw" : isMdScreen ? "5vw" : "2vw",
            cursor: "pointer",
          }}
          src={arrowBack}
          alt="arrowBack"
        />
      </Link>
    </Box>
  );
};

export default ArrowBack;