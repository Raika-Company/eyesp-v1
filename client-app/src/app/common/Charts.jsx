import {
  Box,
  Typography,
  useMediaQuery,
  Grid,
  useTheme,
  FormControl,
  MenuItem,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import NewCardContainer from "./NewCardContainer";
import {
  AreaChart,
  Area,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import YAxisLine from "./YAxisLine";
import xAxisLight from "../../app/assets/image/time-compare-light.svg";
import xAxisDark from "../../app/assets/image/time-compare-dark.svg";
import { ContainedSelect } from "./ContainedSelect";

/**
 * Custom tooltip component for the chart.
 *
 * @param {object} props - Component props.
 * @param {boolean} props.active - Indicates whether the tooltip is active.
 * @param {Array} props.payload - Data payload for the tooltip.
 * @returns {JSX.Element|null} - Tooltip component.
 */
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

/**
 * Array containing chart titles and units.
 *
 * @type {Array}
 */
const titlesChart = [
  {
    title: "سرعت دانلود",
    unit: "Mb/s",
  },
  {
    title: " سرعت اپلود",
    unit: "%",
  },
  {
    title: " پینگ",
    unit: "Mb/s",
  },
  {
    title: "پکت لاس",
    unit: "Ms",
  },
];

/**
 * Array containing chart colors.
 *
 * @type {Array}
 */
const chartColors = [
  {stroke: "#008EDD", gradientStart: "#0091E3", gradientEnd: "#008EDD"},
  {stroke: "#FFD700", gradientStart: "#FFD740", gradientEnd: "#FFD700"},
  {stroke: "#FF0000", gradientStart: "#FF4040", gradientEnd: "#FF0000"},
  {stroke: "#008000", gradientStart: "#00A000", gradientEnd: "#008000"},
];

/**
 * Array containing form control items.
 *
 * @type {Array}
 */
const FormControlItems = ["سالیانه", "سال 1402"];

/**
 * Example data for the charts.
 *
 * @type {Array}
 */
const data = [
  ["سالیانه", "ماهیانه", "هفتگی"],
  ["1402", "1401", "1400"],
];

/**
 * GridItem component to display a chart with data.
 *
 * @param {object} props - Component props.
 * @param {object} props.theme - MUI theme.
 * @param {boolean} props.rendered - Indicates whether the chart is rendered.
 * @param {string} props.title - Chart title.
 * @param {string} props.unit - Unit for chart data.
 * @param {Array} props.data - Chart data.
 * @param {object} props.color - Chart color.
 * @returns {JSX.Element} - GridItem component.
 */
function GridItem({ theme, rendered, title, data, unit, color }) {
  return (
    <NewCardContainer
      sx={{
        boxShadow: pathname === "/isp-summery" && "none",
        background: background,
        display: "flex",
        paddingInline: "3%",
        paddingBottom: "2.25rem",
        paddingTop: "1.5rem",
        borderRadius: ".75rem",
        flexBasis: "100%",
      }}
    >
      <Box display="flex" position="relative" width="92%">
        <Box sx={{ width: "100%" }}>
          <Box
            display="flex"
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="flex-end"
          >
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
                  <ResponsiveContainer width="100%" height={265}>
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
                        stroke={color.stroke}
                        fill={`url(#gradientChart${color.stroke})`}
                        strokeWidth={4}
                        filter="url(#glow)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              )}
            </Box>
          </Box>
          <img
            src={theme.palette.mode === "light" ? xAxisLight : xAxisDark}
            alt="xAxis"
            style={{width: "100%"}}
          />
        </Box>
        <YAxisLine
          max={Math.max(...data.map((line) => line.value))}
          unit={unit}
        />
      </Box>
    </NewCardContainer>
  );
}

/**
 * Generates random data for the chart.
 *
 * @returns {Array} - Random chart data.
 */
function generateRandomData() {
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      month: `${i} ماه`,
      value: Math.floor(Math.random() * 100),
    });
  }
  return data;
}

/**
 * Charts component to display multiple charts.
 *
 * This component renders multiple charts, allowing the user to select different data sets and view them in graphical form.
 *
 * @returns {JSX.Element} - Charts component.
 * @component
 */
const Charts = () => {
  const theme = useTheme();
  const [ispData, setIspData] = useState([]);
  const [rendered, setRendered] = useState(false);
  const [formControlItems, setFormControlItems] = useState("");
  const [currentChartData, setCurrentChartData] = useState({});
  const [randomChartData1, setRandomChartData1] = useState([]);
  const [randomChartData2, setRandomChartData2] = useState([]);
  const [randomChartData3, setRandomChartData3] = useState([]);
  const [randomChartData4, setRandomChartData4] = useState([]);
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  /**
   * Event handler for form control item selection.
   *
   * @param {Object} event - The event object.
   */
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

  /**
   * Fetches chart data from a JSON source and sets the initial chart data.
   */
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

  /**
   * Marks the charts as rendered once during component initialization.
   */
  useEffect(() => {
    setRendered(true);
  }, []);
  return (
    <>
      <NewCardContainer
        sx={{
          maxHeight: "880px",
          overflowY: "scroll",
          marginTop: "1rem",
          flexBasis: isMdScreen ? "100%" : "50%",
          pl: "1rem",
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
        </Box>
        <Grid>
          {titlesChart.map((line, index) => (
            <GridItem
              key={index}
              theme={theme}
              rendered={rendered}
              title={line.title}
              unit={line.unit}
              data={
                // Assign each chart a different randomChartData
                index === 0
                  ? randomChartData1
                  : index === 1
                  ? randomChartData2
                  : index === 2
                  ? randomChartData3
                  : randomChartData4
              }
              color={chartColors[index]} // Pass the color prop here
            />
          ))}
        </Grid>
      </NewCardContainer>
    </>
  );
};

export default Charts;
