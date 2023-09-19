import React, { useEffect, useState } from "react";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Speed as SpeedIcon,
  History as HistoryIcon,
  InfoOutlined as InfoOutlinedIcon,
  SignalCellularAltOutlined as SignalCellularAltOutlinedIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../../app/assets/image/logo.png";

const NAV_ITEMS = [
  {
    label: "صفحه اصلی",
    icon: (
      <HomeIcon sx={{ width: "24px", height: "24px", cursor: "pointer" }} />
    ),
    path: "/new/dashboard",
    toggle: "isHomeOpen",
  },
  {
    label: "تست سرعت",
    icon: (
      <SpeedIcon sx={{ width: "24px", height: "24px", cursor: "pointer" }} />
    ),
    path: "/new",
    toggle: "isSpeedTest",
  },
  {
    label: "تست های گذشته",
    icon: (
      <HistoryIcon sx={{ width: "24px", height: "24px", cursor: "pointer" }} />
    ),
    path: "/new/history",
    toggle: "isHistoryTest",
  },
  {
    label: "اپراتور من",
    icon: (
      <img
        style={{
          width: "24px",
          height: "24px",
          cursor: "pointer",
          userSelect: "none",
          objectFit: "cover",
        }}
        src={CompanyLogo}
        alt="Company-logo"
      />
    ),
    path: "/ISP-performance",
    toggle: "isMyOperator",
  },
  {
    label: "اطلاعات شبکه من",
    icon: (
      <InfoOutlinedIcon
        sx={{ width: "24px", height: "24px", cursor: "pointer" }}
      />
    ),
    path: "/result",
    toggle: "isResult",
  },
  {
    label: "گزارش ها",
    icon: (
      <SignalCellularAltOutlinedIcon
        sx={{ width: "24px", height: "24px", cursor: "pointer" }}
      />
    ),
    path: "/information",
    toggle: "isInformation",
  },
];

const NewNavbar = () => {
  const [isTypographyVisible, setIsTypographyVisible] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const [stateToggles, setStateToggles] = useState({
    isHomeOpen: false,
    isSpeedTest: false,
    isHistoryTest: false,
    isMyOperator: false,
    isResult: false,
    isInformation: false,
  });

  const history = useNavigate();
  const location = useLocation();

  const toggleNavState = (toggleName, path) => {
    setStateToggles((prevState) => ({
      ...prevState,
      [toggleName]: !prevState[toggleName],
    }));
    history(path);
  };

  const toggleOpenMenu = () => {
    setOpenNav(!openNav);
  };

  useEffect(() => {
    if (openNav) {
      setTimeout(() => {
        setIsTypographyVisible(true);
      }, 80);
    } else {
      setIsTypographyVisible(false);
    }
  }, [openNav]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      marginRight="max(1.5rem, 1.5vw)"
    >
      <Box padding="0.75rem" backgroundColor="white" borderRadius="50%" marginTop="2.635rem">
        <IconButton onClick={toggleOpenMenu}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="1.96875rem"
        padding="0.75rem"
        marginTop="1.56rem"
        backgroundColor="white"
      >
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <Box
            key={item.label}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
            margin="10px 0"
          >
            <IconButton onClick={() => toggleNavState(item.toggle, item.path)}>
              {item.icon}
            </IconButton>
            {openNav && (
              <Typography
                component="span"
                variant="h6"
                sx={{
                  visibility: isTypographyVisible ? "visible" : "hidden",
                  opacity: isTypographyVisible ? 1 : 0,
                  transition: "visibility 0s linear 0.3s, opacity 0.3s",
                }}
              >
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        padding="0.75rem"
        marginTop="1.56rem"
        backgroundColor="white"
        borderRadius="1.96875rem"
      >
        {NAV_ITEMS.slice(2).map((item) => (
          <Box
            key={item.label}
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "flex-start",
              margin: "10px 0",
            }}
          >
            <IconButton onClick={() => toggleNavState(item.toggle, item.path)}>
              {item.icon}
            </IconButton>
            {openNav && (
              <Typography
                component="span"
                variant="h6"
                sx={{
                  visibility: isTypographyVisible ? "visible" : "hidden",
                  opacity: isTypographyVisible ? 1 : 0,
                  transition: "visibility 0s linear 0.3s, opacity 0.3s",
                }}
              >
                {item.label}
              </Typography>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default NewNavbar;
