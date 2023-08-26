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
import { useNavigate } from "react-router-dom";
import Logo from "../../app/assets/image/logo.svg";

const pages = [
  ["صفحه اصلی", "/"],
  ["تاریخچه تست", "/test-history"],
  ["درباره ما", "/about-us"],
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
          <img src={Logo} alt="speedtest.com site" height="30px" />
          <Typography variant="h4" color="primary" sx={{ marginLeft: 2 }}>
            SPEEDTEST.COM
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Typography variant="h4" color="primary">
            SPEEDTEST.COM
          </Typography>
          <img src={Logo} alt="speedtest.com site" height="30px" />
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map(([text, path]) => (
            <Typography
              key={text}
              variant="h5"
              onClick={() => navigateTo(path)}
              sx={{ cursor: "pointer", marginLeft: "20px" }}
            >
              {text}
            </Typography>
          ))}
        </Box>

        <IconButton
          edge="end"
          color="primary"
          onClick={handleOpenDrawer}
          sx={{ display: { xs: "block", md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

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
