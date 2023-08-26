import { useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { lightTheme } from "./Palette";
import "./App.css";

function App() {
  return <ThemeProvider theme={lightTheme}></ThemeProvider>;
}

export default App;
