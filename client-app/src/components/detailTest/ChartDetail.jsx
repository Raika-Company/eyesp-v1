import {
  Box,
  Typography,
  Switch,
  useMediaQuery,
  Select,
  MenuItem,
  Menu,
  Card,
} from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./detail.css";
import jMoment from "moment-jalaali";
const label = { inputProps: { "aria-label": "Color switch demo" } };
const startDay = jMoment().subtract(6, "days");
const dates = Array.from({ length: 7 }).map((_, index) =>
  startDay.add(index === 0 ? 0 : 1, "days").format("jYYYY/jMM/jDD")
);

const pingData = [
  {
    name: dates[0],
    ایرانسل: 50,
    مخابرات: 60,
    شاتل: 60,
    رایتل: 20,
    همراه_اول: 50,
  },
  {
    name: dates[1],
    ایرانسل: 55,
    مخابرات: 20,
    شاتل: 50,
    رایتل: 30,
    همراه_اول: 20,
  },
  {
    name: dates[2],
    ایرانسل: 60,
    مخابرات: 20,
    شاتل: 60,
    رایتل: 30,
    همراه_اول: 40,
  },
  {
    name: dates[3],
    ایرانسل: 20,
    مخابرات: 40,
    شاتل: 60,
    رایتل: 20,
    همراه_اول: 20,
  },
  {
    name: dates[4],
    ایرانسل: 60,
    مخابرات: 60,
    شاتل: 40,
    رایتل: 50,
    همراه_اول: 30,
  },
  {
    name: dates[5],
    ایرانسل: 60,
    مخابرات: 50,
    شاتل: 20,
    رایتل: 50,
    همراه_اول: 60,
  },
  {
    name: dates[6],
    ایرانسل: 20,
    مخابرات: 60,
    شاتل: 30,
    رایتل: 20,
    همراه_اول: 50,
  },
];

const speedData = [
  {
    name: dates[0],
    ایرانسل: 10,
    مخابرات: 13,
    شاتل: 12,
    رایتل: 17,
    همراه_اول: 15,
  },
  {
    name: dates[1],
    ایرانسل: 11,
    مخابرات: 10,
    شاتل: 14,
    رایتل: 13,
    همراه_اول: 11,
  },
  {
    name: dates[2],
    ایرانسل: 12,
    مخابرات: 18,
    شاتل: 11,
    رایتل: 18,
    همراه_اول: 15,
  },
  {
    name: dates[3],
    ایرانسل: 15,
    مخابرات: 15,
    شاتل: 16,
    رایتل: 14,
    همراه_اول: 12,
  },
  {
    name: dates[4],
    ایرانسل: 23,
    مخابرات: 26,
    شاتل: 18,
    رایتل: 24,
    همراه_اول: 27,
  },
  {
    name: dates[5],
    ایرانسل: 26,
    مخابرات: 14,
    شاتل: 14,
    رایتل: 25,
    همراه_اول: 24,
  },
  {
    name: dates[6],
    ایرانسل: 24,
    مخابرات: 11,
    شاتل: 16,
    رایتل: 22,
    همراه_اول: 30,
  }, //...
];

