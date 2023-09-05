import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SpeedIcon from "@mui/icons-material/Speed";
import CompanyLogo from "../../app/assets/image/logo.svg";
import AutoAwesomeMosaicIcon from "@mui/icons-material/AutoAwesomeMosaic";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import { useNavigate, useLocation } from "react-router-dom";

const pages = [
  ["داشبورد", "/admin"],
  ["تست سرعت", "/"],
];

const DashboardNavbar = () => {
  const [value, setValue] = React.useState("recents");
  const history = useNavigate();
  const location = useLocation();

  const navigateTo = (path) => {
    history(path);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [isAutoMosaicOpen, setIsAutoMosaicOpen] = useState(false);
  const [isSpeedIconOpen, setIsSpeedIconOpen] = useState(false);

  const toggleAutoMosaic = () => {
    setIsAutoMosaicOpen(!isAutoMosaicOpen);
    setIsSpeedIconOpen(false);
    navigateTo("/admin");
  };

  const toggleSpeedIcon = () => {
    setIsSpeedIconOpen(!isSpeedIconOpen);
    setIsAutoMosaicOpen(false);
    navigateTo("/admin/speed-test");
  };

  const toggleCompanyLogo = () => {
    navigateTo("/");
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
              color: isAutoMosaicOpen ? "#126AED" : "#3d3d3d",
              width: isAutoMosaicOpen ? "140px" : "50px",
              textAlign: isAutoMosaicOpen ? "left" : "center",
            }}
          >
            {isAutoMosaicOpen && <span>داشبورد</span>}
            <IconButton onClick={toggleAutoMosaic}>
              <AutoAwesomeMosaicIcon
                sx={{
                  color: location.pathname === "/admin" ? "#126AED" : "#3d3d3d",
                }}
              />
            </IconButton>
          </Box>

          <img
            onClick={toggleCompanyLogo}
            src={CompanyLogo}
            alt="Company-logo"
            style={{ cursor: "pointer", userSelect: "none" }}
          />

          <Box
            sx={{
              color: isSpeedIconOpen ? "#126AED" : "#a7a7a7",
              width: isSpeedIconOpen ? "140px" : "50px",
              textAlign: isSpeedIconOpen ? "right" : "center",
            }}
          >
            <IconButton onClick={toggleSpeedIcon}>
              <SpeedIcon
                sx={{
                  color:
                    location.pathname === "/admin/speed-test"
                      ? "#126AED"
                      : "#3d3d3d",
                }}
              />
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
            display: isSmScreen ? "flex" : "none",
          }}
        >
          <BottomNavigation
            sx={{ width: 700, height: 70 }}
            value={value}
            onChange={handleChange}
          >
            <BottomNavigationAction
              onClick={toggleAutoMosaic}
              label="داشبورد"
              value="nearby"
              icon={<AutoAwesomeMosaicIcon sx={{ fontSize: 40 }} />}
            />
            <img
              onClick={toggleCompanyLogo}
              src={CompanyLogo}
              alt="Company-logo"
              style={{
                cursor: "pointer",
                userSelect: "none",
                width: "65px",
              }}
            />
            <BottomNavigationAction
              onClick={toggleSpeedIcon}
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
