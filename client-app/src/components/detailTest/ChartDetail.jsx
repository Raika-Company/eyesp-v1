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
import { useParams } from "react-router-dom";

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
import axios from "axios";
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
    فارس: 52,
    تهران: 59,
    اصفهان: 60,
    مشهد: 20,
    اهواز: 30,
    تبریز: 40,
    مازندران: 50,
    سمنان: 20,
    خوزستان: 60,
    گیلان: 50,
  },
  {
    name: dates[1],
    ایرانسل: 55,
    مخابرات: 20,
    شاتل: 50,
    رایتل: 30,
    همراه_اول: 20,
    فارس: 52,
    تهران: 59,
    اصفهان: 60,
    مشهد: 20,
    اهواز: 20,
    تبریز: 30,
    مازندران: 40,
    سمنان: 20,
    خوزستان: 40,
    گیلان: 30,
  },
  {
    name: dates[2],
    ایرانسل: 60,
    مخابرات: 20,
    شاتل: 60,
    رایتل: 30,
    همراه_اول: 40,
    فارس: 52,
    تهران: 50,
    اصفهان: 20,
    مشهد: 40,
    اهواز: 20,
    تبریز: 30,
    مازندران: 20,
    سمنان: 60,
    خوزستان: 60,
    گیلان: 50,
  },
  {
    name: dates[3],
    ایرانسل: 20,
    مخابرات: 40,
    شاتل: 60,
    رایتل: 20,
    همراه_اول: 20,
    فارس: 52,
    تهران: 39,
    اصفهان: 20,
    مشهد: 60,
    اهواز: 50,
    تبریز: 60,
    مازندران: 20,
    سمنان: 40,
    خوزستان: 30,
    گیلان: 20,
  },
  {
    name: dates[4],
    ایرانسل: 60,
    مخابرات: 60,
    شاتل: 40,
    رایتل: 50,
    همراه_اول: 30,
    فارس: 52,
    تهران: 60,
    اصفهان: 40,
    مشهد: 30,
    اهواز: 20,
    تبریز: 60,
    مازندران: 40,
    سمنان: 30,
    خوزستان: 50,
    گیلان: 60,
  },
  {
    name: dates[5],
    ایرانسل: 60,
    مخابرات: 50,
    شاتل: 20,
    رایتل: 50,
    همراه_اول: 60,
    فارس: 52,
    تهران: 29,
    اصفهان: 40,
    مشهد: 20,
    اهواز: 50,
    تبریز: 20,
    مازندران: 50,
    سمنان: 20,
    خوزستان: 60,
    گیلان: 50,
  },
  {
    name: dates[6],
    ایرانسل: 20,
    مخابرات: 60,
    شاتل: 30,
    رایتل: 20,
    همراه_اول: 50,
    فارس: 52,
    تهران: 59,
    اصفهان: 60,
    مشهد: 60,
    اهواز: 50,
    تبریز: 20,
    مازندران: 40,
    سمنان: 20,
    خوزستان: 60,
    گیلان: 50,
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
    فارس: 22,
    تهران: 29,
    اصفهان: 10,
    مشهد: 20,
    اهواز: 30,
    تبریز: 10,
    مازندران: 30,
    سمنان: 20,
    خوزستان: 10,
    گیلان: 20,
  },
  {
    name: dates[1],
    ایرانسل: 11,
    مخابرات: 10,
    شاتل: 14,
    رایتل: 13,
    همراه_اول: 11,
    فارس: 32,
    تهران: 19,
    اصفهان: 30,
    مشهد: 30,
    اهواز: 10,
    تبریز: 30,
    مازندران: 20,
    سمنان: 10,
    خوزستان: 20,
    گیلان: 30,
  },
  {
    name: dates[2],
    ایرانسل: 12,
    مخابرات: 18,
    شاتل: 11,
    رایتل: 18,
    همراه_اول: 15,
    فارس: 22,
    تهران: 39,
    اصفهان: 30,
    مشهد: 20,
    اهواز: 30,
    تبریز: 10,
    مازندران: 30,
    سمنان: 20,
    خوزستان: 10,
    گیلان: 20,
  },
  {
    name: dates[3],
    ایرانسل: 15,
    مخابرات: 15,
    شاتل: 16,
    رایتل: 14,
    همراه_اول: 12,
    فارس: 22,
    تهران: 39,
    اصفهان: 30,
    مشهد: 10,
    اهواز: 10,
    تبریز: 30,
    مازندران: 20,
    سمنان: 10,
    خوزستان: 30,
    گیلان: 10,
  },
  {
    name: dates[4],
    ایرانسل: 23,
    مخابرات: 26,
    شاتل: 18,
    رایتل: 24,
    همراه_اول: 27,
    فارس: 22,
    تهران: 39,
    اصفهان: 30,
    مشهد: 10,
    اهواز: 10,
    تبریز: 30,
    مازندران: 20,
    سمنان: 10,
    خوزستان: 30,
    گیلان: 20,
  },
  {
    name: dates[5],
    ایرانسل: 26,
    مخابرات: 14,
    شاتل: 14,
    رایتل: 25,
    همراه_اول: 24,
    فارس: 12,
    تهران: 39,
    اصفهان: 30,
    مشهد: 10,
    اهواز: 20,
    تبریز: 20,
    مازندران: 10,
    سمنان: 15,
    خوزستان: 30,
    گیلان: 25,
  },
  {
    name: dates[6],
    ایرانسل: 24,
    مخابرات: 11,
    شاتل: 16,
    رایتل: 22,
    همراه_اول: 30,
    فارس: 22,
    تهران: 29,
    اصفهان: 10,
    مشهد: 20,
    اهواز: 30,
    تبریز: 10,
    مازندران: 30,
    سمنان: 20,
    خوزستان: 10,
    گیلان: 20,
  },
];

