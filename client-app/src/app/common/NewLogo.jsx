import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../../app/assets/image/logo.svg";

const NewLogo = () => {
  return (
    <>
      {" "}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          backgroundColor: "#ffff",
          alignItems: "center",
          float: "left",
          borderRadius: "2rem",
          marginBottom: "1em",
          marginTop: "2.5em",
          width: "13%",
          height: "6%",
        }}
      >
        <Typography>EYESP.LIVE</Typography>

        <img style={{ width: "17%", height: "80%" }} src={logo} alt="logo" />
      </Box>{" "}
    </>
  );
};

export default NewLogo;
