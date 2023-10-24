import {
  Box,
  Grid,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
} from "@mui/material";
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
import NewCardContainer from "./NewCardContainer";
import services from "../../app/api/index";
import CloseIcon from "@mui/icons-material/Close";

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
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <p>زمان: {payload[0].payload.name}</p>
          <p>مقدار: {payload[0].payload.value}</p>
        </div>
      </div>
    );
  }

  return null;
};

const chartColors = [
  { stroke: "#008EDD", gradientStart: "#0091E3", gradientEnd: "#008EDD" },
  { stroke: "#FFD700", gradientStart: "#FFD740", gradientEnd: "#FFD700" },
  { stroke: "#FFFFFF", gradientStart: "#FFFFFF", gradientEnd: "#FFFFFF" },
  { stroke: "#FF0000", gradientStart: "#FF4040", gradientEnd: "#FF0000" },
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
          <AxisLine xAxisValues={data?.map((obj) => obj.name)} direction="X" />
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
const OperatorCompareModal = ({
  province,
  isp,
  maxWidth,
  handleCloseModal,
}) => {
  const theme = useTheme();
  const [rendered, setRendered] = useState(false);
  const [selectedTime, setSelectedTime] = useState("today"); // Change 'age' to a more appropriate name: 'selectValue'
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [chartData, setChartData] = useState([]);

  const handleChangeDailyPercent = (event) => {
    const selectedValue = event.target.value;
    setSelectedTime(selectedValue);
  };
  const fetchChartData = (type) => {
    services.dashboard
      .GetCharts(
        province
          ? `${province[0].toUpperCase()}${province?.slice(1)}`
          : undefined,
        isp,
        selectedTime
      )
      .then((response) => {
        const receivedData = response.data.data.data;
        if (selectedTime === "year") {
          receivedData.download.reverse();
          receivedData.upload.reverse();
          receivedData.ping.reverse();
          receivedData.packet_loss.reverse();
        }
        const mappedData = [
          { title: "سرعت دانلود", unit: "Mb/s", data: receivedData.download },
          { title: "سرعت اپلود", unit: "Mb/s", data: receivedData.upload },
          { title: "پینگ", unit: "Ms", data: receivedData.ping },
          { title: "پکت لاس", unit: "%", data: receivedData.packet_loss },
        ];
        setChartData(mappedData);
      })
      .catch((error) => {
        console.log("خطا در بارگذاری اطلاعات", error);
      });
  };

  useEffect(() => {
    fetchChartData(selectedTime);
  }, [selectedTime, province, isp]);

  useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <>
      <NewCardContainer
        sx={{
          flexBasis: isMdScreen ? "100%" : "50%",
          maxWidth: maxWidth,
          borderRadius: "0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "2rem",
            marginTop: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography color="text.textBlack" variant="h1" ml={2}>
              نمودار{" "}
            </Typography>
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
                  //   onChange={handleChange}
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
          <Box sx={{ display: "flex", justifyContent: "end" }}>
            <Button
              color="text"
              endIcon={<CloseIcon sx={{ marginX: "0.5rem" }} />}
              onClick={handleCloseModal}
            >
              بستن
            </Button>{" "}
          </Box>
        </Box>
        <Grid container width="97%" pb={2}>
          {chartData?.map((item, index) => (
            <GridItem
              key={index}
              theme={theme}
              rendered={rendered}
              title={item.title}
              unit={item.unit}
              color={chartColors[index]}
              data={item.data}
              handleChangeDailyPercent={handleChangeDailyPercent}
              selectValue={selectedTime}
            />
          ))}
        </Grid>
      </NewCardContainer>
    </>
  );
};

export default OperatorCompareModal;