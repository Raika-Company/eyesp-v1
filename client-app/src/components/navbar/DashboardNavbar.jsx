import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SpeedIcon from "@mui/icons-material/Speed";
import CompanyLogo from "../../app/assets/image/logo.svg";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";

const DashboardNavbar = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [isAutoMosaicOpen, setIsAutoMosaicOpen] = useState(false);
  const [isSpeedIconOpen, setIsSpeedIconOpen] = useState(false);

  const toggleAutoMosaic = () => {
    setIsAutoMosaicOpen(!isAutoMosaicOpen);
  };

  const toggleSpeedIcon = () => {
    setIsSpeedIconOpen(!isSpeedIconOpen);
  };

  return (
    <Box
      sx={{
        display: isSmScreen ? "none" : "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: isAutoMosaicOpen || isSpeedIconOpen ? "300px" : "200px",
          height: "70px",
          backgroundColor: "#E8E8E8",
          borderRadius: "0px 0px 20px 20px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          // transition: "all 0.3s ease-in-out",
        }}
      >
        <Box
          sx={{
            color: "#3d3d3d",
            width: isAutoMosaicOpen ? "140px" : "50px",
            textAlign: isAutoMosaicOpen ? "left" : "center",
          }}
        >
          {isAutoMosaicOpen && <span>داشبورد</span>}
          <IconButton
            aria-label="add to shopping cart"
            onClick={toggleAutoMosaic}
          >
            <AutoAwesomeMosaicIcon />
          </IconButton>
        </Box>
        <img
          src={CompanyLogo}
          alt="Company-logo"
          style={{ cursor: "pointer", userSelect: "none" }}
        />
        <Box
          sx={{
            color: "#a7a7a7",
            width: isSpeedIconOpen ? "140px" : "50px",
            textAlign: isSpeedIconOpen ? "right" : "center",
          }}
        >
          <IconButton
            onClick={toggleSpeedIcon}
            aria-label="add to shopping cart"
          >
            <SpeedIcon />
          </IconButton>
          {isSpeedIconOpen && <span>تست سرعت</span>}
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardNavbar;