import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import SpeedTest from "../components/speedtest/SpeedTest";
import Navbar from "../components/navbar/Navbar";
import { lightTheme, darkTheme } from "./Palette";
import "./App.css";

const TestHistory = lazy(() => import("../components/testHistory/TestHistory"));
const Login = lazy(() => import("../components/login/Login"));
const Pc = lazy(() => import("../components/pc/pc"));
const DashboardNavbar = lazy(() => import("../components/navbar/DashboardNavbar"));
const Dashboard = lazy(() => import("../components/dashboard/Dashboard"));
const Province = lazy(() => import("../components/dashboard/province/Province"));
const AdminSpeedTest = lazy(() => import("../components/dashboard/AdminSpeedTest"));
const DetailTest = lazy(() => import("../components/detailTest/DetailTest"));

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
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/pc" element={<Pc themeMode={currentThemeMode} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/*" element={<DashboardRoutes />} />
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
        </Suspense>
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
        <Route path="/detail-test" element={<DetailTest />} />
      </Routes>
    </>
  );
};

export default App;