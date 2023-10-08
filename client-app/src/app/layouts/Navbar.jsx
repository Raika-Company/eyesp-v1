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
        background:
          theme.palette.mode === "light"
            ? "white"
            : "radial-gradient(2039.04% 152.73% at 8.42% 0%, #21A6F0 0%, rgba(0, 142, 221, 0.70) 100%)",
      }}
    >
      <IconButton onClick={toggleOpenMenu}>
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Navbar;