const AveragePerformance = [
  {
    name: dates[0],
    ایرانسل: 70,
    مخابرات: 80,
    شاتل: 90,
    رایتل: 72,
    همراه_اول: 83,
    فارس: 22,
    تهران: 29,
    اصفهان: 90,
    مشهد: 70,
    اهواز: 40,
    تبریز: 60,
    مازندران: 20,
    سمنان: 70,
    خوزستان: 50,
    گیلان: 40,
  },
  {
    name: dates[1],
    ایرانسل: 89,
    مخابرات: 78,
    شاتل: 80,
    رایتل: 90,
    همراه_اول: 74,
    فارس: 32,
    تهران: 59,
    اصفهان: 30,
    مشهد: 40,
    اهواز: 60,
    تبریز: 70,
    مازندران: 80,
    سمنان: 90,
    خوزستان: 20,
    گیلان: 40,
  },
  {
    name: dates[2],
    ایرانسل: 93,
    مخابرات: 86,
    شاتل: 79,
    رایتل: 80,
    همراه_اول: 91,
    فارس: 22,
    تهران: 49,
    اصفهان: 30,
    مشهد: 80,
    اهواز: 90,
    تبریز: 100,
    مازندران: 30,
    سمنان: 50,
    خوزستان: 40,
    گیلان: 20,
  },
  {
    name: dates[3],
    ایرانسل: 87,
    مخابرات: 71,
    شاتل: 91,
    رایتل: 74,
    همراه_اول: 84,
    فارس: 22,
    تهران: 29,
    اصفهان: 90,
    مشهد: 70,
    اهواز: 40,
    تبریز: 60,
    مازندران: 20,
    سمنان: 70,
    خوزستان: 50,
    گیلان: 40,
  },
  {
    name: dates[4],
    ایرانسل: 89,
    مخابرات: 78,
    شاتل: 89,
    رایتل: 90,
    همراه_اول: 100,
    فارس: 72,
    تهران: 69,
    اصفهان: 40,
    مشهد: 30,
    اهواز: 20,
    تبریز: 40,
    مازندران: 60,
    سمنان: 80,
    خوزستان: 90,
    گیلان: 30,
  },
  {
    name: dates[5],
    ایرانسل: 100,
    مخابرات: 99,
    شاتل: 78,
    رایتل: 89,
    همراه_اول: 90,
    فارس: 22,
    تهران: 79,
    اصفهان: 80,
    مشهد: 90,
    اهواز: 50,
    تبریز: 30,
    مازندران: 20,
    سمنان: 50,
    خوزستان: 70,
    گیلان: 20,
  },
  {
    name: dates[6],
    ایرانسل: 28,
    مخابرات: 89,
    شاتل: 100,
    رایتل: 80,
    همراه_اول: 76,
    فارس: 22,
    تهران: 29,
    اصفهان: 90,
    مشهد: 70,
    اهواز: 40,
    تبریز: 60,
    مازندران: 20,
    سمنان: 70,
    خوزستان: 50,
    گیلان: 40,
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
    فارس: 2,
    تهران: 9,
    اصفهان: 8,
    مشهد: 7,
    اهواز: 4,
    تبریز: 6,
    مازندران: 2,
    سمنان: 7,
    خوزستان: 5,
    گیلان: 4,
  },
  {
    name: dates[1],
    ایرانسل: 1,
    مخابرات: 10,
    شاتل: 4,
    رایتل: 3,
    همراه_اول: 1,
    فارس: 3,
    تهران: 7,
    اصفهان: 1,
    مشهد: 3,
    اهواز: 2,
    تبریز: 9,
    مازندران: 10,
    سمنان: 7,
    خوزستان: 3,
    گیلان: 2,
  },
  {
    name: dates[2],
    ایرانسل: 2,
    مخابرات: 8,
    شاتل: 1,
    رایتل: 8,
    همراه_اول: 5,
    فارس: 10,
    تهران: 5,
    اصفهان: 2,
    مشهد: 8,
    اهواز: 4,
    تبریز: 3,
    مازندران: 8,
    سمنان: 1,
    خوزستان: 3,
    گیلان: 2,
  },
  {
    name: dates[3],
    ایرانسل: 5,
    مخابرات: 5,
    شاتل: 6,
    رایتل: 4,
    همراه_اول: 2,
    فارس: 3,
    تهران: 6,
    اصفهان: 8,
    مشهد: 9,
    اهواز: 10,
    تبریز: 2,
    مازندران: 4,
    سمنان: 1,
    خوزستان: 6,
    گیلان: 8,
  },
  {
    name: dates[4],
    ایرانسل: 3,
    مخابرات: 6,
    شاتل: 8,
    رایتل: 4,
    همراه_اول: 7,
    فارس: 2,
    تهران: 9,
    اصفهان: 8,
    مشهد: 7,
    اهواز: 4,
    تبریز: 6,
    مازندران: 2,
    سمنان: 7,
    خوزستان: 5,
    گیلان: 4,
  },
  {
    name: dates[5],
    ایرانسل: 6,
    مخابرات: 4,
    شاتل: 4,
    رایتل: 5,
    همراه_اول: 4,
    فارس: 1,
    تهران: 7,
    اصفهان: 4,
    مشهد: 2,
    اهواز: 4,
    تبریز: 7,
    مازندران: 7,
    سمنان: 10,
    خوزستان: 5,
    گیلان: 4,
  },
  {
    name: dates[6],
    ایرانسل: 4,
    مخابرات: 11,
    شاتل: 6,
    رایتل: 2,
    همراه_اول: 1,
    فارس: 7,
    تهران: 8,
    اصفهان: 4,
    مشهد: 3,
    اهواز: 2,
    تبریز: 1,
    مازندران: 9,
    سمنان: 2,
    خوزستان: 4,
    گیلان: 3,
  }, //...
];

