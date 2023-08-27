import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/navbar/Navbar";
import { lightTheme } from "./Palette";
import "./App.css";
import SpeedTest from "../components/speedtest/SpeedTest";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SpeedTest />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
