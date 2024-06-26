import React, { useState, useMemo } from "react";
import CardContainer from "../../app/common/CardContainer";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ISPTable from "../../app/common/ISPTable";
import ViewDetailsButton from "../../app/common/ViewDetailsButton";
import { ContainedSelect } from "../../app/common/ContainedSelect";

/**
 * Raw data for the ISPs for comparison.
 * @type {Array<{ rank: string, ISPname: string, disturbance: string, pings: string, speed: string }>}
 */
const RawISPData = [
  { rank: "#1", ISPname: "زیتل", disturbance: "1", pings: "49", speed: "28" },
  {
    rank: "#2",
    ISPname: "همراه اول",
    disturbance: "3",
    pings: "51",
    speed: "23",
  },
  {
    rank: "#3",
    ISPname: "ایرانسل",
    disturbance: "3",
    pings: "52",
    speed: "21",
  },
  { rank: "#4", ISPname: "رایتل", disturbance: "4", pings: "59", speed: "19" },
  { rank: "#5", ISPname: "شاتل", disturbance: "6", pings: "61", speed: "18" },
  {
    rank: "#6",
    ISPname: "مخابرات",
    disturbance: "8",
    pings: "61",
    speed: "16",
  },
  { rank: "#7", ISPname: "آسیاتک", disturbance: "9", pings: "64", speed: "14" },
  {
    rank: "#8",
    ISPname: "های وب",
    disturbance: "11",
    pings: "53",
    speed: "19",
  },
];

/**
 * Selection items for sorting the ISP data.
 * @type {string[]}
 */
const selectionItems = [
  "نام ISP",
  "بیشترین اختلال",
  "کمترین اختلال",
  "بیشترین میانگین پینگ",
  "کمترین میانگین پینگ",
  "بیشترین میانگین سرعت",
  "کمترین میانگین سرعت",
];

/**
 * Parse a string and extracts the number from it.
 * @param {string} str - The string to parse.
 * @returns {number} - The extracted number.
 */
const parseNumber = (str) => {
  return parseFloat(str.replace(/[^0-9.]/g, ""));
};

/**
 * ISPCompareTable Component - Compares different ISPs based on various criteria.
 *
 * @param {Object} props - Component properties.
 * @param {number} props.mpCardContainers - Padding value.
 * @returns {JSX.Element} The rendered component.
 */
const ISPCompareTable = ({ mpCardContainers }) => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [sortCriteria, setSortCriteria] = useState("بیشترین اختلال");
  const [visibleRows, setVisibleRows] = useState(6);

  const sortFunctions = useMemo(
    () => ({
      "نام ISP": (a, b) => a.ISPname.localeCompare(b.ISPname),
      "بیشترین اختلال": (a, b) =>
        parseNumber(b.disturbance) - parseNumber(a.disturbance),
      "کمترین اختلال": (a, b) =>
        parseNumber(a.disturbance) - parseNumber(b.disturbance),
      "بیشترین میانگین پینگ": (a, b) =>
        parseNumber(b.pings) - parseNumber(a.pings),
      "کمترین میانگین پینگ": (a, b) =>
        parseNumber(a.pings) - parseNumber(b.pings),
      "بیشترین میانگین سرعت": (a, b) =>
        parseNumber(b.speed) - parseNumber(a.speed),
      "کمترین میانگین سرعت": (a, b) =>
        parseNumber(a.speed) - parseNumber(b.speed),
    }),
    []
  );

  const sortedISPData = useMemo(() => {
    const sortFunction = sortFunctions[sortCriteria];
    if (sortFunction) {
      return [...RawISPData].sort(sortFunction);
    }
    return RawISPData;
  }, [sortCriteria]);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  return (
    <CardContainer
      sx={{ flex: 1, paddingX: mpCardContainers, paddingY: "1.75rem" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isSmScreen ? "center" : "space-between",
          flexWrap: "wrap",
          marginBottom: "1.4rem",
        }}
      >
        <Typography variant="h1" color="text.textBlack">
          رتبه بندی ISPها
        </Typography>
        <ViewDetailsButton target="/isp-performance" />
      </Box>
      <ISPTable ISPdata={sortedISPData.slice(0, visibleRows)} />
      {visibleRows < RawISPData.length && (
        <Typography
          variant="body1"
          color="text.main"
          sx={{
            textAlign: "center",
            marginY: "1rem",
            cursor: "pointer",
            width: "100%",
          }}
          onClick={handleShowMore}
        >
          -- مشاهده بیشتر --
        </Typography>
      )}
      <ContainedSelect
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
        variant="outlined"
        sx={{
          marginRight: "0.5rem",
          color: "#E3E3E3",
          float: "left",
          paddingLeft: "2rem",
        }}
      >
        {selectionItems.map((item) => (
          <MenuItem key={item} sx={{ color: "textColor.light" }} value={item}>
            {item}
          </MenuItem>
        ))}
      </ContainedSelect>
    </CardContainer>
  );
};

export default ISPCompareTable;
