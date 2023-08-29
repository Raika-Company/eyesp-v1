import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline, Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/navbar/Navbar";
import { lightTheme, darkTheme } from "./Palette";
import ThemeSwitcher from "./common/ThemeSwitcher";
import SpeedTest from "../components/speedtest/SpeedTest";
import TestHistory from "../components/testHistory/TestHistory";

import "./App.css";

function App() {
  const [theme, setTheme] = useState(lightTheme);

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  const currentThemeMode = theme === lightTheme ? "light" : "dark";

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar themeMode={currentThemeMode} toggleTheme={toggleTheme} />
        <Routes>
          <Route path="/" element={<SpeedTest themeMode={currentThemeMode}/>} />
          <Route path="/test-history" element={<TestHistory />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
