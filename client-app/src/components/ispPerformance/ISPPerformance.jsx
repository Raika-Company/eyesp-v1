import { Box, Typography } from "@mui/material";
import ArrowBack from "../../app/common/ArrowBack";
import ProvinceNavbar from "../ispPerformance/ProvinceNavbar";
import { useState } from "react";
import axios from "axios";
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

const fetchData = async () => {
  const response = await axios.get("./data/DetailTest.json");
  return response.data;
};

const metrics = ["Performance", "Ping", "Speed", "Packet Loss"];

const ISPs = ["ایرانسل", "همراه اول", "رایتل", "شاتل", "مخابرات"];

const ISPPerformance = () => {
  const [selectedProvince, setSelectedProvince] = useState("تهران");
  const [selectedISPs, setSelectedISPs] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState("Performance");

  const chartData = prepareDataForChart(
    data,
    selectedProvince,
    selectedISPs,
    selectedMetric
  );

  return (
    <Box display="flex">
      <ProvinceNavbar
        selectedProvince={selectedProvince}
        onSelectProvince={setSelectedProvince}
      />
      <Box width="100%" padding="2.5vw">
        <Box display="flex" justifyContent="space-between">
          <Typography>میانگین عملکرد ISPهای استان فارس</Typography>
          <ArrowBack />
        </Box>
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Box>
            {metrics.map((metric) => (
              <Box key={index} display="flex" justifyContent="space-around">
                <Typography gutterBottom>{province}</Typography>
                <Switch
                  checked={selectedProvince === province}
                  onChange={() => onSelectProvince(province)}
                />
              </Box>
            ))}
          </Box>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box
          marginY={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          gap={2}
        ></Box>
      </Box>
    </Box>
  );
};

export default ISPPerformance;
