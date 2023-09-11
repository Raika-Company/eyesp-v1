import styled from "@emotion/styled";
import { Box, InputLabel, Switch, alpha } from "@mui/material";
import { pink } from "@mui/material/colors";
import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomBox = styled(Box)(({ theme }) => ({
  width: "70vw", // Default width for lg screens
  height: "20em",
  border: "2px solid #E0E0E0",
  borderRadius: "2em",
  margin: " 0 auto",
  display: "flex",
  flexDirection: "column",
  padding: "1em 2em",

  [theme.breakpoints.down("md")]: {
    width: "90vw", // Width for md screens
  },
  [theme.breakpoints.down("sm")]: {
    height: "29vh",
    width: "90vw", // Width for xs screens
  },
}));

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: pink[600],
    "&:hover": {
      backgroundColor: alpha(pink[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: pink[600],
  },
}));

const data = [
  { name: "January", دانلود: 100, آپلود: 150 },
  { name: "February", دانلود: 200, آپلود: 230 },
  { name: "March", دانلود: 250, آپلود: 210 },
  { name: "April", دانلود: 230, آپلود: 220 },
  { name: "May", دانلود: 300, آپلود: 290 },
  { name: "June", دانلود: 320, آپلود: 300 },
  { name: "July", دانلود: 250, آپلود: 240 },
];

const label = { inputProps: { "aria-label": "Color switch demo" } };

function DlandUlCharts() {
  const [isUploadVisible, setIsUploadVisible] = useState(false);

  const handleSwitchChange = () => {
    setIsUploadVisible((prevValue) => !prevValue);
  };
  return (
    <CustomBox>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          zIndex: "3",
        }}
      >
        <InputLabel sx={{ marginTop: "5px" }}>آپلود</InputLabel>
        <PinkSwitch {...label} defaultChecked onChange={handleSwitchChange} />
        <InputLabel sx={{ marginTop: "5px", paddingLeft: "30px" }}>
          دانلود
        </InputLabel>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "90%",
          justifyContent: "flex-start",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="دانلود" stroke="#8884d8" />
            {!isUploadVisible && (
              <Line type="monotone" dataKey="آپلود" stroke="#82ca9d" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </CustomBox>
  );
}

export default React.memo(DlandUlCharts);
