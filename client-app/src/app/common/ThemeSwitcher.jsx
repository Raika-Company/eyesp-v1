import styled from "@emotion/styled";
import sun from "../assets/image/sun.svg";
import moon from "../assets/image/moon.svg";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const ThemeSwitcher = ({themeMode, toggleTheme, openNav}) => {
  const theme = useTheme();
  const isDarkMode = themeMode === "dark";
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isVisible = openNav || isMdUp;
  const handleThemeChange = (mode) => {
    if (themeMode !== mode) {
      toggleTheme(mode);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent={"flex-start"}
      borderRadius="1.96875rem"
      alignItems={"center"}
      padding="0.75rem"
      marginTop="1.56rem"
      position="relative"
      overflow="hidden"
      sx={{
        width: openNav ? "12rem" : "4rem",
        marginRight: isMdUp || openNav ? "initial" : "-15rem",
        transition: "all .25s linear",
        background:
          theme.palette.mode === "light"
            ? "white"
            : "radial-gradient(2039.04% 152.73% at 8.42% 0%, #354E63 0%, #243441 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          display: "flex",
          alignItems: "center",
          right: openNav ? "0" : "-5rem",
          opacity: openNav ? "1" : "0",
          visibility: openNav ? "visible" : "hidden",
          transition: "right .25s  .15s linear, opacity .5s .1s linear",
        }}
      >
        <span
          style={{
            display: "flex",
            backgroundColor: "#008EDD",
            padding: "0.4em",
            borderRadius: "50%",
          }}
        >
          <IconButton
            aria-label={
              isDarkMode ? "change to dark theme" : "change to light theme"
            }
            onClick={() => handleThemeChange(isDarkMode ? "dark" : "light")}
          >
            <Icon
              src={isDarkMode ? sun : moon}
              alt={isDarkMode ? "Sun Icon" : "Moon Icon"}
            />
          </IconButton>
        </span>

        <IconButton
          aria-label={
            isDarkMode ? "change to light theme" : "change to dark theme"
          }
          onClick={() => handleThemeChange(isDarkMode ? "light" : "dark")}
        >
          <Icon
            src={isDarkMode ? moon : sun}
            alt={isDarkMode ? "Moon Icon" : "Sun Icon"}
          />
        </IconButton>

        <Typography>{isDarkMode ? "حالت روشن" : "حالت خاموش"}</Typography>
      </Box>
      <IconButton
        sx={{
          visibility: openNav ? "hidden" : "visible",
          transition: "all .25s  linear",
          opacity: openNav ? "0" : "1",
        }}
        aria-label="change theme"
        onClick={() => handleThemeChange(isDarkMode ? "light" : "dark")}
      >
        {isDarkMode ? (
          <Icon src={moon} alt="Moon Icon" />
        ) : (
          <Icon src={sun} alt="Sun Icon" />
        )}
      </IconButton>
    </Box>
  );
};

export default ThemeSwitcher;
