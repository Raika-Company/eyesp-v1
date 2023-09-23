import { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";
import NewNavbar from "./layouts/Navbar";
import { lightTheme, darkTheme } from "./layouts/Palette";
import { mainRoutes } from "./routes/Routes";
import LoadingSpinner from "./common/LoadingSpinner";
import "./App.css";

function App() {
  const storedThemeMode = localStorage.getItem("themeMode");
  const initialTheme = storedThemeMode === "dark" ? darkTheme : lightTheme;

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route
              path="/*"
              element={
                <Box
                  display="flex"
                  width="100%"
                  backgroundColor="#E3EEF7"
                  minHeight="100dvh"
                >
                  <NewNavbar />
                  <Box sx={{ flex: 1 }}>
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
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