const ChartDetail = ({ visibility, cityVisibility }) => {
  const { id } = useParams();
  const [chartData, setChartData] = useState([]); // default data (current dataset you've provided)
  const activeCityCount = Object.values(cityVisibility).filter(Boolean).length;
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [speedAverage, setSpeedAverage] = useState(false);
  const [activeSwitch, setActiveSwitch] = useState("pingAverage");
  const [selectedDate, setSelectedDate] = useState("شنبه");

  const getData = () => {
    axios
      .get("../../../public/data/DetailTest.json")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setActiveSwitch(id);
  }, [id]);

  useEffect(() => {
    getData();
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

  function MobileToggleSwitch() {
    const containerStyle = {
      marginRight: "1rem",
      width: "80%",
      height: "100%",
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "end",
    };

    const boxStyle = {
      width: "53%",
      display: "flex",
      flexDirection: "column",
      whiteSpace: "nowrap",
    };

    const switchBoxStyle = {
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
      justifyContent: "space-between",
    };

    const typographyStyle = {
      color: "textColor.light",
    };

    const ToggleSwitchBox = ({
      label,
      checkedValue,
      onChangeFunction,
      chartData,
    }) => (
      <Box sx={switchBoxStyle}>
        <Typography variant="subtitle1" sx={typographyStyle}>
          {label}
        </Typography>
        <Switch
          checked={activeSwitch === checkedValue}
          onChange={onChangeFunction}
          onClick={() => setActiveSwitch(checkedValue)}
          // {label}
        />
      </Box>
    );

    return (
      <Box sx={containerStyle}>
        <Box sx={boxStyle}>
          <ToggleSwitchBox
            label="میانگین عملکرد"
            checkedValue="performanceAverage"
            onChangeFunction={(e) => setChartData(AveragePerformance)}
            chartData={AveragePerformance}
          />
          <ToggleSwitchBox
            label="میانگین پینگ"
            checkedValue="pingAverage"
            onChangeFunction={(e) => setChartData(pingData)}
            chartData={pingData}
            defaultChecked
          />
        </Box>
        <Box sx={boxStyle}>
          <ToggleSwitchBox
            label="میانگین سرعت"
            checkedValue="speedAverage"
            onChangeFunction={(e) => {
              setSpeedAverage(e.target.checked);
              setChartData(speedData);
            }}
            chartData={speedData}
          />
          <ToggleSwitchBox
            label="میانگین پکت پلاس"
            checkedValue="packetLossAverage"
            onChangeFunction={(e) => setChartData(packetLossData)}
            chartData={packetLossData}
          />
        </Box>
      </Box>
    );
  }

  const daysOfWeek = [
    "شنبه",
    "یکشنبه",
    "دوشنبه",
    "سه‌شنبه",
    "چهارشنبه",
    "پنج‌شنبه",
    "جمعه",
  ];

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
          flexWrap: isMdScreen ? "wrap" : isSmScreen ? "wrap" : "none",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle2" color="textColor.main">
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
          <Typography variant="subtitle2" color="textColor.main">
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
          <Typography variant="subtitle2" color="textColor.main">
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
          <Typography variant="subtitle2" color="textColor.main">
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

  const getYAxisDomain = (activeSwitch) => {
    switch (activeSwitch) {
      case "speedAverage":
        return [10, 30];
      case "pingAverage":
        return [20, 60];
      case "performanceAverage":
        return [20, 32];
      case "packetLossAverage":
        return [0, 11];
      default:
        return [0, 11];
    }
  };

  const getYAxisTickFormatter = (activeSwitch) => (value) => {
    if (activeSwitch === "speedAverage") return `${value}Mb`;
    if (["performanceAverage", "packetLossAverage"].includes(activeSwitch))
      return `${value}%`;
    return `${value}ms`;
  };

  const renderLine = (dataKey, stroke, condition = true) => {
    if (condition) {
      return (
        <Line
          key={dataKey}
          type="monotone"
          dataKey={dataKey}
          stroke={stroke}
          activeDot={{ r: 8 }}
        />
      );
    }
    return null;
  };

  const cityColorMapping = {
    فارس: "#FF5733",
    تهران: "#5D4295",
    اصفهان: "#3357FF",
    مشهد: "#FF33F4",
    اهواز: "#57FF33",
    تبریز: "#B89F88",
    مازندران: "#AAD9DC",
    سمنان: "#FF9533",
    خوزستان: "#FFBF1B",
    گیلان: "#9A1BFF",
  };

  return (
    <>
      <Card
        sx={{
          width: "93%",
          height: "50%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          border: "2px solid #E0E0E0",
          borderRadius: "2em",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            width: "102%",
            height: "20%",
            marginTop: "1rem",
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "center",
          }}
        >
          {isSmScreen ? <MobileToggleSwitch /> : <DesktopToggleSwitch />}

          {/* {isSmScreen && <ChoseCityDrawer />} */}
        </Box>
        <Box
          sx={{
            width: "78%",
            height: "10%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
          <Box sx={{ marginTop: "5px" }}>
            <Typography
              sx={{
                color: "info.main",
              }}
              variant="h2"
            >
              98%
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: "97%",
            height: "56%",
            alignItems: "center",
            marginRight: "3rem",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              fd <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tick={{ fontSize: isSmScreen ? "10px" : "16px" }}
              />
              <YAxis
                domain={getYAxisDomain(activeSwitch)}
                tickFormatter={getYAxisTickFormatter(activeSwitch)}
                tick={{ fontSize: isSmScreen ? "10px" : "16px" }}
              />
              <Tooltip />
              <Legend
                wrapperStyle={{
                  fontSize: isSmScreen ? "12px" : "20px",
                  marginLeft: "2rem",
                }}
              />
              {renderLine(
                "مخابرات",
                "#126AED",
                activeCityCount < 1 || visibility.مخابرات
              )}
              {renderLine(
                "ایرانسل",
                "#82ca9d",
                activeCityCount < 1 || visibility.ایرانسل
              )}
              {renderLine(
                "شاتل",
                "pink",
                activeCityCount < 1 || visibility.شاتل
              )}
              {renderLine(
                "رایتل",
                "purple",
                activeCityCount < 1 || visibility.رایتل
              )}
              {renderLine(
                "همراه_اول",
                "orange",
                activeCityCount < 1 || visibility.همراه_اول
              )}
              {Object.entries(cityColorMapping).map(([city, color]) =>
                renderLine(city, color, cityVisibility[city])
              )}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Card>
    </>
  );
};

export default ChartDetail;
