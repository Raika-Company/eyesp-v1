import React, { useState, useEffect } from "react";
import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const SpinnerStyles = {
  position: "relative",
  margin: "auto",
  boxSizing: "border-box",
  backgroundClip: "padding-box",
  width: "200px",
  height: "200px",
  borderRadius: "100px",
  border: "4px solid rgba(255, 255, 255, 0.1)",
  WebkitMask: "linear-gradient(rgba(0, 0, 0, 0.1), #000000 90%)",
  transformOrigin: "50% 60%",
  transform: "perspective(200px) rotateX(66deg)",
  animation: "spinner-wiggle 1.2s infinite",
  "&:before, &:after": {
    content: '""',
    position: "absolute",
    margin: "-4px",
    boxSizing: "inherit",
    width: "inherit",
    height: "inherit",
    borderRadius: "inherit",
    opacity: 0.05,
    border: "inherit",
    borderColor: "transparent",
    animation:
      "spinner-spin 1.2s cubic-bezier(0.6, 0.2, 0, 0.8) infinite, spinner-fade 1.2s linear infinite",
  },
  "&:before": {
    borderTopColor: "#66e6ff",
  },
  "&:after": {
    borderTopColor: "#f0db75",
    animationDelay: "0.3s",
  },
  "@keyframes spinner-spin": {
    "100%": {
      transform: "rotate(360deg)",
    },
  },
  "@keyframes spinner-fade": {
    "20%": {
      opacity: 0.1,
    },
    "40%": {
      opacity: 1,
    },
    "60%": {
      opacity: 0.1,
    },
  },
};

const StyledSpinner = styled("div")(SpinnerStyles);

const CenteredContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100dvh",
});

const StyledPaper = styled(Paper)(({ theme }) => ({
    width: "50%",  
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 1,
    padding: "1rem",
    borderRadius: "1rem",
    [theme.breakpoints.down('md')]: {  
      width: "90%", 
    }
  }));  

function LoadingSpinner() {
  return (
    <CenteredContainer>
      <StyledPaper elevation={12}>
        <Typography
          variant="h4"
          component="h1"
          color="primary"
          sx={{ marginLeft: 2 }}
        >
          TIC Radar
        </Typography>
        <StyledSpinner />
      </StyledPaper>
    </CenteredContainer>
  );
}

export default LoadingSpinner;
