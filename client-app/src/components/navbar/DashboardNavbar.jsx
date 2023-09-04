import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SpeedIcon from "@mui/icons-material/Speed";
import CompanyLogo from "../../app/assets/image/logo.svg";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const DashboardNavbar = () => {
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <>
      {/* // --Start--dashboardNavbar-DESKTOP-- */}
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
      {/* // --End--dashboardNavbar-DESKTOP--  */}
      {/* // --Start--dashboardNavbar-MOBILE-- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "blue",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "90px",
            bottom: "-10px",
            position: "fixed",
            zIndex: "99999999",
            alignItems: "center",
            justifyContent: "space-evenly",
            // backgroundColor: "#E8E8E8",
            display: isSmScreen ? "flex" : "none",
          }}
        >
          <BottomNavigation
            sx={{ width: 500, height: 70 }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              label="داشبورد"
              value="nearby"
              icon={<AutoAwesomeMosaicIcon sx={{ fontSize: 40 }} />}
            />
            <img
              src={CompanyLogo}
              alt="Company-logo"
              style={{
                cursor: "pointer",
                userSelect: "none",
                width: "65px",
              }}
            />
            <BottomNavigationAction
              label="تست سرعت"
              value="recents"
              icon={<SpeedIcon sx={{ fontSize: 40 }} />}
            />
          </BottomNavigation>
        </Box>
      </Box>
      {/* // --End--dashboardNavbar-MOBILE-- */}
    </>
  );
};

export default DashboardNavbar;