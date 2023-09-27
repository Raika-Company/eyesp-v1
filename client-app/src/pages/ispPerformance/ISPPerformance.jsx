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
import useDynamicMP from "../../app/hooks/useDynamicMP";
import ProvincesCompare from "./../../../public/data/ProvincesCompare.json";
import RawISPData from "./../../../public/data/RowISPData.json";
/**
 * Raw data for the ISPs for comparison.
 * @type {Array<{ rank: string, ISPname: string, disturbance: string, pings: string, speed: string }>}
 */

/**
 * Raw data representing various ISPs and their performance metrics.
 * @type {Array.<Object>}
 */

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
const ISPPerformance = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);

  const [sortCriteria, setSortCriteria] = useState("بیشترین اختلال");
  const [provinceData, setProvinceData] = useState(ProvincesCompare);
  const [selectedProvince, setSelectedProvince] = useState("انتخاب کنید");

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
  const handleProvinceChange = (e) => {
    setSelectedProvince((prevState) => e.target.value);
    console.log("Selected Province:", e.target.value);
  };

  const sortedISPData = useMemo(() => {
    // Find the ISPs associated with the selected province
    let provinceISPs = ProvincesCompare.find(
      (p) => p.name === selectedProvince
    )?.ISPs;

    // If there are no ISPs for the selected province or if no province is selected, fall back to RawISPData
    let dataToSort = provinceISPs || RawISPData;

    const sortFunction = sortFunctions[sortCriteria];
    if (sortFunction) {
      return [...dataToSort].sort(sortFunction);
    }
    return dataToSort;
  }, [sortCriteria, selectedProvince]);

  return (
    <CardContainer
      sx={{
        paddingX: mpCardContainers,
        paddingY: "1.75rem",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmScreen ? "column" : "row",
          justifyContent: isSmScreen ? "center" : "space-between",
          flexWrap: "wrap",
          marginBottom: "1.4rem",
          width: "100%",
          gap: "1rem",
        }}
      >
        <Typography
          variant="h1"
          color="#2C2C2C"
          fontSize="1.5rem"
          fontFamily="PeydaSemiBold"
          textAlign={isSmScreen ? "center" : "left"}
        >
          رتبه بندی ISPها
        </Typography>
        <Box
          display={"flex"}
          flexDirection={isSmScreen ? "column" : "row"}
          alignItems={"center"}
          gap={isSmScreen ? "1rem" : "0"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Typography variant="h4" sx={{ whiteSpace: "nowrap" }}>
              استان مورد نظر:
            </Typography>
            <Select
              labelId="change-province-label"
              id="change-province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              displayEmpty
              sx={{
                borderRadius: "1.25rem",
                marginLeft: isSmScreen ? "0" : "1rem",
                marginRight: "0.5rem",
              }}
              renderValue={(selectedValue) =>
                selectedValue ? selectedValue : "انتخاب کنید"
              }
            >
              {provinceData.map((provinceItem) => (
                <MenuItem key={provinceItem.name} value={provinceItem.name}>
                  {provinceItem.name}
                </MenuItem>
              ))}
            </Select>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            width={"100%"}
          >
            <Typography variant="h4" whiteSpace={"nowrap"}>
              {" "}
              چینش براساس:
            </Typography>

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
      </Box>
      <Box
        sx={{
          overflowX: isMdScreen ? "scroll" : "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <ISPTable
          isDetail={true}
          ISPdata={sortedISPData.slice(0, visibleRows)}
        />
      </Box>
    </CardContainer>
  );
};

export default ISPPerformance;
