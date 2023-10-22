import {
  Box,
  Typography,
  useMediaQuery,
  Grid,
  useTheme,
  FormControl,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import NewCardContainer from "./NewCardContainer";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";

import YAxisLine from "./YAxisLine";
import xAxisLight from "../../app/assets/image/time-compare-light.svg";
import xAxisDark from "../../app/assets/image/time-compare-dark.svg";
import { ContainedSelect } from "./ContainedSelect";
import { useLocation } from "react-router-dom";
import services from "../../app/api/index";

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

const chartColors = [
  { stroke: "#008EDD", gradientStart: "#0091E3", gradientEnd: "#008EDD" },
  { stroke: "#FFD700", gradientStart: "#FFD740", gradientEnd: "#FFD700" },
  { stroke: "#FF0000", gradientStart: "#FF4040", gradientEnd: "#FF0000" },
  { stroke: "#008000", gradientStart: "#00A000", gradientEnd: "#008000" },
];
export function GridItem({
  theme,
  rendered,
  title,
  data,
  unit,
  color,
  background,
  selectValue,
  handleChangeDailyPercent,
}) {
  const { pathname } = useLocation();
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <NewCardContainer
      sx={{
        boxShadow: pathname === "/isp-summary" && "none",
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
        <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", height: isSmScreen ? "12.9%" : "11%" }}>
            <Typography
              color="text.main"
              variant="h1"
              component="h2"
              gutterBottom
              ml="1rem"
            >
              {title}
            </Typography>
            {title === "سرعت دانلود" && pathname === "/my-isp" && (
              <FormControl
                sx={{ width: "25%", marginLeft: "3rem", height: "60px" }}
              >
                <ContainedSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectValue}
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
            width="100%"
            height="250px"
          >
            {rendered && (
              <Box>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart width="100%" height="100%" data={data}>
                    <Tooltip />
                    <CartesianGrid
                      vertical={false}
                      stroke={
                        theme.palette.mode === "dark" ? "#2e2e2e" : "#E9E9E9"
                      }
                    />
                    <defs>
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
            style={{ width: "100%" }}
          />
        </Box>
        <YAxisLine
          max={Math.max(...data?.map((line) => line.value))}
          unit={unit}
        />
      </Box>
    </NewCardContainer>
  );
}

const Charts = () => {
  const theme = useTheme();
  const [rendered, setRendered] = useState(false);
  const [selectValue, setSelectValue] = useState("در حال حاضر"); // Change 'age' to a more appropriate name: 'selectValue'

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [chartData, setChartData] = useState([]);

  const handleChangeDailyPercent = (event) => {
    const selectedValue = event.target.value;
    setSelectValue(selectedValue);
  };
  const fetchChartData = (type) => {
    let requestEndpoint;

    switch (type) {
      case "در حال حاضر":
        requestEndpoint = services.dashboard.TodayCharts;
        break;
      case "هفتگی":
        requestEndpoint = services.dashboard.WeekCharts;
        break;
      case "ماهانه":
        requestEndpoint = services.dashboard.MonthCharts;
        break;
      case "سالانه":
        requestEndpoint = services.dashboard.YearCharts;
        break;
      default:
        requestEndpoint = services.dashboard.TodayCharts;
    }
    requestEndpoint()
      .then((response) => {
        const receivedData = response.data.data.data;
        const mappedData = [
          { title: "سرعت دانلود", data: receivedData.download },
          { title: "سرعت اپلود", data: receivedData.upload },
          { title: "پینگ", data: receivedData.ping },
          { title: "پکت لاس", data: receivedData.packet_loss },
        ];
        setChartData(mappedData);
      })
      .catch((error) => {
        console.log("خطا در بارگذاری اطلاعات", error);
      });
  };

  useEffect(() => {
    fetchChartData(selectValue);
  }, [selectValue]);

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
          {chartData?.map((item, index) => (
            <GridItem
              key={index}
              // handleChange={handleChangeData}
              theme={theme}
              rendered={rendered}
              title={item.title}
              unit={item.unit}
              color={chartColors[index]}
              data={item.data}
              handleChangeDailyPercent={handleChangeDailyPercent}
              selectValue={selectValue}
            />
          ))}
        </Grid>
      </NewCardContainer>
    </>
  );
};

export default Charts;
