// NavSection.js
import React from "react";
import { Box } from "@mui/system";
import {
  IconButton,
  Typography,
  useMediaQuery,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  Speed as SpeedIcon,
  History as HistoryIcon,
  InfoOutlined as InfoOutlinedIcon,
  SignalCellularAltOutlined as SignalCellularAltOutlinedIcon,
} from "@mui/icons-material";
import isp from "../../app/assets/image/isp.svg";
import { useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
const NAV_ITEMS = [
  {
    label: "صفحه اصلی",
    icon: (color) => (
      <HomeIcon
        sx={{ width: "24px", height: "24px", cursor: "pointer", color }}
      />
    ),
    path: "/dashboard",
    toggle: "isHomeOpen",
  },
  {
    label: "تست سرعت",
    icon: (color) => (
      <SpeedIcon
        sx={{ width: "24px", height: "24px", cursor: "pointer", color }}
      />
    ),
    path: "/",
    toggle: "isSpeedTest",
  },
  {
    label: "تست های گذشته",
    icon: (color) => (
      <HistoryIcon
        sx={{ width: "24px", height: "24px", cursor: "pointer", color }}
      />
    ),
    path: "/history",
    toggle: "isHistoryTest",
  },
  {
    label: "اپراتور من",
    icon: (color) => (
      <img
        style={{
          width: "24px",
          height: "24px",
          cursor: "pointer",
          userSelect: "none",
          objectFit: "cover",
          color: color,
        }}
        src={isp}
        alt="Company-logo"
      />
    ),
    path: "/my-isp",
    toggle: "isMyOperator",
  },
  {
    label: "اطلاعات شبکه من",
    icon: (color) => (
      <InfoOutlinedIcon
        sx={{ width: "24px", height: "24px", cursor: "pointer", color }}
      />
    ),
    path: "/information",
    toggle: "isResult",
  },
  {
    label: "گزارش ها",
    icon: (color) => (
      <SignalCellularAltOutlinedIcon
        sx={{ width: "24px", height: "24px", cursor: "pointer", color }}
      />
    ),
    path: "/operator-performance",
    toggle: "isInformation",
  },
];

const iconColor = (path, location) =>
  location.pathname === path ? "#00A3FF" : "inherit";

const NavItem = ({ item, openNav, toggleNavState, location }) => (
  <Box
    key={item.label}
    sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      margin: "10px 0",
    }}
  >
    <IconButton onClick={() => toggleNavState(item.path)}>
      {item.icon(iconColor(item.path, location))}
    </IconButton>
    {openNav && (
      <Typography
        component="span"
        variant="h6"
        sx={{
          visibility: openNav ? "visible" : "hidden",
          opacity: openNav ? 1 : 0,
          transition: "opacity 0.5s ease-in, visibility 0.5s ease-in",
          color: iconColor(item.path, location),
          width: "120px",
        }}
      >
        {item.label}
      </Typography>
    )}
  </Box>
);

const NavSection = ({ startIndex, endIndex, openNav }) => {
  const history = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const toggleNavState = (path) => {
    history(path);
  };

  const isVisible = openNav || isMdUp;

  return (
    <Box
      display={isVisible ? "flex" : "none"}
      flexDirection="column"
      alignItems="flex-start"
      borderRadius="1.96875rem"
      padding="0.75rem"
      marginTop={startIndex === 0 ? "1rem" : "1.56rem"}
      backgroundColor="white"
      alignSelf="stretch"
      sx={{ fontSize: "0.9rem", ml: isVisible ? "0em" : "1.2em" }}
      className={openNav ? "navbox open" : "navbox"}
    >
      {NAV_ITEMS.slice(startIndex, endIndex).map((item) => (
        <NavItem
          item={item}
          key={item.label}
          openNav={openNav}
          toggleNavState={toggleNavState}
          location={location}
        />
      ))}
    </Box>
  );
};

export default NavSection;
