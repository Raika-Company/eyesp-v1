import React, { useState } from "react";
import { Box, Card, useMediaQuery } from "@mui/material";
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
    navigateTo("/");
  };

  const toggleCompanyLogo = () => {
    navigateTo("/");
  };

  function NavigationImage(props) {
    const { src, alt, style, onClick } = props;
    return <img onClick={onClick} src={src} alt={alt} style={style} />;
  }

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
        <Card
          sx={{
            width: isAutoMosaicOpen || isSpeedIconOpen ? "300px" : "200px",
            height: "70px",
            borderRadius: "0px 0px 20px 20px",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              color: isAutoMosaicOpen ? "info.main" : "textColor.main",
              width: isAutoMosaicOpen ? "140px" : "50px",
              textAlign: isAutoMosaicOpen ? "left" : "center",
            }}
          >
            {isAutoMosaicOpen && <span>داشبورد</span>}
            <IconButton onClick={toggleAutoMosaic}>
              <AutoAwesomeMosaicIcon
                sx={{
                  color:
                    location.pathname === "/admin"
                      ? "info.main"
                      : "textColor.dark",
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
              color: isSpeedIconOpen ? "info.main" : "textColor.main",
              width: isSpeedIconOpen ? "140px" : "50px",
              textAlign: isSpeedIconOpen ? "right" : "center",
            }}
          >
            <IconButton onClick={toggleSpeedIcon}>
              <SpeedIcon
                sx={{
                  color:
                    location.pathname === "/admin/speed-test"
                      ? "info.main"
                      : "textColor.dark",
                }}
              />
            </IconButton>
            {isSpeedIconOpen && <span>تست سرعت</span>}
          </Box>
        </Card>
      </Box>
      {/* // --End--dashboardNavbar-DESKTOP--  */}
      {/* // --Start--dashboardNavbar-MOBILE-- */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          backgroundColor: "info.main",
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
              icon={<AutoAwesomeMosaicIcon fontSize="large" />}
            />
            <NavigationImage
              onClick={toggleCompanyLogo}
              src={CompanyLogo}
              alt="TIC Radar Logo"
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
              icon={<SpeedIcon fontSize="large" />}
            />
          </BottomNavigation>
        </Box>
      </Box>
      {/* // --End--dashboardNavbar-MOBILE-- */}
    </>
  );
};

export default DashboardNavbar;
