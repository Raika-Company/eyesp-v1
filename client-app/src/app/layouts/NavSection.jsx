// NavSection.js
import React, { useEffect } from "react";
import { Box } from "@mui/system";
import {
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Home as HomeIcon,
  Speed as SpeedIcon,
  History as HistoryIcon,
  InfoOutlined as InfoOutlinedIcon,
  SignalCellularAltOutlined as SignalCellularAltOutlinedIcon,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "./logo";

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
      <Logo color={color} />
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
    path: "/operator-compare  ",
    toggle: "isInformation",
  },
];

const iconColor = (path, location) =>
  location.pathname === path ? "#00A3FF" : "inherit";

const NavItem = ({ item, openNav, setOpenNav, toggleNavState, location }) => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down('md'))

  return (<Box
    key={item.label}
    sx={{
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "center",
      margin: "10px 0",
      borderRadius: '1rem',
      padding: '0 .5rem',
      '&:hover': {
        background: '#f5f5f5',
      },
      transition: 'all .2s linear'
    }}
    onClick={() => {
      if (isMdDown) setOpenNav(openNav => !openNav)
      toggleNavState(item.path)
    }}
  >
    <IconButton sx={{
      '&:hover': {
        background: 'none'
      }
    }} >
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
<<<<<<< HEAD
          width: "120px",
=======
          cursor: 'pointer'
>>>>>>> 900a9179f6856b4f431af93c1eec5856f82311f2
        }}
      >
        {item.label}
      </Typography>
    )}
  </Box>)
};

const NavSection = ({ startIndex, setOpenNav, endIndex, openNav }) => {
  const history = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  const toggleNavState = (path) => {
    history(path);
  };

  const { key } = useLocation()
  useEffect(() => {
    !isMdUp && setOpenNav(false)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

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
          setOpenNav={setOpenNav}
          location={location}
        />
      ))}
    </Box>
  );
};

export default NavSection;
