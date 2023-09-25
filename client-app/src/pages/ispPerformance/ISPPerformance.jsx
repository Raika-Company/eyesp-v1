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
import useDynamicMP from "../../app/hooks/useDynamicMP";
import provinces from "./../../../public/data/provinces.json";

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
const ISPPerformance = (props) => {
  const { province, handleProvinceChange } = props;
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);

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
        <Typography
          color="#2C2C2C"
          fontSize="1.5rem"
          fontFamily="PeydaSemiBold"
        >
          رتبه بندی ISPها
        </Typography>
        <Box display={"flex"} alignItems={"center"}>
          <Typography>استان مورد نظر:</Typography>
          <Select
            labelId="change-province-label"
            id="change-province"
            value={province}
            onChange={handleProvinceChange}
            displayEmpty
            sx={{
              borderRadius: "1.25rem",
              marginLeft: "max(10rem, 2vw)",
              marginRight: "0.5rem",
            }}
            renderValue={(selectedValue) =>
              selectedValue ? selectedValue : "انتخاب کنید"
            }
          >
            {provinces.map((provinceItem) => (
              <MenuItem key={provinceItem.name} value={provinceItem.name}>
                {provinceItem.name}
              </MenuItem>
            ))}
          </Select>
          <Typography> چینش براساس:</Typography>

          <Select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            variant="outlined"
            color="primary"
            sx={{
              marginRight: "0.5rem",
              color: "#676767",
              borderRadius: "1.25rem",
              float: "left",
            }}
          >
            {selectionItems.map((item) => (
              <MenuItem
                key={item}
                sx={{ color: "textColor.light" }}
                value={item}
              >
                {item}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <ISPTable isDetail={true} ISPdata={sortedISPData.slice(0, visibleRows)} />
    </CardContainer>
  );
};

export default ISPPerformance;
