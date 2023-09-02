import React, { useState, memo } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  AutoAwesomeMosaic as AutoAwesomeMosaicIcon,
  Speed as SpeedIcon,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import CompanyLogo from "../../app/assets/image/logo.svg";

const routes = ["/admin", "/admin/speed-test"];
const texts = ["صفحه اصلی", "تست سرعت"];
const ACTIVE_COLOR = "#126AED";
const INACTIVE_COLOR = "#9B9B9B";
const ICON_SIZE = { width: "36px", height: "36px" };

const styles = {
  logoStyle: {
    width: ICON_SIZE.width,
    height: ICON_SIZE.height,
    cursor: "pointer",
  },
};

/**
 * NavLink component represents each navigation link item.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.index - The index of the link item.
 * @param {function} props.navigateTo - Function to handle navigation.
 * @param {Object} props.location - Location object from react-router.
 * @param {boolean} props.isOpen - Flag to indicate if the drawer is open.
 * @returns {JSX.Element}
 */

const NavLink = memo(({ index, navigateTo, location, isOpen }) => {
  const isActive = location.pathname === routes[index];
  const iconColor = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

  return (
    <ListItem
      onClick={() => navigateTo(index)}
      sx={{ backgroundColor: isActive ? "background.paper" : "transparent" }}
    >
      <ListItemText
        primary={texts[index]}
        sx={{
          maxWidth: isOpen ? "200px" : "0",
          overflow: "hidden",
          transition: "max-width 0.3s",
          whiteSpace: "nowrap",
          order: 2,
          color: iconColor,
        }}
      />
      <ListItemIcon sx={{ color: iconColor }}>
        {index % 2 === 0 ? <AutoAwesomeMosaicIcon /> : <SpeedIcon />}
      </ListItemIcon>
    </ListItem>
  );
});

/**
 * DashboardNavbar is the main navbar component for the dashboard.
 *
 * @returns {JSX.Element}
 */
export default function DashboardNavbar() {
  console.log("Hi")
  const [isOpen, setIsOpen] = useState(true);
  const [key, setKey] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Toggles the state of the drawer (open/close).
   */
  const toggleDrawer = () => setIsOpen((prev) => !prev);

  /**
   * Handles navigation based on the given index.
   *
   * @param {number} index - The index of the route to navigate to.
   */
  const navigateTo = (index) => {
    navigate(routes[index]);
    setKey((prevKey) => prevKey + 1);
  };
  return (
    <Box key={key}>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <IconButton color="inherit">
              <AutoAwesomeMosaicIcon />
            </IconButton>
            <IconButton color="inherit">
              <SpeedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Drawer
          variant="permanent"
          anchor="right"
          open={isOpen}
          sx={{
            "& .MuiDrawer-paper": {
              width: isOpen ? "max(240px, 10vw)" : 60,
              overflowX: "hidden",
              transition: "width 0.3s",
            },
          }}
        >
          <List>
            <ListItem sx={{ justifyContent: "flex-start", marginY: "1rem" }}>
              <ListItemIcon onClick={toggleDrawer}>
                <img
                  src={CompanyLogo}
                  alt="Company Logo"
                  style={styles.logoStyle}
                />
              </ListItemIcon>
            </ListItem>
            {texts.map((_, index) => (
              <NavLink
                key={index}
                index={index}
                navigateTo={navigateTo}
                location={location}
                isOpen={isOpen}
              />
            ))}
          </List>
        </Drawer>
      </Box>
    </Box>
  );
};
