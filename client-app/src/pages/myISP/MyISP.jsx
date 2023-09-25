import { Box, useMediaQuery } from "@mui/material";
import MyService from "../../app/common/MyService,";
import UserSatisfaction from "../../app/common/UserSatisfaction";
import SoloChartPerformance from "./SoloChartPerformance";
import useDynamicMP from "../../app/hooks/useDynamicMP";

const MyISP = () => {
  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <Box
        display="flex"
        sx={{ gap: mpCardContainers, flexWrap: isSmScreen ? "wrap" : "" }}
      >
        <MyService />
        <UserSatisfaction />
      </Box>
      <SoloChartPerformance />
    </>
  );
};

export default MyISP;
