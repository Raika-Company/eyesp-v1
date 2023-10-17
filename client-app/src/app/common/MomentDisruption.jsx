import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
  ButtonGroup,
  Button,
  FormControl,
  MenuItem,
  styled,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { ContainedButton } from "./ContainedButton";
import StatisticBox from "./StatisticBox";
import CardContainer from "./CardContainer";
import { ContainedSelect } from "../../app/common/ContainedSelect";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import CustomSnackbar from "./CustomSnackbar";
import NewCardContainer from "./NewCardContainer";
import Irancell from "../assets/image/irancell.svg";
import ViewDetailsButton from "./ViewDetailsButton";
import CircleChart from "./CircleChart";
import AxisIsp from "../assets/image/AxisIsp.svg";
import { BarChart, XAxis, YAxis, Tooltip, Bar, ReferenceLine } from "recharts";

const OperatorProfile = () => {
  const handleDisturbanceClick = () => {
    setOpenFeedBackDialog(false);
    setTimeout(() => {
      setDisturbance(true);
    }, 500);
  };

  const theme = useTheme();

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [openFeedBackDialog, setOpenFeedBackDialog] = useState(false);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);
  const [age, setAge] = useState("در حال حاضر");

  const buttonGroupStyle = {
    backgroundColor: theme.palette.mode === "dark" ? "#303030" : "#F4F4F4",
    width: "44%",
    alignItems: "center",
    gap: "11px",
    justifyContent: "center",
    borderRadius: " 0.9375rem",
    paddingY: "1rem",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  };
  const buttons = [
    { label: "سرعت دانلود", width: "90%" },
    { label: "سرعت آپلود", width: "90%" },
    { label: "پینگ", width: "90%" },
    { label: "درصد عملکرد", width: "90%" },
  ];
  const handleButtonClick = (index) => {
    setClickedButtonIndex(index);
    updateChartData(index);
  };
  const activeButtonStyle = {
    backgroundColor: "#0C6087",
    color: "white",
    borderRadius: "2rem",
    border: "none",
    width: "60%",
  };
  const defaultButtonStyle = {
    borderRadius: "2rem",
    border: "none",
    width: "60%",
    color: "#E7E7E7",
  };
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setAge(selectedValue);

    let newChartData;

    switch (selectedValue) {
      case "1 روز قبل":
        // Just an example, modify this data as per your requirements
        newChartData = [
          { day: "05-07", اختلال: [2, 11] },
          { day: "05-08", اختلال: [1, 10] },
        ];
        break;
      case "1 هفته قبل":
        // Just an example, modify this data as per your requirements
        newChartData = [
          { day: "04-30", اختلال: [1, 12] },
          { day: "05-01", اختلال: [3, 13] },
        ];
        break;
      default: // "در حال حاضر"
        newChartData = [...data];
        break;
    }

    setChartData(newChartData);
  };

  const data = [
    {
      day: "05-01",
      اختلال: [-1, 10],
    },
    {
      day: "05-02",
      اختلال: [2, 15],
    },
    {
      day: "05-03",
      اختلال: [3, 12],
    },
    {
      day: "05-04",
      اختلال: [4, 12],
    },
    {
      day: "05-05",
      اختلال: [12, 16],
    },
    {
      day: "05-06",
      اختلال: [5, 16],
    },
  ];
  const [chartData, setChartData] = useState(data);

  const CustomBarShape = (props) => {
    const { fill, x, y, width, height } = props;

    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={fill} />
        {/* Shadow for the top line */}
        <line
          x1={x}
          y1={y + 6} // Offset for the shadow
          x2={x + width}
          y2={y - 6} // Offset for the shadow
          stroke="#FE4543"
          strokeOpacity="0.6" // Makes the shadow slightly transparent
          strokeWidth="50"
          filter="url(#blur)"
        />
        <line
          x1={x}
          y1={y}
          x2={x + width}
          y2={y}
          stroke="#FE4543"
          strokeWidth="9"
        />
        <line
          x1={x}
          y1={y + height - 6}
          x2={x + width}
          y2={y + height + 6}
          stroke="#FE4543"
          strokeOpacity="0.6"
          strokeWidth="50"
          filter="url(#blur)"
        />
        <line
          x1={x}
          y1={y + height}
          x2={x + width}
          y2={y + height}
          stroke="#FE4543"
          strokeWidth="9"
        />
        <defs>
          <filter id="blur">
            <feGaussianBlur stdDeviation="4" />
          </filter>
        </defs>
      </g>
    );
  };

  const formatYAxisTicks = (tick) => {
    const labels = {
      "-6": "4ساعت قبل",
      0: "2 ساعت قبل",
      6: "1 ساعت قبل",
      12: "30 دقیقه قبل",
      18: " در حال حاضر",
      // Add more if needed
    };
    return labels[tick] || "";
  };

  return (
    <>
      <NewCardContainer
        sx={{
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          paddingX: "3%",
          flexBasis: "100%",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          {" "}
          <Typography m={0} variant="h1" component="h2" color="text.textBlack">
            اختلالات لحظه ای{" "}
          </Typography>
          <ViewDetailsButton target="/isp-performance" />
        </Box>
        <Box
          mt={1}
          ml={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          {" "}
          <Typography m={0} variant="h6" color="text.textBlack" gutterBottom>
            نمایش تا
          </Typography>
          <FormControl sx={{ width: "8.8125rem" }}>
            <ContainedSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="سال"
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="در حال حاضر">درحال حاضر</MenuItem>
              <MenuItem value="1 روز قبل">1 روز قبل</MenuItem>
              <MenuItem value="1 هفته قبل">1 هفته قبل</MenuItem>
            </ContainedSelect>
          </FormControl>
        </Box>
        <Box mt={4}>
          <BarChart
            width={649}
            height={250}
            data={chartData}
            margin={{ bottom: 20, left: 50 }}
          >
            {/* <YAxis tickMargin={80} tickFormatter={formatYAxisTicks} /> */}
            <YAxis
              tickMargin={80}
              tickFormatter={formatYAxisTicks}
              width={85} // Increase width for YAxis
              tick={{
                fontSize: 14, // You can adjust the font size
                fontWeight: "bold",
                textAnchor: "end", // Make sure text is anchored to the end
              }}
            />
            {/* <Tooltip /> */}
            <Bar
              dataKey="اختلال"
              fill="rgba(255, 0, 0, 0.2)"
              shape={<CustomBarShape />}
              barSize={48} // The width of the bar.
              barGap={50}
            />
            <ReferenceLine
              y={-6}
              stroke="grey"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            <ReferenceLine
              y={0}
              stroke="grey"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            <ReferenceLine
              y={6}
              stroke="grey"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            <ReferenceLine
              y={12}
              stroke="grey"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
            <ReferenceLine
              y={18}
              stroke="#00C2FF"
              strokeWidth={1}
              strokeOpacity={0.5}
            />
          </BarChart>
        </Box>
      </NewCardContainer>
    </>
  );
};

export default OperatorProfile;
