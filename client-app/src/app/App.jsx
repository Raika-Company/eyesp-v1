/**
 * App Component
 *
 * This is the root component for the application, setting up routing and theme.
 *
 * @module App
 * @file App.jsx Responsible for rendering the App component.
 */

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Components
import Navbar from "../components/navbar/Navbar";
import SpeedTest from "../components/speedtest/SpeedTest";
import TestHistory from "../components/testHistory/TestHistory";

// Styles and Themes
import { lightTheme, darkTheme } from "./Palette";
import "./App.css";

/**
 * The main App component.
 *
 * @function App
 * @returns {ReactElement} Rendered App component
 */
function App() {
  // State to manage current theme, light by default
  const [theme, setTheme] = useState(lightTheme);

  /**
   * Toggles between light and dark themes.
   *
   * @function toggleTheme
   */
  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === lightTheme ? darkTheme : lightTheme));
  }

  // Compute current theme mode
  const currentThemeMode = theme === lightTheme ? "light" : "dark";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar themeMode={currentThemeMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<SpeedTest />} />
          <Route path="/test-history" element={<TestHistory />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;