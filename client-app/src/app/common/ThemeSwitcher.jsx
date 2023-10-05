import React from "react";
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

const StyledSwitchContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

const Circle = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: blue;
  position: absolute;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => (props.moveRight ? "-35px" : "0px")});
`;

const ThemeSwitcher = ({ themeMode, toggleTheme, openNav }) => {
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
      display={isVisible ? "flex" : "none"}
      justifyContent={"flex-start"}
      borderRadius="1.96875rem"
      alignItems={"center"}
      padding="0.75rem"
      marginTop="1.56rem"
      sx={{
        background:
          theme.palette.mode === "light"
            ? "white"
            : "radial-gradient(2039.04% 152.73% at 8.42% 0%, #354E63 0%, #243441 100%)",
      }}
    >
      {openNav ? (
        <>
          <IconButton
            aria-label="change to light theme"
            onClick={() => handleThemeChange("light")}
          >
            <span
              style={{
                display: "flex",
                backgroundColor: !isDarkMode ? "#008EDD" : "transparent",
                padding: "0.4em",
                borderRadius: "50%",
              }}
            >
              <Icon src={sun} alt="Sun Icon" />
            </span>
          </IconButton>
          <IconButton
            aria-label="change to dark theme"
            onClick={() => handleThemeChange("dark")}
          >
            <span
              style={{
                display: "flex",
                backgroundColor: isDarkMode ? "#008EDD" : "transparent",
                padding: "0.4em",
                borderRadius: "50%",
              }}
            >
              <Icon src={moon} alt="Moon Icon" />
            </span>
          </IconButton>
          <Typography>{isDarkMode ? "حالت روشن" : "حالت خاموش"}</Typography>
        </>
      ) : (
        <IconButton
          aria-label="change theme"
          onClick={() => handleThemeChange(isDarkMode ? "light" : "dark")}
        >
          {isDarkMode ? (
            <Icon src={moon} alt="Moon Icon" />
          ) : (
            <Icon src={sun} alt="Sun Icon" />
          )}
        </IconButton>
      )}
    </Box>
  );
};

export default ThemeSwitcher;
