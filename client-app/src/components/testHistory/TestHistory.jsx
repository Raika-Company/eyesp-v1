import { Box } from "@mui/material";
import React from "react";
import DlandUlCharts from "./DlandUlCharts";
import ResultHistory from "./ResultTestHistory";
function TestHistory() {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "10em",
        }}
      >
        <DlandUlCharts />
        <ResultHistory />
      </Box>
    </>
  );
}

export default TestHistory;
