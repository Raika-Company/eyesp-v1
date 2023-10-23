import { Box, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useEffect, useState } from "react";
import xAxisLight from "../../app/assets/image/time-compare-light.svg";
import xAxisDark from "../../app/assets/image/time-compare-dark.svg";
import YAxisLine from "./YAxisLine";
import axios from "axios";
import { ContainedSelect } from "../../app/common/ContainedSelect";
import CardContainer from "../../app/common/CardContainer";
import { useLocation } from "react-router-dom";
import AxisLine from "./AxisLine";

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          background: "#fff",
          color: "#333",
          boxShadow: "0 0 14px  rgb(0 0 0 / 40%)",
          padding: "1px",
          textAlign: "left",
          borderRadius: "1rem",
        }}
      >
        <div
          style={{
            margin: "13px 19px",
          }}
        >
          <p>month: {payload[0].payload.month.split(" ")[0]}</p>
          <p>value: {payload[0].payload.value}</p>
        </div>
      </div>
    );
  }

  return null;
};
const titlesChart = [
  {
    title: "میانگین عملکرد",
    unit: "Mb/s",
  },
  {
    title: "پاکت لاس",
    unit: "%",
  },
  {
    title: "میانگین سرعت",
    unit: "Mb/s",
  },
  {
    title: "پینگ",
    unit: "Ms",
  },
];
const chartColors = [
  { stroke: "#008EDD", gradientStart: "#0091E3", gradientEnd: "#008EDD" },
  { stroke: "#FFD700", gradientStart: "#FFD740", gradientEnd: "#FFD700" },
  { stroke: "#FF0000", gradientStart: "#FF4040", gradientEnd: "#FF0000" },
  { stroke: "#008000", gradientStart: "#00A000", gradientEnd: "#008000" },
];
function GridItem({
  theme,
  rendered,
  title,
  data,
  unit,
  color,
  background,
  selectValue,
  handleChangeDailyPercent,
}) {
  const { pathname } = useLocation();
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Grid item xs={12} md={6} padding="2rem">
      <Box display="flex" position="relative">
        <Box sx={{ width: "100%" }}>
          <Typography color="text.main" variant="h4" gutterBottom>
            {title}
          </Typography>
          <Box
            borderRadius="3rem"
            paddingRight="3%"
            width="100%"
            height="250px"
          >
            {rendered && (
              <Box>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart width="100%" height="100%" data={data}>
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid
                      vertical={false}
                      stroke={
                        theme.palette.mode === "dark" ? "#2e2e2e" : "#E9E9E9"
                      }
                    />
                    <defs>
                      <filter
                        id="glow"
                        x="-70%"
                        y="-70%"
                        width="200%"
                        height="200%"
                      >
                        <feOffset
                          result="offOut"
                          in="SourceGraphic"
                          dx="0"
                          dy="0"
                        />
                        <feGaussianBlur
                          result="blurOut"
                          in="offOut"
                          stdDeviation="5"
                        />
                        <feBlend
                          in="SourceGraphic"
                          in2="blurOut"
                          mode="normal"
                        />
                      </filter>
                    </defs>
                    <Area
                      type="linear"
                      dataKey="value"
                      stroke={color && color.stroke}
                      fill={`url(#gradientChart${color && color.stroke})`}
                      strokeWidth={4}
                      filter="url(#glow)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>
          {/* <AxisLine xAxisValues={data.map((obj) => obj.name)} direction="X" /> */}
        </Box>
        <AxisLine
          max={Math.max(...data?.map((line) => line.value))}
          unit={unit}
          direction="Y"
        />
      </Box>
    </Grid>
  );
}
const FormControlItems = ["انتخاب اپراتورها", "سالیانه", "سال", "استان"];
const data = [
  ["ایرانسل", "همراه اول", "رایتل", "شاتل"],
  ["سالیانه", "ماهیانه", "هفتگی"],
  ["1402", "1401", "1400"],
  [
    "بندرعباس",
    "شیراز",
    "مشهد",
    "اصفهان",
    "مازندران",
    "تهران",
    "اهواز",
    "سمنان",
    "خوزستان",
    "گیلان",
  ],
];

function generateRandomData() {
  // Generate random data for the chart
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      month: `${i} ماه`,
      value: Math.floor(Math.random() * 100), // Adjust the range as needed
    });
  }
  return data;
}
const OperatorCompareModal = () => {
  const theme = useTheme();
  const [ispData, setIspData] = useState([]); // state to store the data from JSON
  const [rendered, setRendered] = useState(false);
  const [formControlItems, setFormControlItems] = useState("");
  const [currentChartData, setCurrentChartData] = useState({});
  const [randomChartData1, setRandomChartData1] = useState([]);
  const [randomChartData2, setRandomChartData2] = useState([]);
  const [randomChartData3, setRandomChartData3] = useState([]);
  const [randomChartData4, setRandomChartData4] = useState([]);
  const [chartData, setChartData] = useState([]);

  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleChange = (event) => {
    setFormControlItems(event.target.value);
    const selectedISPData = ispData.find(
      (item) => item.id === event.target.value
    );
    if (selectedISPData) {
      setCurrentChartData(selectedISPData);
      setRandomChartData1(generateRandomData());
      setRandomChartData2(generateRandomData());
      setRandomChartData3(generateRandomData());
      setRandomChartData4(generateRandomData());
    }
  };

  useEffect(() => {
    axios
      .get("/data/chartData.json")
      .then((response) => {
        const data = response.data;
        setIspData(data);
        const defaultISPData = data.find((item) => item.id === "ایرانسل"); // find "ایرانسل" data
        if (defaultISPData) {
          setCurrentChartData(defaultISPData); // set "ایرانسل" data as default chart data
          setRandomChartData1(generateRandomData());
          setRandomChartData2(generateRandomData());
          setRandomChartData3(generateRandomData());
          setRandomChartData4(generateRandomData());
        }
      })
      .catch((error) => {
        console.log("خطا در بارگذاری اطلاعات", error);
      });
  }, []);
  useEffect(() => {
    setRendered(true);
  }, []);
  return (
    <>
      <Box
        sx={{
          display: isMdScreen ? "flex" : " none",
          width: "100%",
          height: "78px",
          borderRadius: "2rem",
          alignItems: "center",
          justifyContent: "center",
          //   boxShadow: "0 4px 20px 0 rgba(0, 0, 0, 0.10)",
          background:
            theme.palette.mode === "dark"
              ? "radial-gradient(214.28% 128.84% at 3.96% 11.02%, rgba(58, 73, 88, 0.82) 0%, rgba(35, 52, 69, 0.82) 48.53%, rgba(9, 25, 39, 0.82) 100%)"
              : "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)",
          boxShadow:
            theme.palette.mode === "light"
              ? "0px 4px 40px 0px rgba(0, 0, 0, 0.20)"
              : "0px 4px 40px 0px rgba(255, 255, 255, 0.10)",
        }}
      ></Box>
      <CardContainer
        sx={{
          mt: "1rem",
          mb: "2rem",
          p: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography color="text.textBlack" variant="h1">
            نمودار عملکرد اپراتور
          </Typography>
          <Box
            sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
          >
            {FormControlItems.map((items, index) => (
              <FormControl
                key={index}
                sx={{
                  m: "0.4rem",
                  width: isSmScreen ? 125 : isMdScreen ? 180 : 160,
                  borderRadius: "25px",
                }}
                size="small"
              >
                <ContainedSelect
                  labelId={`demo-select-small-label-${index}`}
                  id={`demo-select-small-${index}`}
                  label={items}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem disabled>
                    <span style={{ color: "#676767" }}>{items}</span>
                  </MenuItem>
                  {data[index].map((menuItem, menuItemIndex) => (
                    <MenuItem
                      sx={{ color: "text.main" }}
                      key={menuItemIndex}
                      value={menuItem}
                    >
                      {menuItem}
                    </MenuItem>
                  ))}
                </ContainedSelect>
              </FormControl>
            ))}
          </Box>
          <Box sx={{ display: isMdScreen ? "none" : " flex" }}> </Box>
        </Box>
        <Grid container>
          {titlesChart.map((line, index) => (
            <GridItem
              key={index}
              theme={theme}
              rendered={rendered}
              title={line.title}
              unit={line.unit}
              data={randomChartData4}
            />
          ))}
        </Grid>
      </CardContainer>
    </>
  );
};

export default OperatorCompareModal;
