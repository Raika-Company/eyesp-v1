import React from "react";
import {
  Box,
  Typography,
  Switch,
  useMediaQuery,
  Select,
  MenuItem,
} from "@mui/material";
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
import ChoseCityDrawer from "../../app/common/ChoseCityDrawer";
const label = { inputProps: { "aria-label": "Color switch demo" } };

const data = [
  {
    name: "تاریخ A",
    ایرانسل: 4000,
    مخابرات: 2400,
    شاتل: 5900,
    رایتل: 7700,
    همراه_اول: 1900,
  },
  {
    name: "تاریخ B",
    ایرانسل: 3000,
    مخابرات: 1398,
    شاتل: 7000,
    رایتل: 8500,
    همراه_اول: 9000,
  },
  {
    name: "تاریخ C",
    ایرانسل: 2500,
    مخابرات: 9800,
    شاتل: 4900,
    رایتل: 4200,
    همراه_اول: 6500,
  },
  {
    name: "تاریخ D",
    ایرانسل: 1780,
    مخابرات: 4908,
    شاتل: 6800,
    رایتل: 7800,
    همراه_اول: 4600,
  },
  {
    name: "تاریخ E",
    ایرانسل: 7890,
    مخابرات: 4800,
    شاتل: 9700,
    رایتل: 4900,
    همراه_اول: 3200,
  },
  {
    name: "تاریخ F",
    ایرانسل: 3390,
    مخابرات: 6800,
    شاتل: 4600,
    رایتل: 1800,
    همراه_اول: 5400,
  },
  {
    name: "تاریخ G",
    ایرانسل: 3490,
    مخابرات: 4300,
    شاتل: 2400,
    رایتل: 2100,
    همراه_اول: 2000,
  },
];
const ChartDetail = ({ visibility }) => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
            <Switch {...label} />
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
            <Switch {...label} />{" "}
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
            <Switch {...label} />
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
            <Switch {...label} />
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
          <Switch {...label} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography variant="h7">میانگین پینگ</Typography>
          <Switch {...label} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography variant="h7">میانگین سرعت</Typography>
          <Switch {...label} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography variant="h7">میانگین پکت لاس</Typography>
          <Switch {...label} />
        </Box>
      </Box>
    );
  }
  return (
    <>
      <Box
        sx={{
          width: "93%",
          height: "45%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          border: "2px solid #E0E0E0",
          borderRadius: "2em",
          backgroundColor: "#E8E8E8",
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
              value="test"
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
              <MenuItem value="test">سالیانه</MenuItem>
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
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `${value / 1000}K`} />
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
      </Box>
    </>
  );
};

export default ChartDetail;
