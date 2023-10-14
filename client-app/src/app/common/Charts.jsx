import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  SvgIcon,
  Typography,
  keyframes,
  useMediaQuery,
  Grid,
  useTheme,
  Card,
  styled,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NewCardContainer from "./NewCardContainer";
import axios from "axios";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import YAxisLine from "../../pages/ispCompare/YAxisLine";
import xAxisLight from "../../app/assets/image/time-compare-light.svg";
import xAxisDark from "../../app/assets/image/time-compare-dark.svg";

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          color: "#333",
          boxShadow: "0 0 14px  rgb(0 0 0 / 40%)",
          padding: "1px",
          textAlign: "left",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            margin: "13px 19px",
          }}
        >
          <p>month: {payload[0].payload.month.split(" ")[0]}</p>
          <p>value: {payload[0].payload.value}</p>
        </div>
      </div>
    );
  }

  return null;
};
const titlesChart = [
  {
    title: "میانگین عملکرد",
    unit: "Mb/s",
  },
  {
    title: "پاکت لاس",
    unit: "%",
  },
  {
    title: "میانگین سرعت",
    unit: "Mb/s",
  },
  {
    title: "پینگ",
    unit: "Ms",
  },
];
const chartColors = [
  { stroke: "#008EDD", gradientStart: "#0091E3", gradientEnd: "#008EDD" },
  { stroke: "#FFD700", gradientStart: "#FFD740", gradientEnd: "#FFD700" },
  { stroke: "#FF0000", gradientStart: "#FF4040", gradientEnd: "#FF0000" },
  { stroke: "#008000", gradientStart: "#00A000", gradientEnd: "#008000" },
];
function GridItem({ theme, rendered, title, data, unit, color }) {
  return (
    <Grid
      item
      xs={12}
      md={12}
      sx={{
        backgroundColor: "black",
        paddingInline: "3%",
        paddingBottom: "2.25rem",
        paddingTop: "1.5rem",
        borderRadius: ".75rem",
      }}
    >
      <Box display="flex" position="relative" width="92%">
        <Box sx={{ width: "100%" }}>
          <Typography
            color="text.main"
            variant="h1"
            component="h2"
            gutterBottom
          >
            {title}
          </Typography>
          <Box
            borderRadius="3rem"
            paddingRight="3%"
            // sx={{
            //   background:
            //     theme.palette.mode === "dark"
            //       ? "radial-gradient(646.45% 156.82% at 1.67% -6.71%, rgba(103, 154, 202, 0.23) 0.31%, rgba(104, 137, 151, 0.00) 100%)"
            //       : "radial-gradient(646.45% 156.82% at 1.67% -6.71%, #E2F7FF 0.31%, rgba(188, 203, 209, 0.00) 100%)",
            // }}
            width="100%"
            height="250px"
          >
            {rendered && (
              <Box>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart width="100%" height="100%" data={data}>
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine
                      stroke="grey"
                      strokeWidth={1}
                      strokeDasharray="3 3"
                    />

                    <defs>
                      {/* <linearGradient
                        id={`gradientChart${color.stroke}`}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0.333333"
                          stopColor={color.gradientStart}
                          stopOpacity="0.167089"
                        />
                        <stop
                          offset="1"
                          stopColor={color.gradientEnd}
                          stopOpacity="0"
                        />
                      </linearGradient> */}
                      <filter
                        id="glow"
                        x="-70%"
                        y="-70%"
                        width="200%"
                        height="200%"
                      >
                        <feOffset
                          result="offOut"
                          in="SourceGraphic"
                          dx="0"
                          dy="0"
                        />
                        <feGaussianBlur
                          result="blurOut"
                          in="offOut"
                          stdDeviation="5"
                        />
                        <feBlend
                          in="SourceGraphic"
                          in2="blurOut"
                          mode="normal"
                        />
                      </filter>
                    </defs>
                    <Area
                      type="linear"
                      dataKey="value"
                      stroke={color.stroke}
                      fill={`url(#gradientChart${color.stroke})`}
                      strokeWidth={4}
                      filter="url(#glow)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>
          <img
            src={theme.palette.mode === "light" ? xAxisLight : xAxisDark}
            alt="xAxis"
            style={{ width: "100%" }}
          />
        </Box>
        <YAxisLine
          max={Math.max(...data.map((line) => line.value))}
          unit={unit}
        />
      </Box>
    </Grid>
  );
}

function generateRandomData() {
  // Generate random data for the chart
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      month: `${i} ماه`,
      value: Math.floor(Math.random() * 100), // Adjust the range as needed
    });
  }
  return data;
}
const Charts = () => {
  const theme = useTheme();
  const [ispData, setIspData] = useState([]); // state to store the data from JSON
  const [rendered, setRendered] = useState(false);
  const [currentChartData, setCurrentChartData] = useState({});
  const [randomChartData1, setRandomChartData1] = useState([]);
  const [randomChartData2, setRandomChartData2] = useState([]);
  const [randomChartData3, setRandomChartData3] = useState([]);
  const [randomChartData4, setRandomChartData4] = useState([]);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    axios
      .get("/data/chartData.json")
      .then((response) => {
        const data = response.data;
        setIspData(data);
        const defaultISPData = data.find((item) => item.id === "ایرانسل"); // find "ایرانسل" data
        if (defaultISPData) {
          setCurrentChartData(defaultISPData); // set "ایرانسل" data as default chart data
          setRandomChartData1(generateRandomData());
          setRandomChartData2(generateRandomData());
          setRandomChartData3(generateRandomData());
          setRandomChartData4(generateRandomData());
        }
      })
      .catch((error) => {
        console.log("خطا در بارگذاری اطلاعات", error);
      });
  }, []);
  useEffect(() => {
    setRendered(true);
  }, []);
  const NewCard = styled(Box)(({ theme }) => ({
    maxHeight: "54em",
    overflowY: "auto",
    backgroundColor: "#121212",
    boxShadow: "none",
    borderRadius: "0.75rem",

    // For WebKit browsers (like Chrome and Safari) to hide scrollbar
    "&::-webkit-scrollbar": {
      display: "none",
    },

    // For Firefox to hide scrollbar
    "& scrollbarWidth": "none",
  }));
  return (
    <>
      <NewCard
        sx={{
          marginTop: "1rem",
          backgroundColor: "transparent",
          flexBasis: isMdScreen ? "100%" : "49.5%",
        }}
      >
        <Grid container gap={2.5}>
          {titlesChart.map((line, index) => (
            <GridItem
              key={index}
              theme={theme}
              rendered={rendered}
              title={line.title}
              unit={line.unit}
              color={chartColors[index]} // Passing entire color object
              data={
                index === 0
                  ? randomChartData1
                  : index === 1
                  ? randomChartData2
                  : index === 2
                  ? randomChartData3
                  : randomChartData4
              }
            />
          ))}
        </Grid>{" "}
      </NewCard>
    </>
  );
};

export default Charts;
