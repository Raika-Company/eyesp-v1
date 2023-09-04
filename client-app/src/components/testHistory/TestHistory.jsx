import { Box } from "@mui/material";
import DlandUlCharts from "./DlandUlCharts";
import ResultHistory from "./ResultTestHistory";
function TestHistory() {
  return (
    <Box
      sx={{ direction: "ltr" }}
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
