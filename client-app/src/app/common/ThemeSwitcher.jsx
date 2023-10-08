import {useState, useEffect} from "react";
import sun from "../assets/image/sun.svg";
import moon from "../assets/image/moon.svg";
import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  keyframes,
  styled,
} from "@mui/material";

const Icon = styled("img")`
  width: 24px;
  height: 24px;
`;

const AnimatedIconButton = styled(IconButton)`
  transition: transform 0.3s ease-out;
`;
const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(20%);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const AnimatedTypography = styled(Typography)`
  animation: ${fadeInRight} 0.25s 0.25s both;
`;
const ThemeSwitcher = ({themeMode, toggleTheme, openNav}) => {
  const theme = useTheme();
  const isDarkMode = themeMode === "dark";
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isVisible = openNav || isMdUp;

  const [moonTranslateX, setMoonTranslateX] = useState(0);
  const [sunTranslateX, setSunTranslateX] = useState(0);

  const handleThemeChange = (mode) => {
    toggleTheme(mode);
    if (mode === "dark") {
      setMoonTranslateX(46);
      setSunTranslateX(-46);
    } else {
      setMoonTranslateX(0);
      setSunTranslateX(0);
    }
  };
  useEffect(() => {
    handleThemeChange("dark");
  }, []);
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
        width: openNav ? "13rem" : "4rem",
        marginRight: isMdUp || openNav ? "initial" : "-15rem",
        transition: "all .25s linear",
        background:
          theme.palette.mode === "light"
            ? "white"
            : "radial-gradient(2039.04% 152.73% at 8.42% 0%, #354E63 0%, #243441 100%)",
      }}
    >
      {openNav ? (
        <>
          <span
            style={{
              display: "flex",
              backgroundColor: "#008EDD",
              padding: "0.4em",
              borderRadius: "50%",
            }}
          >
            <AnimatedIconButton
              style={{transform: `translateX(${sunTranslateX}px)`}}
              aria-label="change to light theme"
              onClick={() => handleThemeChange("light")}
              disabled={!isDarkMode}
            >
              <Icon src={sun} />
            </AnimatedIconButton>
          </span>

          <AnimatedIconButton
            style={{transform: `translateX(${moonTranslateX}px)`}}
            aria-label="change to dark theme"
            onClick={() => handleThemeChange("dark")}
            disabled={isDarkMode}
          >
            <Icon src={moon} />
          </AnimatedIconButton>

          <AnimatedTypography key={isDarkMode ? "dark" : "light"}>
            {isDarkMode ? "حالت روشن" : "حالت خاموش"}
          </AnimatedTypography>
        </>
      ) : (
        <AnimatedIconButton
          aria-label="change theme"
          onClick={() => handleThemeChange(isDarkMode ? "light" : "dark")}
        >
          {isDarkMode ? (
            <Icon src={moon} alt="Moon Icon" />
          ) : (
            <Icon src={sun} alt="Sun Icon" />
          )}
        </AnimatedIconButton>
      )}
    </Box>
  );
};

export default ThemeSwitcher;
