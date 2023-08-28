import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { InputLabel } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import useMediaQuery from "@mui/material/useMediaQuery";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

const CustomBox = styled(Box)(({ theme }) => ({
  width: "70vw", // Default width for lg screens
  height: "20em",
  border: "2px solid #E0E0E0",
  borderRadius: "2em",
  margin: " 0 auto",
  display: "flex",
  flexDirection: "column",
  padding: "1em 2em",

  [theme.breakpoints.down("md")]: {
    width: "90vw", // Width for md screens
  },
  [theme.breakpoints.down("sm")]: {
    height: "29vh",
    width: "90vw", // Width for xs screens
  },
}));

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));
const label = { inputProps: { "aria-label": "Color switch demo" } };

function DlandUlCharts() {
  const [chartColors, setChartColors] = useState(["#FF5733", "#EFEFEF"]); // Define the initial colors

  const handleSwitchChange = () => {
    // Toggle the colors when the switch is changed
    setChartColors((prevColors) =>
      prevColors[0] === "#FF5733"
        ? ["#EFEFEF", "#FF5733"]
        : ["#FF5733", "#EFEFEF"]
    );
  };
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      <CustomBox>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            zIndex: "3",
          }}
        >
          <InputLabel sx={{ marginTop: "5px" }}>آپلود</InputLabel>
          <PinkSwitch {...label} defaultChecked onChange={handleSwitchChange} />
          <InputLabel sx={{ marginTop: "5px", paddingLeft: "30px" }}>
            دانلود
          </InputLabel>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              display: "flex",
              flexDirection: "row",
              transform: isMdScreen ? "translateY(-99px)" : "translateY(0)",

              transform: "translateY(-107px)",
              transform: isSmScreen
                ? " translate(-30px,-90px);"
                : "translateY(-107px)",
            }}
          >
            <LineChart
              width={isSmScreen ? 350 : isMdScreen ? 600 : 1000}
              height={isSmScreen ? 300 : 400}
              series={[
                { data: pData, color: chartColors[0] },
                { data: uData, color: chartColors[1] },
              ]}
              xAxis={[{ scaleType: "point", data: xLabels }]}
              yAxis={[]}
            />
          </Box>
        </Box>
      </CustomBox>
    </>
  );
}

export default DlandUlCharts;
