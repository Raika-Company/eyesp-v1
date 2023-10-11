import {Box, Stack} from "@mui/material";
import ConflictDetailsCard from "./components/ConflictDetailsCard";
import AllSituationCard from "./components/AllSituationCard";
import CompareTable from "./components/CompareTable";

const NewDashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        // gap: "2rem",
      }}
    >
      <Stack direction="column" gap="2rem" flexGrow={1}>
        <ConflictDetailsCard />
        <AllSituationCard />
        <Stack direction="row" width="50%" gap="2rem">
          <CompareTable title="اپراتور‌های برتر" />
          <CompareTable title="استان‌های برتر" showProvince />
        </Stack>
      </Stack>
      <Box>This is the end</Box>
    </Box>
  );
};

export default NewDashboard;
