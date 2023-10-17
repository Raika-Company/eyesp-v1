import {
  Box,
  Typography,
  useMediaQuery,
  Grid,
  useTheme,
  FormControl,
  MenuItem,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import NewCardContainer from "./NewCardContainer";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

import YAxisLine from "./YAxisLine";
import xAxisLight from "../../app/assets/image/time-compare-light.svg";
import xAxisDark from "../../app/assets/image/time-compare-dark.svg";
import {ContainedSelect} from "./ContainedSelect";
import {TodayCharts} from "../api/dashboard";
import {useLocation} from "react-router-dom";

export const CustomTooltip = ({active, payload}) => {
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
    title: "سرعت دانلود",
    unit: "Mb/s",
  },
  {
    title: " سرعت اپلود",
    unit: "%",
  },
  {
    title: " پینگ",
    unit: "Mb/s",
  },
  {
    title: "پکت لاس",
    unit: "Ms",
  },
];
const chartColors = [
  {stroke: "#008EDD", gradientStart: "#0091E3", gradientEnd: "#008EDD"},
  {stroke: "#FFD700", gradientStart: "#FFD740", gradientEnd: "#FFD700"},
  {stroke: "#FF0000", gradientStart: "#FF4040", gradientEnd: "#FF0000"},
  {stroke: "#008000", gradientStart: "#00A000", gradientEnd: "#008000"},
];
export function GridItem({
  theme,
  rendered,
  title,
  data,
  unit,
  color,
  background,
}) {
  const {pathname} = useLocation();
  const [age, setAge] = useState("در حال حاضر");
  const handleChangeDailyPercent = (event) => {
    const selectedYear = event.target.value;
    setAge(selectedYear);

    // For the sake of debugging, directly set percentages based on options
    if (selectedYear === "در حال حاضر") setPercentage(65);
    else if (selectedYear === "1 روز قبل") setPercentage(75);
    else if (selectedYear === "1 هفته قبل") setPercentage(85);
  };
  return (
    <NewCardContainer
      sx={{
        boxShadow: pathname === "/isp-summery" && "none",
        background: background,
        display: "flex",
        paddingInline: "3%",
        paddingBottom: "2.25rem",
        paddingTop: "1.5rem",
        borderRadius: ".75rem",
        flexBasis: "100%",
      }}
    >
      <Box display="flex" position="relative" width="92%">
        <Box sx={{width: "100%"}}>
          <Box display="flex" justifyContent="space-between">
            <Typography
              color="text.main"
              variant="h1"
              component="h2"
              gutterBottom
            >
              {title}
            </Typography>
            {title === "سرعت دانلود" && pathname === "/my-isp" && (
              <FormControl sx={{width: "25%", marginLeft: "3rem"}}>
                <ContainedSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="سال"
                  onChange={handleChangeDailyPercent}
                  displayEmpty
                >
                  <MenuItem value="در حال حاضر">درحال حاضر</MenuItem>
                  <MenuItem value="هفتگی">هفتگی</MenuItem>
                  <MenuItem value="ماهانه">ماهانه</MenuItem>
                  <MenuItem value="سالانه">سالانه</MenuItem>
                </ContainedSelect>
              </FormControl>
            )}
          </Box>
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
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart width="100%" height="100%" data={data}>
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={5} stroke="grey" strokeWidth={1} />
                    <ReferenceLine y={25} stroke="grey" strokeWidth={1} />
                    <ReferenceLine y={40} stroke="grey" strokeWidth={1} />
                    <ReferenceLine y={60} stroke="grey" strokeWidth={1} />
                    <ReferenceLine y={78} stroke="grey" strokeWidth={1} />
                    <ReferenceLine y={95} stroke="grey" strokeWidth={1} />

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
                      stroke={color && color.stroke}
                      fill={`url(#gradientChart${color && color.stroke})`}
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
            style={{width: "100%"}}
          />
        </Box>
        <YAxisLine
          // max={Math.max(...data.map((line) => line.value))}
          unit={unit}
        />
      </Box>
    </NewCardContainer>
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
  const [rendered, setRendered] = useState(false);
  const [currentChartData, setCurrentChartData] = useState(generateRandomData);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  useEffect(() => {
    TodayCharts()
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log("خطا در بارگذاری اطلاعات", error);
      });
  }, []);
  useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <>
      <NewCardContainer
        sx={{
          maxHeight: "880px",
          overflowY: "scroll",
          marginTop: "1rem",
          flexBasis: isMdScreen ? "100%" : "50%",
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
              color={chartColors[index]}
              data={currentChartData}
            />
          ))}
        </Grid>{" "}
      </NewCardContainer>
    </>
  );
};

export default Charts;