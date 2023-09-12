import styled from "@emotion/styled";
import {
  Box,
  InputLabel,
  Switch,
  alpha,
  useTheme,
  useMediaQuery,
} from "@mui/material";
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
  width: "90vw",
  height: "20em",
  border: "2px solid #E0E0E0",
  borderRadius: "2em",
  margin: " 0 auto",
  display: "flex",
  flexDirection: "column",
  padding: "1em 2em",

  [theme.breakpoints.down("sm")]: {
    height: "29vh",
    padding: "0.5em",
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

const label = { inputProps: { "aria-label": "Color switch demo" } };

function DlandUlCharts() {
  const [isUploadVisible, setIsUploadVisible] = useState(false);

  // Fetching and transforming data from localStorage
  const resultsFromLocalStorage = JSON.parse(
    localStorage.getItem("testResults") || "[]"
  );
  const transformedData = resultsFromLocalStorage.map((result) => ({
    name: result.date, // Using date from testResult as the name
    دانلود: result.download,
    آپلود: result.upload,
  }));

  const handleSwitchChange = () => {
    setIsUploadVisible((prevValue) => !prevValue);
  };

  const theme = useTheme();
  const isXsOrSmScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const legendStyle = isXsOrSmScreen ? { fontSize: "10px" } : {};
  const labelFontSize = isXsOrSmScreen ? "0.8rem" : "1rem";
  const xAxisTickSize = isXsOrSmScreen ? 10 : 16;
  const yAxisTickSize = isXsOrSmScreen ? 10 : 16;

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
        <InputLabel
          sx={{
            marginTop: "5px",
            fontSize: {
              xs: "1rem",
              sm: "1rem",
            },
          }}
        >
          آپلود
        </InputLabel>
        <PinkSwitch
          {...label}
          defaultChecked
          onChange={handleSwitchChange}
          size={isXsOrSmScreen ? "small" : "medium"}
        />
        <InputLabel
          sx={{
            marginTop: "5px",
            fontSize: {
              xs: "1rem",
              sm: "1rem",
            },
          }}
        >
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
          <LineChart data={transformedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={{ fontSize: xAxisTickSize }}/>
            <YAxis
              label={{
                value: "Mbps",
                position: "insideTopLeft",
                fontSize: labelFontSize,
                viewBox: { x: -4, y: 0, width: 100, height: 100 },
              }}
              tick={{ fontSize: yAxisTickSize }}
            />
            <Tooltip />
            <Legend wrapperStyle={legendStyle} />
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
