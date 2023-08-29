/*
DlandUlCharts Component:
The "DlandUlCharts" component renders a custom line chart using the Chart.js library,
 displaying data related to download and upload activities. The component offers an interactive switch 
 to toggle the visibility of the upload dataset on the chart.

Chart Configuration:
The Chart.js components and plugins are registered using ChartJS.register().
The options object defines responsive behavior, plugin configuration, and chart dimensions.
The labels array represents X-axis labels for the chart.
The data object contains two datasets (download and upload) with corresponding labels, data, and styling.

Dataset Toggle Switch
A toggle switch (PinkSwitch) is rendered to control the visibility of the upload dataset on the chart.
The switch utilizes Material-UI's InputLabel and Switch components.
The handleSwitchChange function is used to toggle the visibility of the upload dataset when the switch is toggled.

Rendering the Chart
The Line component from "react-chartjs-2" is used to render the line chart.
The options and data objects are passed to the Line component.

Additional Note:
The faker library is used to generate random mock data for the chart. You can replace it with actual data.
*/

import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { alpha } from "@mui/material/styles";
import { pink } from "@mui/material/colors";
import Switch from "@mui/material/Switch";
import { InputLabel } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import "./DlandUlCharts.css";

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
  const [chartColors, setChartColors] = useState(["#FF5733", "#EFEFEF"]);
  const [isUploadVisible, setIsUploadVisible] = useState(false); // Initially hide "آپلود" dataset

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        // labels: {
        //   padding: {
        //     bottom: 10, // Add paddingBottom to legend labels
        //   },
        // },
      },
    },
    width: "100%",
    height: "100%",
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "دانلود",
        data: labels.map(() => faker.random.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "آپلود",
        data: labels.map(() => faker.random.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        hidden: !isUploadVisible, // Conditionally hide "آپلود" dataset
      },
    ],
  };

  const handleSwitchChange = () => {
    // Toggle the visibility of the "آپلود" dataset
    setIsUploadVisible((prevValue) => !prevValue);
  };

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
            flexDirection: "row",
            height: "90%",
            justifyContent: "flex-start", // Align to the left
          }}
        >
          <Line responsive="true" options={options} data={data} />
        </Box>
      </CustomBox>
    </>
  );
}

export default DlandUlCharts;
