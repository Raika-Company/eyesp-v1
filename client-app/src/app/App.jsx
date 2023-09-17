import { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box, CssBaseline } from "@mui/material";

import Navbar from "../components/navbar/Navbar";
import DashboardNavbar from "../components/navbar/DashboardNavbar";
import NewNavbar from "../components/navbar/NewNavbar";
import { lightTheme, darkTheme } from "./Palette";
import {
  mainRoutes,
  dashboardRoutes,
  otherRoutes,
  newSpeedTest,
} from "./routes/Routes";
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
            {otherRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="/admin/*" element={<DashboardRoutes />} />
            <Route path="/new/*" element={<NewRoutes />} />
            <Route
              path="/*"
              element={
                <>
                  <Navbar
                    themeMode={currentThemeMode}
                    toggleTheme={toggleTheme}
                  />
                  <Routes>
                    {mainRoutes.map((route) => (
                      <Route
                        key={route.path}
                        path={route.path}
                        element={route.element}
                      />
                    ))}
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
        {dashboardRoutes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </>
  );
};

const NewRoutes = () => {
  return (
    <Box display="flex" width="100%" backgroundColor="#E3EEF7">
      <NewNavbar />
      <Box sx={{ flex: 1 }}>
        <Routes>
          {newSpeedTest.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
