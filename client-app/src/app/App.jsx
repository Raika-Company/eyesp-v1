import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navbar from "../components/navbar/Navbar";
import { lightTheme } from "./Palette";
import "./App.css";
import SpeedTest from "../components/speedtest/SpeedTest";
import TestHistory from "../components/testHistory/TestHistory";
import ResultTestHistory from "../components/testHistory/ResultTestHistory";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<SpeedTest />} />
          <Route path="/testHistory" element={<TestHistory />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
