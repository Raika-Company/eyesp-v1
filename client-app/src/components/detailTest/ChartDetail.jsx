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
import { useState } from "react";

const label = { inputProps: { "aria-label": "Color switch demo" } };

const data = [
  {
    name: "تاریخ A",
    irancell: 4000,
    ping: 2400,
    amt: 2400,
  },
  {
    name: "تاریخ B",
    irancell: 3000,
    ping: 1398,
    amt: 2210,
  },
  {
    name: "تاریخ C",
    irancell: 2000,
    ping: 9800,
    amt: 2290,
  },
  {
    name: "تاریخ D",
    irancell: 2780,
    ping: 3908,
    amt: 2000,
  },
  {
    name: "تاریخ E",
    irancell: 1890,
    ping: 4800,
    amt: 2181,
  },
  {
    name: "تاریخ F",
    irancell: 2390,
    ping: 3800,
    amt: 2500,
  },
  {
    name: "تاریخ G",
    irancell: 3490,
    ping: 4300,
    amt: 2100,
  },
];
const ChartDetail = () => {
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
          height: "48%",
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
            height: "80%",
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
              <YAxis />
              <Tooltip />
              <Legend />
              {/* Conditionally render the ping line */}
              <Line
                type="monotone"
                dataKey="ping"
                stroke="#126AED"
                activeDot={{ r: 8 }}
              />
              {/* {irancellLineVisible && (
                
              )}{" "} */}
              <Line
                type="monotone"
                dataKey="irancell"
                stroke="#82ca9d"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </>
  );
};

export default ChartDetail;
