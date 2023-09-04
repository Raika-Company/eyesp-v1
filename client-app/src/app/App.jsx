import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Navbar from "../components/navbar/Navbar";
import { lightTheme, darkTheme } from "./Palette";
import SpeedTest from "../components/speedtest/SpeedTest";
import TestHistory from "../components/testHistory/TestHistory";
import Login from "../components/login/Login";
import Pc from "../components/pc/pc";
import DashboardNavbar from "../components/navbar/DashboardNavbar";
import Dashboard from "../components/dashboard/Dashboard";
import Province from "../components/dashboard/province/Province";

import "./App.css";
import AdminSpeedTest from "../components/dashboard/AdminSpeedTest";

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
        <Routes>
          {/* Routes without Navbar */}
          <Route path="/pc" element={<Pc themeMode={currentThemeMode} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<DashboardRoutes />} />
          <Route path="/admin/tehran" element={<DetailTest />} />

          {/* Main route with Navbar */}
          <Route
            path="/*"
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

const DashboardRoutes = () => {
  return (
    <>
      <DashboardNavbar />
      <Routes>
        <Route index element={<Dashboard/>} />
        <Route path="/:provinceName" element={<Province/>} />
        <Route path="/speed-test" element={<AdminSpeedTest />} />
      </Routes>
    </>
  );
};

export default App;
