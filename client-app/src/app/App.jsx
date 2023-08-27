import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/navbar/Navbar";
import { lightTheme } from "./Palette";
import "./App.css";
import SpeedTest from "../components/speedtest/SpeedTest";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/speedtest" element={<SpeedTest />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
