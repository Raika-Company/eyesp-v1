import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import xAxis from "../../app/assets/image/xAxis.svg";
import yAxis from "../../app/assets/image/yAxisEmpty.svg";
import leftArrow from "../../app/assets/image/leftArrow.svg";
import { Link } from "react-router-dom";
import data from "../../../public/data/myISPChartData.json";
import FormControlChart from "../../app/common/FormControlChart";
import { ContainedSelect } from "../../app/common/ContainedSelect";

const SoloChartPerformance = () => {
  const radialBackground =
    "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)";
  const buttons = [
    { label: "سرعت دانلود", width: "80%" },
    { label: "سرعت آپلود", width: "80%" },
    { label: "پینگ", width: "80%" },
    { label: "درصد عملکرد", width: "80%" },
  ];
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const [age, setAge] = useState("1400");
  const [rendered, setRendered] = useState(false);
  const [chartData, setChartData] = useState(data[0].data);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);

  const handleButtonClick = (index) => {
    setClickedButtonIndex(index);
    updateChartData(index);
  };
  const updateChartData = (index) => {
    if (index < data.length) {
      setChartData(data[index].data);
    }
  };

  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setAge(selectedYear);

    const yearData = data.find((d) => d.id === selectedYear.toString());
    if (yearData) {
      setChartData(yearData.data);
    }
  };
  const getChartLabel = () => {
    switch (clickedButtonIndex) {
      case 0:
        return "mb";
      case 1:
        return "mb";
      case 2:
        return "ms";
      case 3:
        return "%";
      default:
        return "mb";
    }
  };
  const activeButtonStyle = {
    backgroundColor: "#008EDD",
    color: "white",
    borderRadius: "2rem",
    border: "none",
    width: "60%",
  };
  const defaultButtonStyle = {
    borderRadius: "2rem",
    border: "none",
    width: "60%",
    color: "#676767",
  };
  const buttonGroupStyle = {
    backgroundColor: "#F4F4F4",
    width: "70%",
    alignItems: "center",
    gap: "11px",
    justifyContent: "center",
    borderRadius: "2rem",
    paddingY: "1rem",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  };
  useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <Box
      component={Paper}
      elevation={8}
      marginY="1rem"
      borderRadius="2rem"
      paddingBottom="4.25rem"
      paddingX="5%"
      flexBasis="50%"
      sx={{
        background: radialBackground,
        boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.20)",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        pt: isLgScreen ? "1.3rem" : "3.5rem",
      }}
    >
      <Typography
        sx={{
          fontSize: isLgScreen ? "1.4rem" : "1.5rem",
          mt: isLgScreen ? "0.4rem" : "",
          display: isLgScreen ? "none" : "flex",
        }}
        fontFamily="PeydaSemibold"
        color="#2C2C2C"
        gutterBottom
      >
        نمودار عملکرد اپراتور
      </Typography>
      <FormControlChart />
      <Box
        sx={{
          p: "1rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" sx={{ flexBasis: isLgScreen ? "100%" : "70%" }}>
          <Box>
            <Box
              borderRadius="3rem"
              padding="1rem"
              sx={{
                backgroundImage:
                  "radial-gradient(646.45% 156.82% at 1.67% -6.71%, #E2F7FF 0.31%, rgba(188, 203, 209, 0.00) 100%)",
              }}
              width="100%"
              height="100%"
            >
              {rendered && (
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={chartData}>
                    <Tooltip />
                    <defs>
                      <linearGradient
                        id="gradientChart"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0.333333"
                          stopColor="#0091E3"
                          stopOpacity="0.167089"
                        />
                        <stop offset="1" stopColor="#008EDD" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#008EDD"
                      fill="url(#gradientChart)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </Box>
            <img src={xAxis} alt="xAxis" style={{ width: "100%" }} />
          </Box>
          <Box display={"flex"} flexDirection={"column"} mr={1}>
            <Typography>{getChartLabel()}</Typography>
            <img src={yAxis} alt="yAxis" style={{ height: "100%" }} />
          </Box>
        </Box>
        <Box
          sx={{
            flexBasis: isLgScreen ? "100%" : "23%",
            display: isLgScreen ? "none" : "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
          gap={4}
        >
          <ButtonGroup
            orientation="vertical"
            variant="outlined"
            aria-label="outlined button group"
            sx={buttonGroupStyle}
          >
            {buttons.map((btn, index) => (
              <Button
                key={index}
                onClick={() => handleButtonClick(index)}
                style={
                  clickedButtonIndex === index
                    ? { ...activeButtonStyle, width: btn.width }
                    : { ...defaultButtonStyle, width: btn.width }
                }
              >
                {btn.label}
              </Button>
            ))}
          </ButtonGroup>
          <FormControl sx={{ width: "50%" }}>
            <Typography textAlign="center" mb="0.7rem">
              سال:
            </Typography>
            <ContainedSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="سال"
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="1400">1400</MenuItem>
              <MenuItem value="1401">1401</MenuItem>
              <MenuItem value="1402">1402</MenuItem>
            </ContainedSelect>
          </FormControl>
          <Box display={"flex"} justifyContent={"center"} gap={2}>
            <Button variant="text" component={Link} to="/isp-performance">
              سایر اپراتورها
            </Button>
            <img src={leftArrow} alt="leftArrow" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SoloChartPerformance;
