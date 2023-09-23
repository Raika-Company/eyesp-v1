import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../../app/assets/image/newLogo.svg";

const NewLogo = () => {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    navigate("/");
  };

  return (
    <Box
      display="flex"
      width="12.5625rem"
      justifyContent="space-evenly"
      paddingY="0.75rem"
      borderRadius="2rem"
      marginTop="2.5rem"
      onClick={handleBoxClick}
      sx={{
        background:
          "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)",
        cursor: "pointer"
      }}
    >
      <Typography fontFamily="TrenchThin" fontSize="1.5rem">
        EYESP.LIVE
      </Typography>

      <img style={{ width: "36px", height: "36px" }} src={logo} alt="logo" />
    </Box>
  );
};

export default NewLogo;