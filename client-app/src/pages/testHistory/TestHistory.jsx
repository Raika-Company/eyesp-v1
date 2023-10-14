import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import moment from "moment-jalaali";
import xAxisLight from "../../app/assets/image/time-compare-light.svg";
import xAxisDark from "../../app/assets/image/time-compare-dark.svg";
import axios from "axios";
import NewSwitchBtn from "./newSwitchBtn";
import HistoryTable from "./HistoryTable";
import YAxisLine from "../ispCompare/YAxisLine";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import XAxisLine from "./XAxisLine";

/**
 * Constants
 */
const TEST_RESULTS = "testResults";

/**
 * Titles and units used for chart visualization.
 * @typedef {Object} TitleChart
 * @property {string} title - The display name of the chart.
 * @property {string} unit - The measurement unit for the chart data.
 */
const titlesChart = [
  { title: "سرعت دانلود", unit: "Mb/s" },
  { title: "سرعت آپلود", unit: "Mb/s" },
];

/**
 * Categorizes an array of tests into different time intervals: last 24 hours, last week, last month, and older.
 *
 * @function
 * @param {Array} tests - List of tests each containing an `englishDate` field.
 * @returns {Object} Object containing categorized tests.
 */
const categorizeTests = (tests) => {
  const now = moment();
  const categories = {
    last24Hours: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  };

  tests.forEach((test) => {
    const testDate = moment(test.englishDate, "jYYYY/jM/jD");
    const diffDays = now.diff(testDate, "days");

    if (diffDays < 1) {
      categories.last24Hours.push(test);
    } else if (diffDays < 7) {
      categories.lastWeek.push(test);
    } else if (diffDays < 30) {
      categories.lastMonth.push(test);
    } else {
      categories.older.push(test);
    }
  });

  categories.last24Hours.sort(
    (a, b) => new Date(a.englishDate) - new Date(b.englishDate)
  );

  return categories;
};

/**
 * Generates an array of random chart data.
 *
 * @function
 * @param {number} numberOfDataPoints - The desired length of the data array.
 * @returns {Array<Object>} Array containing randomly generated chart data.
 */
function generateRandomChartData(numberOfDataPoints) {
  const data = [];

  for (let i = 0; i < numberOfDataPoints; i++) {
    data.push({
      date: `2023-${Math.ceil(Math.random() * 12)}-${Math.ceil(
        Math.random() * 28
      )}`,
      value: Math.floor(Math.random() * 40),
    });
  }

  return data;
}

/**
 * A grid item component that displays a chart for test data.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.theme - Current theme object from MUI.
 * @param {boolean} props.rendered - Indicates whether the component should render the chart.
 * @param {string} props.title - The title of the chart.
 * @param {Array<Object>} props.data - The data to be visualized on the chart.
 * @param {string} props.unit - The measurement unit for the data.
 * @returns {JSX.Element} A grid item containing a chart.
 */
