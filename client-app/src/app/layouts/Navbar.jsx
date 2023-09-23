// Navbar.js
import React, { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { Menu as MenuIcon } from "@mui/icons-material";
import "./Navbar.css";
const Navbar = ({ toggleOpenMenu, openNav }) => {
  const [isTypographyVisible, setIsTypographyVisible] = useState(false);

  useEffect(() => {
    setIsTypographyVisible(openNav);
  }, [openNav]);

  return (
    <Box
      padding="0.75rem"
      backgroundColor="white"
      borderRadius="50%"
      marginTop="2.3rem"
      
    >
      <IconButton onClick={toggleOpenMenu}>
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Navbar;