const AveragePerformance = [
  {
    name: dates[0],
    ایرانسل: 70,
    مخابرات: 80,
    شاتل: 90,
    رایتل: 72,
    همراه_اول: 83,
  },
  {
    name: dates[1],
    ایرانسل: 89,
    مخابرات: 78,
    شاتل: 80,
    رایتل: 90,
    همراه_اول: 74,
  },
  {
    name: dates[2],
    ایرانسل: 93,
    مخابرات: 86,
    شاتل: 79,
    رایتل: 80,
    همراه_اول: 91,
  },
  {
    name: dates[3],
    ایرانسل: 87,
    مخابرات: 71,
    شاتل: 91,
    رایتل: 74,
    همراه_اول: 84,
  },
  {
    name: dates[4],
    ایرانسل: 89,
    مخابرات: 78,
    شاتل: 89,
    رایتل: 90,
    همراه_اول: 100,
  },
  {
    name: dates[5],
    ایرانسل: 100,
    مخابرات: 99,
    شاتل: 78,
    رایتل: 89,
    همراه_اول: 90,
  },
  {
    name: dates[6],
    ایرانسل: 78,
    مخابرات: 89,
    شاتل: 100,
    رایتل: 80,
    همراه_اول: 76,
  }, //...
];
const packetLossData = [
  {
    name: dates[0],
    ایرانسل: 1,
    مخابرات: 3,
    شاتل: 2,
    رایتل: 11,
    همراه_اول: 5,
  },
  {
    name: dates[1],
    ایرانسل: 1,
    مخابرات: 10,
    شاتل: 4,
    رایتل: 3,
    همراه_اول: 1,
  },
  {
    name: dates[2],
    ایرانسل: 2,
    مخابرات: 8,
    شاتل: 1,
    رایتل: 8,
    همراه_اول: 5,
  },
  {
    name: dates[3],
    ایرانسل: 5,
    مخابرات: 5,
    شاتل: 6,
    رایتل: 4,
    همراه_اول: 2,
  },
  {
    name: dates[4],
    ایرانسل: 3,
    مخابرات: 6,
    شاتل: 8,
    رایتل: 4,
    همراه_اول: 7,
  },
  {
    name: dates[5],
    ایرانسل: 6,
    مخابرات: 4,
    شاتل: 4,
    رایتل: 5,
    همراه_اول: 4,
  },
  {
    name: dates[6],
    ایرانسل: 4,
    مخابرات: 11,
    شاتل: 6,
    رایتل: 2,
    همراه_اول: 1,
  }, //...
];
const ChartDetail = ({ visibility, cityVisibility }) => {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]); // default data (current dataset you've provided)

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [speedAverage, setSpeedAverage] = useState(false);
  const [activeSwitch, setActiveSwitch] = useState("pingAverage");
  const [selectedDate, setSelectedDate] = useState("شنبه");

  useEffect(() => {
    setActiveSwitch(id);
  }, [id]);

  useEffect(() => {
    switch (activeSwitch) {
      case "pingAverage":
        setChartData(pingData);
        break;
      case "speedAverage":
        setChartData(speedData);
        break;
      case "performanceAverage":
        setChartData(AveragePerformance);
        break;
      case "packetLossAverage":
        setChartData(packetLossData);
        break;
      default:
        break;
    }
  }, [activeSwitch]);

  const daysOfWeek = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];
  function MobileToggleSwitch() {
    return (
      <Box
        sx={{
          marginRight: "1rem",
          width: "80%",
          height: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: isSmScreen ? "9px" : isMdScreen ? "13px" : "",
              }}
            >
              میانگین عملکرد
            </Typography>
            <Switch
              checked={activeSwitch === "performanceAverage"}
              onChange={(e) => {
                setChartData(AveragePerformance); // change data to ping data
              }}
              onClick={() => setActiveSwitch("performanceAverage")}
              {...label}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: isSmScreen ? "9px" : isMdScreen ? "13px" : "",
              }}
            >
              میانگین پینگ
            </Typography>
            <Switch
              checked={activeSwitch === "pingAverage"}
              onChange={(e) => {
                setChartData(pingData); // change data to ping data
              }}
              onClick={() => setActiveSwitch("pingAverage")}
              {...label}
              defaultChecked
            />
          </Box>
        </Box>
        <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: isSmScreen ? "9px" : isMdScreen ? "13px" : "",
              }}
            >
              میانگین سرعت
            </Typography>
            <Switch
              checked={activeSwitch === "speedAverage"}
              onChange={(e) => {
                setSpeedAverage(e.target.checked);
                setChartData(speedData); // change data to speed data
              }}
              onClick={() => setActiveSwitch("speedAverage")}
              {...label}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: isSmScreen ? "9px" : isMdScreen ? "13px" : "",
              }}
            >
              میانگین پکت پلاس
            </Typography>
            <Switch
              checked={activeSwitch === "packetLossAverage"}
              onChange={(e) => {
                setChartData(packetLossData); // change data to ping data
              }}
              onClick={() => setActiveSwitch("packetLossAverage")}
              {...label}
            />
          </Box>
        </Box>
      </Box>
    );
  }
  function DesktopToggleSwitch() {
    return (
      <Box
        sx={{
          marginRight: isMdScreen ? "11rem" : isXsScreen ? "1rem" : "5rem",
          width: "80%",
          height: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "end",
          gap: isMdScreen ? "1px" : isXsScreen ? "1px" : "60px",
          flexWrap: isMdScreen ? "wrap" : isXsScreen ? "none" : "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography variant="h7">میانگین عملکرد</Typography>
          <Switch
            checked={activeSwitch === "performanceAverage"}
            onClick={() => setActiveSwitch("performanceAverage")}
            {...label}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography variant="h7">میانگین پینگ</Typography>
          <Switch
            checked={activeSwitch === "pingAverage"}
            onClick={() => setActiveSwitch("pingAverage")}
            {...label}
            defaultChecked
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography variant="h7">میانگین سرعت</Typography>
          <Switch
            checked={activeSwitch === "speedAverage"}
            onChange={(e) => setSpeedAverage(e.target.checked)}
            onClick={() => setActiveSwitch("speedAverage")}
            {...label}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography variant="h7">میانگین پکت لاس</Typography>
          <Switch
            checked={activeSwitch === "packetLossAverage"}
            onClick={() => setActiveSwitch("packetLossAverage")}
            {...label}
          />
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Card
        sx={{
          width: "93%",
          height: "45%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          border: "2px solid #E0E0E0",
          borderRadius: "2em",
        }}
      >
        <Box
          sx={{
            width: "102%",
            height: "10%",
            marginTop: "2rem",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "end",
          }}
        >
          {isSmScreen ? <MobileToggleSwitch /> : <DesktopToggleSwitch />}

          {/* {isSmScreen && <ChoseCityDrawer />} */}
          <Box
            sx={{
              width: "20%",
              textAlign: "center",
              paddingLeft: isSmScreen ? "8px" : "2rem",
              marginBottom: isSmScreen ? "2rem" : "",
            }}
          >
            <Select
              onChange={(e) => setSelectedDate(e.target.value)}
              value={selectedDate} // Use the state variable
              size="small"
              sx={{
                bgcolor: "#126AED",
                color: "white",
                borderRadius: "1.8rem",
                border: "none",
                fontSize: isSmScreen ? "10px" : "18px",
                py: 0,

                "& fieldset": {
                  border: "none",
                },
              }}
            >
              {daysOfWeek.map((day, index) => (
                <MenuItem key={index} value={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box
          sx={{
            width: "102%",
            height: "10%",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "end",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              marginRight: isSmScreen ? "3rem" : "5rem",
              marginTop: "2rem",
              color: "#126AED",
              fontSize: isSmScreen ? "16px" : "40px",
            }}
          >
            98%
          </Typography>
        </Box>
        <Box
          sx={{
            width: "99%",
            height: "67%",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          {" "}
          {/* <Line responsive="true" options={options} data={data} /> */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: isSmScreen ? "10px" : "16px" }}
              />

              <YAxis
                domain={
                  activeSwitch === "speedAverage"
                    ? [10, 30]
                    : activeSwitch === "pingAverage"
                    ? [20, 60]
                    : activeSwitch === "performanceAverage"
                    ? [20, 32]
                    : activeSwitch === "packetLossAverage"
                    ? [0, 11]
                    : [0, 11]
                }
                tickFormatter={(value) => {
                  if (activeSwitch === "speedAverage") return `${value}Mb`;
                  if (
                    activeSwitch === "performanceAverage" ||
                    activeSwitch === "packetLossAverage"
                  )
                    return `${value}%`;
                  return `${value}ms`;
                }}
              />

              <Tooltip />
              <Legend />
              {visibility.مخابرات && (
                <Line
                  type="monotone"
                  dataKey="مخابرات"
                  stroke="#126AED"
                  activeDot={{ r: 8 }}
                />
              )}
              {visibility.ایرانسل && (
                <Line
                  type="monotone"
                  dataKey="ایرانسل"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                />
              )}

              {/* The new lines */}
              {visibility.شاتل && (
                <Line
                  type="monotone"
                  dataKey="شاتل"
                  stroke="pink"
                  activeDot={{ r: 8 }}
                />
              )}
              {visibility.رایتل && (
                <Line
                  type="monotone"
                  dataKey="رایتل"
                  stroke="purple"
                  activeDot={{ r: 8 }}
                />
              )}

              {visibility.همراه_اول && (
                <Line
                  type="monotone"
                  dataKey="همراه_اول"
                  stroke="orange"
                  activeDot={{ r: 8 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </>
  );
};

export default ChartDetail;
