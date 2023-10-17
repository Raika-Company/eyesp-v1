/**
 * @file Represents the main entry point of the application.
 */

import { Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, Container, CssBaseline, useMediaQuery } from "@mui/material";
import NewNavbar from "./layouts/Navbar";
import { lightTheme, darkTheme } from "./layouts/Palette";
import { mainRoutes, historyRoute } from "./routes/Routes";
import "./App.css";
import NewLogo from "./common/NewLogo";
import NavSection from "./layouts/NavSection";
import useDynamicMP from "./hooks/useDynamicMP";
import ThemeSwitcher from "./common/ThemeSwitcher";
import Pc from "../pages/pc/pc";
import NewTestHistory from "../pages/testHistory/TestHistory";
import BackgroundSvg from "./common/BackgroundSvg";
import LoadingSpinner from "./common/LoadingSpinner";

/**
 * Main App component rendering the layout and routing structure.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
function App() {
  const [openNav, setOpenNav] = useState(false);
  const { pathname } = useLocation();

  const toggleOpenMenu = () => {
    setOpenNav(!openNav);
  };

  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);

  const storedThemeMode = localStorage.getItem("themeMode");
  const initialTheme = storedThemeMode === "light" ? lightTheme : darkTheme;

  const [theme, setTheme] = useState(initialTheme);

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
      localStorage.setItem("themeMode", "dark");
    } else {
      setTheme(lightTheme);
      localStorage.setItem("themeMode", "light");
    }
  };

  const currentThemeMode = theme === lightTheme ? "light" : "dark";
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <ThemeProvider theme={theme}>
      <Suspense fallback={<LoadingSpinner />}>
        <CssBaseline />
        <Routes>
          <Route
            path="/*"
            element={
              <Container
                maxWidth="xl"
                sx={{
                  overflow: isMdUp ? "none" : "hidden",
                  position: "relative",
                }}
              >
                {pathname !== "/dashboard" && <BackgroundSvg />}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    background: "transparent",
                  }}
                >
                  <NewNavbar
                    toggleOpenMenu={toggleOpenMenu}
                    openNav={openNav}
                  />
                  <NewLogo />
                </Box>
                <Box
                  display="flex"
                  gap={
                    isMdUp ? mpCardContainers : openNav ? mpCardContainers : "0"
                  }
                >
                  <Box flexShrink={0}>
                    <NavSection
                      startIndex={0}
                      endIndex={2}
                      openNav={openNav}
                      setOpenNav={setOpenNav}
                    />
                    <NavSection
                      startIndex={2}
                      endIndex={undefined}
                      openNav={openNav}
                      setOpenNav={setOpenNav}
                    />
                    <ThemeSwitcher
                      openNav={openNav}
                      themeMode={currentThemeMode}
                      toggleTheme={toggleTheme}
                    />
                  </Box>
                  <Box flex={1} width="calc(100% - 5rem)">
                    <Routes>
                      {mainRoutes.map((route) => (
                        <Route
                          key={route.path}
                          path={route.path}
                          element={route.element}
                        />
                      ))}
                      <Route
                        path={historyRoute.path}
                        element={<NewTestHistory openNav={openNav} />}
                      />
                    </Routes>
                  </Box>
                </Box>
              </Container>
            }
          />
          <Route path="/app" element={<Pc />} />
        </Routes>
      </Suspense>
    </ThemeProvider>
  );
}

export default App;
