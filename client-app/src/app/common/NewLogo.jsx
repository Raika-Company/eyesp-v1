import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import logo from "../../app/assets/image/newLogo.svg";
import Logo from "../layouts/logo";
import CardContainer from "./CardContainer";

const NewLogo = () => {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    navigate("/");
  };

  return (
    <CardContainer
      onClick={handleBoxClick}
      sx={{
        width: "12.5625rem",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingY: "0.75rem",
        marginTop: "2.5rem",
        cursor: "pointer",
      }}
    >
      <Typography variant="logo">
        EYESP.LIVE
      </Typography>

      <Logo />
    </CardContainer>
  );
};

export default NewLogo;
