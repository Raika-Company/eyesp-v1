/**
 * @module NewNavbar
 * @description Custom navbar component for the application.
 */
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
import isp from "../../app/assets/image/isp.svg";

/**
 * @typedef {Object} NavItemConfig
 * @property {string} label - Display name for the navigation item.
 * @property {function(string): JSX.Element} icon - Function that returns a JSX Element for the icon based on color.
 * @property {string} path - Router path for navigation.
 * @property {string} toggle - Toggle state name.
 */

/**
 * @const
 * @type {NavItemConfig[]}
 * @description Predefined navigation items for the navbar.
 */
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

/**
 * @function iconColor
 * @description Determines the color of an icon based on current location.
 * @param {string} path - Path to compare against current location.
 * @returns {string} - Color code.
 */
const iconColor = (path) =>
  location.pathname === path ? "#00A3FF" : "inherit";

/**
 * @component
 * @name NewNavbar
 * @description A custom navbar component.
 * @returns {JSX.Element}
 */
const NewNavbar = () => {
  const [isTypographyVisible, setIsTypographyVisible] = useState(false);
  const [openNav, setOpenNav] = useState(false);
  const toggleOpenMenu = () => {
    setOpenNav(!openNav);
  };

  const history = useNavigate();
  const location = useLocation();

  const toggleNavState = (path) => {
    history(path);
  };

  useEffect(() => {
    setIsTypographyVisible(openNav);
  }, [openNav]);

  /**
   * @component
   * @name NavItem
   * @description A single navigation item for the navbar.
   * @param {Object} props - Props for the component.
   * @param {NavItemConfig} props.item - Configuration for the navigation item.
   * @returns {JSX.Element}
   */
  const NavItem = ({ item }) => (
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
        {item.icon(iconColor(item.path))}
      </IconButton>
      {openNav && (
        <Typography
          component="span"
          variant="h6"
          sx={{
            visibility: isTypographyVisible ? "visible" : "hidden",
            opacity: isTypographyVisible ? 1 : 0,
            transition: "opacity 0.5s ease-in, visibility 0.5s ease-in",
            color: iconColor(item.path),
          }}
        >
          {item.label}
        </Typography>
      )}
    </Box>
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      marginRight="max(1.5rem, 1.5vw)"
    >
      <Box
        padding="0.75rem"
        backgroundColor="white"
        borderRadius="50%"
        marginTop="2.635rem"
      >
        <IconButton onClick={toggleOpenMenu}>
          <MenuIcon />
        </IconButton>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        borderRadius="1.96875rem"
        padding="0.75rem"
        marginTop="1.56rem"
        backgroundColor="white"
        alignSelf="stretch"
      >
        {NAV_ITEMS.slice(0, 2).map((item) => (
          <NavItem item={item} key={item.label} />
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
          <NavItem item={item} key={item.label} />
        ))}
      </Box>
    </Box>
  );
};

export default NewNavbar;