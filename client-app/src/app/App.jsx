/**
 * @file Represents the main entry point of the application.
 */

import {useState, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {ThemeProvider} from "@mui/material/styles";
import {Box, Container, CssBaseline, useMediaQuery} from "@mui/material";
import NewNavbar from "./layouts/Navbar";
import {lightTheme, darkTheme} from "./layouts/Palette";
import {mainRoutes} from "./routes/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import "./App.css";
import NewLogo from "./common/NewLogo";
import NavSection from "./layouts/NavSection";
import useDynamicMP from "./hooks/useDynamicMP";
import ThemeSwitcher from "./common/ThemeSwitcher";
import Pc from "../pages/pc/pc";
import api from "./api";

/**
 * Main App component rendering the layout and routing structure.
 *
 * @returns {JSX.Element} The rendered JSX element.
 */
function App() {
  const [openNav, setOpenNav] = useState(false);

  const toggleOpenMenu = () => {
    setOpenNav(!openNav);
  };

  useEffect(() => {});

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
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/*"
              element={
                <Container
                  maxWidth={openNav ? "x1" : "100vw"}
                  sx={{overflow: isMdUp ? "" : "hidden"}}
                >
                  <Box
                    display="flex"
                    marginX={isLgUp ? "10%" : "0"}
                    justifyContent="space-between"
                    marginBottom="1rem"
                    sx={{
                      width: isLgUp ? `calc(80%)` : "100%",
                      transition: "all .25s linear",
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
                    marginX={isLgUp ? "10%" : ""}
                    gap={
                      isMdUp
                        ? mpCardContainers
                        : openNav
                        ? mpCardContainers
                        : "0"
                    }
                  >
                    <Box
                      flexShrink={0}
                      sx={{
                        position: "fixed",
                      }}
                    >
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
                    <Box
                      flexShrink={0}
                      maxWidth={isMdUp ? `calc(100% - 6rem)` : "100%"}
                      width="100%"
                      sx={{
                        marginRight: openNav ? "15rem" : isMdUp ? "5rem" : "0",
                        transition: "all .25s linear",
                      }}
                    >
                      <Routes>
                        {mainRoutes.map((route) => (
                          <Route
                            key={route.path}
                            path={route.path}
                            element={route.element}
                          />
                        ))}
                      </Routes>
                    </Box>
                  </Box>
                </Container>
              }
            />
            <Route path="/pc" element={<Pc />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
