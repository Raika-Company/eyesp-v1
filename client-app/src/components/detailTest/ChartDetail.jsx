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
import { useState } from "react";

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

const data = [
  {
    name: dates[0],
    ایرانسل: 10,
    مخابرات: 30,
    شاتل: 20,
    رایتل: 70,
    رایتل: 70,
    همراه_اول: 50,
  },
  {
    name: dates[1],
    ایرانسل: 15,
    مخابرات: 100,
    شاتل: 40,
    رایتل: 30,
    همراه_اول: 10,
  },
  {
    name: dates[2],
    ایرانسل: 25,
    مخابرات: 80,
    شاتل: 10,
    رایتل: 80,
    همراه_اول: 50,
  },
  {
    name: dates[3],
    ایرانسل: 50,
    مخابرات: 50,
    شاتل: 60,
    رایتل: 40,
    همراه_اول: 20,
  },
  {
    name: dates[4],
    ایرانسل: 30,
    مخابرات: 60,
    شاتل: 80,
    رایتل: 40,
    همراه_اول: 70,
  },
  {
    name: dates[5],
    ایرانسل: 60,
    مخابرات: 40,
    شاتل: 40,
    رایتل: 50,
    همراه_اول: 40,
  },
  {
    name: dates[6],
    ایرانسل: 40,
    مخابرات: 110,
    شاتل: 60,
    رایتل: 20,
    همراه_اول: 10,
  },
];
const ChartDetail = ({ visibility }) => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [speedAverage, setSpeedAverage] = useState(false);
  const [activeSwitch, setActiveSwitch] = useState("pingAverage");
  const [selectedDate, setSelectedDate] = useState("شنبه");

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
              variant="overline"
              sx={{
                color: "textColor.dark",
              }}
            >
              میانگین عملکرد
            </Typography>
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
            <Typography
              variant="overline"
              sx={{
                color: "textColor.dark",
              }}
            >
              میانگین پینگ
            </Typography>
            <Switch
              checked={activeSwitch === "pingAverage"}
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
              variant="overline"
              sx={{
                color: "textColor.dark",
              }}
            >
              میانگین سرعت
            </Typography>
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
            <Typography
              variant="overline"
              sx={{
                color: "textColor.dark",
              }}
            >
              میانگین پکت پلاس
            </Typography>
            <Switch
              checked={activeSwitch === "packetLossAverage"}
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
          <Typography variant="h3" color="textColor.dark">
            میانگین عملکرد
          </Typography>
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
          <Typography variant="h3" color="textColor.dark">
            میانگین پینگ
          </Typography>
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
          <Typography variant="h3" color="textColor.dark">
            میانگین سرعت
          </Typography>
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
          <Typography variant="h3" color="textColor.dark">
            میانگین پکت لاس
          </Typography>
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
                bgcolor: "info.main",
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
            variant="h4"
            sx={{
              marginRight: isSmScreen ? "3rem" : "5rem",
              marginTop: "2rem",
              color: "info.main",
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
          {/* <Line responsive="true" options={options} data={data} /> */}
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={data}
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
                    ? [50, 110]
                    : activeSwitch === "performanceAverage"
                    ? [70, 100]
                    : activeSwitch === "packetLossAverage"
                    ? [0, 1]
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
