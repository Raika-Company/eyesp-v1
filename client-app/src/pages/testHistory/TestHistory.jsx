import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import HistoryTable from "./HistoryTable";
import YAxisLine from "../../app/common/YAxisLine";
import XAxisLine from "./XAxisLine";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ContainedButton } from "../../app/common/ContainedButton";

const convertPersianNumbers = (persianNumber) => {
  if (typeof persianNumber === "string") {
    const persianToEnglishMap = {
      "۰": "0",
      "۱": "1",
      "۲": "2",
      "۳": "3",
      "۴": "4",
      "۵": "5",
      "۶": "6",
      "۷": "7",
      "۸": "8",
      "۹": "9",
      ".": ".",
    };
    const newNum = persianNumber
      .split("")
      .map((i) => persianToEnglishMap[i] || i)
      .join("");

    return Number(newNum) || 0; // Default to 0 if not a number
  } else return persianNumber;
};

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
 * Tooltip for bar chart.
 * @param {Object} props
 * @param {boolean} props.active - If the tooltip is active.
 * @param {Array<Object>} props.payload - Data payload for the tooltip.
 * @returns {JSX.Element|null}
 */
const CustomTooltip = ({ active, payload }) => {
  // Logging the payload to inspect its structure:
  // console.log(payload);

  if (active && payload && payload.length) {
    // Attempting to extract the download and upload values:
    const dataItem = payload[0]?.payload;
    const downloadValue = dataItem?.value?.download;
    const uploadValue = dataItem?.value?.upload;

    // Only display the tooltip if both values are present:
    if (downloadValue && uploadValue) {
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
          <p>{`دانلود: ${downloadValue} آپلود: ${uploadValue}`}</p>
        </div>
      );
    }
  }
  return null;
};

/**
 * Represents a single grid item that displays the chart.
 * @function
 * @param {Object} props
 * @param {Object} props.theme - Current theme object from MUI.
 * @param {boolean} props.rendered - Indicates whether the component should render the chart.
 * @param {string} props.title - Title of the chart.
 * @param {Array<Object>} props.data - Data to be visualized on the chart.
 * @param {string} props.unit - Measurement unit for the data.
 * @returns {JSX.Element}
 */
const GridItem = ({
  theme,
  rendered,
  title,
  data,
  unit,
  selectedIds,
  type,
}) => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  // Note: Moved barColors and related logic here for clarity.
  const barColors = ["#00c3ff46", "#6fff004b", "#fe464341", "#00c3ff44"];
  const barColorsTop = ["#00C2FF", "#70FF00", "#FE4543", "#00C2FF"];
  // Separate component for clarity.

  const TopBorderedBar = ({ x, y, width, height, fill, index }) => (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} />
      <line
        x1={x}
        y1={y + 5}
        x2={x + width}
        y2={y - 5}
        stroke={barColorsTop[index % barColorsTop.length]}
        strokeOpacity="0.9"
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
  const computeMaxValue = (data) => {
    const values = data.map((line) =>
      Math.max(
        convertPersianNumbers(line.value.download),
        convertPersianNumbers(line.value.upload)
      )
    );

    // Get the maximum value and check for invalid values (like Infinity or NaN)
    const maxValue = Math.max(...values);
    return isFinite(maxValue) && !isNaN(maxValue) ? maxValue : 0;
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
          <Box borderRadius="3rem" padding="1rem" width="100%" height="360px">
            {rendered && (
              <ResponsiveContainer width="100%" height={261}>
                <BarChart width="100%" height="100%" data={data}>
                  <CartesianGrid
                    vertical={false}
                    stroke={
                      theme.palette.mode === "dark" ? "#2e2e2e" : "#E9E9E9"
                    }
                  />
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
                    dataKey={
                      type === "download" ? "value.download" : "value.upload"
                    }
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
            )}
          </Box>
          <XAxisLine
            max={Math.max(...data.map((line) => line.value))}
            unit={unit}
            selectedIds={selectedIds}
          />
        </Box>
        <Box
          sx={{
            position: "absolute",
            left: isSmScreen ? "2.5rem" : "3rem",
            top: "1.5rem",
          }}
        >
          <YAxisLine max={computeMaxValue(data)} unit={unit} />
        </Box>
      </Box>
    </Grid>
  );
};

/**
 * Main component that provides a UI for viewing test history and corresponding charts.
 * @param {Object} props
 * @param {boolean} props.openNav - Indicates if the navigation menu is open.
 * @returns {JSX.Element}
 */
const NewTestHistory = ({ openNav }) => {
  const [tableData, setTableData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);

  const theme = useTheme();
  const navigate = useNavigate();
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("testResults") || "[]"
    );
    setTableData(localStorageData);

    if (localStorageData.length >= 4) {
      setSelectedIds(["0", "1", "2", "3"]);
    }
  }, []);

  useEffect(() => {
    setRendered(true);
  }, []);

  const handleButtonClick = () => {
    navigate("/");
  };

  const isMD = useMediaQuery(theme.breakpoints.up("md"));
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      sx={{
        background: "transparent",
        marginTop: "1rem",
        // marginBottom: "4rem",
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
          <ContainedButton txtHover="#0C6087" txtColor="#fff">
            خروجی اکسل
          </ContainedButton>
          <ContainedButton
            onClick={handleButtonClick}
            bgColor="#0C6087"
            txtHover="#0C6087"
            txtColor="#fff"
          >
            انجام تست
          </ContainedButton>
        </Box>
      </Box>
      <HistoryTable
        setSelectedIds={setSelectedIds}
        initialSelectedIds={selectedIds}
      />
      <Grid container>
        {titlesChart.map((line, index) => (
          <GridItem
            selectedIds={selectedIds}
            key={index}
            theme={theme}
            rendered={rendered}
            title={line.title}
            unit={line.unit}
            type={index === 0 ? "download" : "upload"}
            data={tableData
              .filter((item, index) => selectedIds.includes(String(index)))
              .map((row, index) => {
                return {
                  value: {
                    download: convertPersianNumbers(row.download),
                    upload: convertPersianNumbers(row.upload),
                  },
                };
              })}
          />
        ))}
      </Grid>
    </Card>
  );
};

export default NewTestHistory;
