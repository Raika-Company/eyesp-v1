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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import Logo from "../../app/assets/image/logo.svg";

const pages = [
  ["درباره ما", "/about-us"],
  ["تاریخچه تست", "/test-history"],
  ["صفحه اصلی", "/"],
];

export default function Navbar() {
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
        <IconButton
          edge="start"
          color="primary"
          onClick={handleOpenDrawer}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <img src={Logo} alt="speedtest.com site" height="30px" />
          <Typography variant="h4" color="primary" sx={{ marginLeft: 2 }}>
            SPEEDTEST.COM
          </Typography>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            flexDirection: "row-reverse",
            gap: 2,
            display: { xs: "flex", md: "none" },
          }}
        >
          <img src={Logo} alt="speedtest.com site" height="30px" />
          <Typography variant="h4" color="primary">
            SPEEDTEST.COM
          </Typography>
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

        <Drawer anchor="left" open={drawerOpen} onClose={handleCloseDrawer}>
          <List>
            {pages.map(([text, path]) => (
              <ListItem key={text} onClick={() => navigateTo(path)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}
