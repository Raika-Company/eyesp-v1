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
    history.push(path);
    handleCloseDrawer();
  };

  return (
    <AppBar component="nav" position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <img src={Logo} alt="speedtest.com site" height="30px" />
          <Typography variant="h6" sx={{ marginLeft: 2 }}>
            Speedtest.com
          </Typography>
        </Box>

        <Box sx={{ display: { xs: "flex", md: "none" } }}>
          <Typography variant="h6">Speedtest.com</Typography>
          <img src={Logo} alt="speedtest.com site" height="30px"/>
        </Box>

        <Box sx={{ display: { xs: "none", md: "flex" } }}>
          {pages.map(([text, path]) => (
            <Typography
              key={text}
              variant="subtitle1"
              onClick={() => navigateTo(path)}
              sx={{ cursor: "pointer", marginLeft: "20px" }}
            >
              {text}
            </Typography>
          ))}
        </Box>

        <IconButton
          edge="start"
          color="inherit"
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
