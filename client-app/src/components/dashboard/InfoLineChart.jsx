import React from "react";
import { Box, Card, Typography, Select, MenuItem } from "@mui/material";
import {
  LineChart,
  XAxis,
  Tooltip,
  Line,
  YAxis,
  ResponsiveContainer,
} from "recharts";
const InfoLineChart = ({ color }) => {
  return (
    <Card sx={{ backgroundColor: "$E8E8E8", padding: "1em" }}>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Typography fontSize="1.476rem" color="#5E5E5E" fontFamily="PeydaMedium" fontWeight="700" sx={{opacity: "0.6"}}>نمودار عملکرد ارائه دهنده های اینترنت</Typography>
        <Select
          value="test"
          size="small"
          sx={{
            bgcolor: color,
            color: "white",
            borderRadius: "1.8rem",
            border: "none",
            py: 0,

            "& fieldset": {
              border: "none",
            },
          }}
        >
          <MenuItem value="test">همه</MenuItem>
        </Select>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start" marginY="1rem">
        <Typography fontSize="4.5rem" color={color}>77%</Typography>
        <Select
          value="test"
          size="small"
          sx={{
            bgcolor: color,
            color: "white",
            borderRadius: "1.8rem",
            border: "none",
            py: 0,

            "& fieldset": {
              border: "none",
            },
          }}
        >
          <MenuItem value="test">سالیانه</MenuItem>
        </Select>
      </Box>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={[
            {
              name: "فروردین",
              uv: 15,
            },
            {
              name: "اردیبهشت",
              uv: 25,
            },
            {
              name: "خرداد",
              uv: 20,
            },
            {
              name: "تیر",
              uv: 32,
            },
            {
              name: "مرداد",
              uv: 36,
            },
            {
              name: "شهریور",
              uv: 62,
            },
            {
              name: "مهر",
              uv: 51,
            },
            {
              name: "آبان",
              uv: 63,
            },
            {
              name: "آذر",
              uv: 56,
            },
            {
              name: "دی",
              uv: 61,
            },
            {
              name: "بهمن",
              uv: 70,
            },
            {
              name: "اسفند",
              uv: 75,
            },
          ]}
        >
          <XAxis
            dataKey="name"
            interval="preserveStartEnd"
            padding={{ left: 50, right: 50 }}
            tick={{ fill: "#5E5E5E" }}
          />
          <YAxis
            domain={[0, 100]}
            tickFormatter={(tick) => `${tick}%`}
            axisLine={false}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="uv"
            stroke={color}
            strokeWidth={4}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default InfoLineChart;
