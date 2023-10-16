// Navbar.js
import {IconButton, useTheme} from "@mui/material";
import {Box} from "@mui/system";
import {Menu as MenuIcon} from "@mui/icons-material";
const Navbar = ({toggleOpenMenu, openNav}) => {
  const theme = useTheme();
  return (
    <Box
      padding="0.75rem"
      backgroundColor="white"
      borderRadius="50%"
      marginTop="2.3rem"
      sx={{
        background: theme.palette.mode === "light" ? "white" : "#242525",
        border: theme.palette.mode === "dark" && "1.5px solid #676767",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 0px 15px 1px rgba(255, 255, 255, 0.30)"
            : "0px 0px 18px 0px rgba(0, 0, 0, 0.15)",
      }}
    >
      <IconButton onClick={toggleOpenMenu}>
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Navbar;
