/**
 * Navbar Component.
 *
 * A responsive navigation bar component built with Material-UI. It displays the site's logo, title, and navigation links.
 * On desktops, it shows navigation links inline, while on mobile it provides a hamburger menu to access the links.
 * It also includes a theme switcher.
 *
 * @component
 *
 * @param {Object} props
 * @param {"light" | "dark"} props.themeMode - The current theme mode. Either 'light' or 'dark'.
 * @param {Function} props.toggleTheme - Callback function to toggle the current theme.
 *
 * @example
 *
 * ```jsx
 * import Navbar from './Navbar';
 *
 * function App() {
 *   const [themeMode, setThemeMode] = useState("light");
 *   const toggleTheme = () => setThemeMode(prevMode => prevMode === "light" ? "dark" : "light");
 *
 *   return <Navbar themeMode={themeMode} toggleTheme={toggleTheme} />;
 * }
 * ```
 */
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";

import ThemeSwitcher from "../../app/common/ThemeSwitcher";
import Logo from "../../app/assets/image/logo.svg";

const NAVBAR_STYLES = {
  backgroundColor: "transparent",
  boxShadow: "none",
  marginTop: "16px",
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: "8px",
  maxWidth: "90%",
  marginLeft: "auto",
  marginRight: "auto",
};

const pages = [
  ["درباره ما", "/about-us"],
  ["تاریخچه تست", "/test-history"],
  ["صفحه اصلی", "/"],
];

function DesktopNav({ pages, navigateTo, location }) {
  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, gap: 3 }}>
      {pages.map(([text, path]) => (
        <Typography
          key={text}
          variant="h5"
          onClick={() => navigateTo(path)}
          sx={{
            cursor: "pointer",
            marginLeft: "20px",
            color: location.pathname === path ? "#126AED" : "#A4A4A4",
          }}
        >
          {text}
        </Typography>
      ))}
    </Box>
  );
}

function MobileNav({ handleOpenDrawer }) {
  return (
    <Box
      sx={{
        display: { xs: "flex", md: "none" },
        flexGrow: 1,
        marginTop: "0.5em",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <IconButton edge="start" color="primary" onClick={handleOpenDrawer}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h4" component="h1" color="primary">
        TIC Radar
      </Typography>
      <img src={Logo} alt="TIC Radar logo" height="30px" />
    </Box>
  );
}

export default function Navbar({ themeMode, toggleTheme }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const history = useNavigate();
  const location = useLocation();

  const handleOpenDrawer = () => setDrawerOpen(true);
  const handleCloseDrawer = () => setDrawerOpen(false);

  const navigateTo = (path) => {
    history(path);
    handleCloseDrawer();
  };

  return (
    <AppBar component="nav" position="static" sx={NAVBAR_STYLES}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <img src={Logo} alt="TIC Radar logo" height="30px" />
          <Typography
            variant="h4"
            component="h1"
            color="primary"
            sx={{ marginLeft: 2 }}
          >
            TIC Radar
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "none", md: "inline-block" } }}>
          <ThemeSwitcher themeMode={themeMode} toggleTheme={toggleTheme} />
        </Box>

        <DesktopNav pages={pages} navigateTo={navigateTo} location={location} />
        <MobileNav handleOpenDrawer={handleOpenDrawer} />

        <Drawer anchor="left" open={drawerOpen} onClose={handleCloseDrawer}>
          <List sx={{ width: "60vw" }}>
            {[...pages].reverse().map(([text, path]) => (
              <Box key={text}>
                <ListItem
                  sx={{ textAlign: "center" }}
                  onClick={() => navigateTo(path)}
                >
                  <ListItemText primary={text} />
                </ListItem>
                <Divider />
              </Box>
            ))}
          </List>
          <Box position="fixed" bottom={0} left={0}>
            <ThemeSwitcher themeMode={themeMode} toggleTheme={toggleTheme} />
          </Box>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
