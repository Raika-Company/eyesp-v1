import { Box } from "@mui/material";
import React from "react";
import DlandUlCharts from "./DlandUlCharts";
import ResultHistory from "./ResultTestHistory";
function TestHistory() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      paddingTop="3em"
      gap={3}
    >
      <DlandUlCharts />
      <ResultHistory />
    </Box>
  );
}

export default TestHistory;
