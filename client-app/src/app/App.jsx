/**
 * Main Application Component.
 *
 * The root component for the application, responsible for theme management and routing.
 * Provides a navigation bar for main routes, while some specific routes (like `/pc`) are rendered without the navigation bar.
 *
 * @module App
 */
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "../components/navbar/Navbar";
import { lightTheme, darkTheme } from "./Palette";
import SpeedTest from "../components/speedtest/SpeedTest";
import TestHistory from "../components/testHistory/TestHistory";

import "./App.css";

/**
 * Main Application Component.
 *
 * The root component for the application, responsible for theme management and routing.
 * Provides a navigation bar for main routes, while some specific routes (like `/pc`) are rendered without the navigation bar.
 *
 * @module App
 */
function App() {
  const [theme, setTheme] = useState(lightTheme);

  /**
   * Main Application Component.
   *
   * The root component for the application, responsible for theme management and routing.
   * Provides a navigation bar for main routes, while some specific routes (like `/pc`) are rendered without the navigation bar.
   *
   * @module App
   */
  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  // Determine current theme mode (either "light" or "dark")
  const currentThemeMode = theme === lightTheme ? "light" : "dark";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Main route with Navbar */}
          <Route
            path="/"
            element={
              <>
                <Navbar
                  themeMode={currentThemeMode}
                  toggleTheme={toggleTheme}
                />
                <Routes>
                  <Route
                    index
                    element={<SpeedTest themeMode={currentThemeMode} />}
                  />
                  <Route path="test-history" element={<TestHistory />} />
                </Routes>
              </>
            }
          />

          {/* PC route without Navbar */}
          <Route
            path="/pc"
            element={<SpeedTest themeMode={currentThemeMode} />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