function GridItem({ theme, rendered, title, data, unit }) {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: "#fff",
            color: "#333",
            boxShadow: "0 0 14px  rgb(0 0 0 / 40%)",
            padding: "1rem",
            textAlign: "center",
            borderRadius: "1rem",
            width: "70%",
          }}
        >
          <p>دانلود:{`${label} آپلود:${payload[0].value}`}</p>
        </div>
      );
    }

    return null;
  };
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const barColorsTop = ["#00C2FF", "#70FF00", "#FE4543", "#00C2FF"];
  const barColors = ["#00c3ff46", "#6fff004b", "#fe464341", "#00c3ff44"];

  const TopBorderedBar = (props) => {
    const { x, y, width, height, fill, index } = props;

    return (
      <g>
        <rect x={x} y={y} width={width} height={height} fill={fill} />
        {/* Shadow for the line */}
        <line
          x1={x}
          y1={y + 6} // Offset for the shadow
          x2={x + width}
          y2={y - 6} // Offset for the shadow
          stroke={barColorsTop[index % barColorsTop.length]}
          strokeOpacity="0.9" // Makes the shadow slightly transparent
          strokeWidth="50"
          filter="url(#blur)"
        />
        <line
          x1={x}
          y1={y}
          x2={x + width}
          y2={y}
          stroke={barColorsTop[index % barColorsTop.length]}
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

  return (
    <Grid item xs={12} md={6} padding="2rem 0.5rem" mt="1rem">
      <Box
        display="flex"
        position="relative"
        sx={{
          background: theme.palette.mode === "dark" ? "#1A1A1A" : "#F3F3F3",
          boxShadow: "0px 0px 30px 0px rgba(255, 255, 255, 0.20)",
          borderRadius: "1.2rem",
        }}
      >
        <Box sx={{ width: isSmScreen ? "100%" : "94.4%", padding: "1rem" }}>
          <Typography color="text.main" variant="h4" gutterBottom>
            {title}
          </Typography>
          <Box borderRadius="3rem" padding="1rem" width="100%" height="321px">
            {rendered && (
              <Box>
                <ResponsiveContainer width="100%" height={261}>
                  <BarChart width="100%" height="100%" data={data}>
                    <defs>
                      <linearGradient
                        id="gradientChart"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="1" stopColor="#008EDD" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      stackId="a"
                      type="monotone"
                      dataKey="value"
                      stroke="transparent"
                      fill="url(#gradientChart)"
                      barSize={55}
                      shape={<TopBorderedBar />}
                    >
                      {data.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={barColors[index % barColors.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>
          {/* <img
            src={theme.palette.mode === "light" ? xAxisLight : xAxisDark}
            alt="xAxis"
            style={{ width: "100%" }}
          /> */}
          <XAxisLine
            max={Math.max(...data.map((line) => line.value))}
            unit={unit}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: isSmScreen ? "2.5rem" : "3rem",
            top: "1.5rem",
          }}
        >
          <YAxisLine
            max={Math.max(...data.map((line) => line.value))}
            unit={unit}
          />
        </Box>
      </Box>
    </Grid>
  );
}

/**
 * Main component that provides a UI for viewing test history and corresponding charts.
 *
 * @component
 * @param {Object} props
 * @param {boolean} props.openNav - Indicates if the navigation menu is open.
 * @returns {JSX.Element} A card component displaying test history and charts.
 */
const NewTestHistory = ({ openNav }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [ispData, setIspData] = useState([]); // state to store the data from JSON
  const [rendered, setRendered] = useState(false);
  const [currentChartData, setCurrentChartData] = useState([]);
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [randomChartData1, setRandomChartData1] = useState(
    generateRandomChartData(4)
  );
  const [randomChartData2, setRandomChartData2] = useState(
    generateRandomChartData(4)
  );

  const fetchChartData = async () => {
    try {
      const { data } = await axios.get("/data/chartData.json");
      setIspData(data);
      const defaultISPData = data.find((item) => item.id === "سرعت دانلود");
      if (defaultISPData) {
        setCurrentChartData(defaultISPData);
        setRandomChartData1(generateRandomData());
        setRandomChartData2(generateRandomData());
      }
    } catch (error) {
      console.log("خطا در بارگذاری اطلاعات", error);
    }
  };

  useEffect(() => {
    setRendered(true);
  }, []);

  const handleButtonClick = () => {
    navigate("/");
  };

  const isMD = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [testHistory, setTestHistory] = useState({
    last24Hours: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  });

  const updateTestHistory = useCallback(() => {
    const existingResults = JSON.parse(
      localStorage.getItem(TEST_RESULTS) || "[]"
    );
    setTestHistory(categorizeTests(existingResults));
  }, []);

  useEffect(() => {
    fetchChartData();
    setRendered(true);
    updateTestHistory();
  }, [updateTestHistory]);

  return (
    <Card
      sx={{
        background: "transparent",        marginTop: "1rem",
        marginBottom: "4rem",
        boxShadow: "none",
        backgroundImage: "none",
        padding: "1rem",
        overflowX: "hidden",
        width:
          isSm && openNav
            ? "calc(100% + 5rem)"
            : isMD
            ? "calc(100% - 1rem)"
            : "calc(100%)",
        transition: "all .3s linear",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Typography variant="h1" color="text.textBlack" gutterBottom>
          تست های گذشته
        </Typography>
        <Box display="flex" alignItems="center" gap="1.19rem">
          <NewSwitchBtn
            textOn="خروجی اکسل"
            textOff="انجام تست"
            onClick={handleButtonClick}
            variant="contained"
            bgColor=" #0C6087"
            txtHover=" #0C6087"
            sx={{
              fontSize: "1rem",
            }}
          >
            خروجی اکسل
          </NewSwitchBtn>
        </Box>
      </Box>
      <HistoryTable />
      <Grid container>
        {titlesChart.map((line, index) => (
          <GridItem
            key={index}
            theme={theme}
            rendered={rendered}
            title={line.title}
            unit={line.unit}
            data={
              index === 0
                ? randomChartData1
                : index === 1
                ? randomChartData2
                : ""
            }
          />
        ))}
      </Grid>
    </Card>
  );
};

export default NewTestHistory;
