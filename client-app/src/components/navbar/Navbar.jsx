import React from "react";
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

const pages = [
  ["درباره ما", "/about-us"],
  ["تاریخچه تست", "/test-history"],
  ["صفحه اصلی", "/"],
];

export default function Navbar({ themeMode, toggleTheme }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const history = useNavigate();

  const handleOpenDrawer = () => {
    setDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setDrawerOpen(false);
  };

  const navigateTo = (path) => {
    history(path);
    handleCloseDrawer();
  };

  const location = useLocation();

  return (
    <AppBar
      component="nav"
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        marginTop: "16px",
        border: "1px solid rgba(0, 0, 0, 0.12)",
        borderRadius: "8px",
        maxWidth: "90%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <img src={Logo} alt="TIC Radar site" height="30px" />
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

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            marginTop: "0.5em",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            edge="start"
            color="primary"
            onClick={handleOpenDrawer}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" component="h1" color="primary">
            TIC Radar
          </Typography>
          <img src={Logo} alt="TIC Radar site" height="30px" />
        </Box>
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
