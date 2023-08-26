import React from "react";
import DlandUlCharts from "./DlandUlCharts";
import ResultTestHistory from "./ResultTestHistory";
import { Box } from "@mui/material";

function TestHistory() {
  return (
    <>
      <Box
        sx={{
          backgroundColor: "red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <DlandUlCharts />
        <ResultTestHistory />
      </Box>
    </>
  );
}

export default TestHistory;
