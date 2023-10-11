import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  MenuItem,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer } from "recharts";
import xAxis from "../../app/assets/image/xAxis.svg";
import YAxisLine from "../ispCompare/YAxisLine";
import leftArrow from "../../app/assets/image/leftArrow.svg";
import { Link } from "react-router-dom";
import data from "../../../public/data/myISPChartData.json";
import FormControlChart from "../../app/common/FormControlChart";
import { ContainedSelect } from "../../app/common/ContainedSelect";
import CardContainer from "../../app/common/CardContainer";
import { CustomTooltip } from "../ispCompare/OperatorCompare";

const SoloChartPerformance = () => {
  const theme = useTheme();

  const buttons = [
    { label: "سرعت دانلود", width: "80%" },
    { label: "سرعت آپلود", width: "80%" },
    { label: "پینگ", width: "80%" },
    { label: "درصد عملکرد", width: "80%" },
  ];

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
    backgroundColor: theme.palette.mode === "dark" ? "#020D13" : "#F4F4F4",
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
    <CardContainer
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        pt: isLgScreen ? "1.3rem" : "3.5rem",
        marginY: "1rem",
        paddingBottom: "4.25rem",
        paddingX: "5%",
        flexBasis: "50%",
      }}
    >
      <Typography
        variant="h1"
        color="text.textBlack"
        gutterBottom
        sx={{
          width: "100%",
          mt: isLgScreen ? "0.4rem" : "",
          display: isLgScreen ? "none" : "flex",
        }}
      >
        نمودار عملکرد اپراتور
      </Typography>
      <FormControlChart />
      <Box
        sx={{
          p: "1rem",
          display: "flex",
          gap: "2rem",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex" position="relative" marginLeft="1rem">
          <div>
            <Box
              borderRadius="3rem"
              padding="1rem"
              sx={{
                background:
                  theme.palette.mode === "dark"
                    ? "radial-gradient(646.45% 156.82% at 1.67% -6.71%, rgba(103, 154, 202, 0.23) 0.31%, rgba(104, 137, 151, 0.00) 100%)"
                    : "radial-gradient(646.45% 156.82% at 1.67% -6.71%, #E2F7FF 0.31%, rgba(188, 203, 209, 0.00) 100%)",
                maxWidth: "calc(100% - 1rem)",
              }}
              height="100%"
            >
              {rendered && (
                <ResponsiveContainer height={300}>
                  <AreaChart data={chartData}>
                    <Tooltip content={<CustomTooltip />} />
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
            <img src={xAxis} alt="xAxis" width="100%" />
          </div>
          <YAxisLine
            max={Math.max(...chartData.map((line) => line.value))}
            unit={getChartLabel()}
            height="20rem"
          />
        </Box>
        <Box
          sx={{
            minWidth: "25%",
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
          <FormControl sx={{ width: "70%" }}>
            <Typography
              variant="h3"
              color="text.main"
              textAlign="center"
              mb="0.7rem"
            >
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
          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              variant="text.main"
              component={Link}
              to="/operator-performance"
            >
              سایر اپراتورها
              <img src={leftArrow} alt="leftArrow" />
            </Button>
          </Box>
        </Box>
      </Box>
    </CardContainer>
  );
};

export default SoloChartPerformance;
