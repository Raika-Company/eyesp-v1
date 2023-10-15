import React, { useState, useMemo } from "react";
import CardContainer from "../../app/common/CardContainer";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  styled,
  FormControl,
  useTheme,
} from "@mui/material";
import ISPTable from "../../app/common/ISPTable";
import useDynamicMP from "../../app/hooks/useDynamicMP";
import ProvincesCompare from "./../../../public/data/ProvincesCompare.json";
import RawISPData from "./../../../public/data/RowISPData.json";
import NewCardContainer from "../../app/common/NewCardContainer";
import { ContainedSelect } from "../../app/common/ContainedSelect";

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
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);

  const [sortCriteria, setSortCriteria] = useState("بیشترین اختلال");
  const [provinceData, setProvinceData] = useState(ProvincesCompare);
  const [selectedProvince, setSelectedProvince] = useState("انتخاب کنید");
  const theme = useTheme();
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
  const StyledFormControl = styled(FormControl)(({ theme }) => ({
    "& .css-1uk43v8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ":
      {
        padding: "5px 14px;",
      },
  }));
  const NewCard = styled(Box)(({ theme }) => ({
    maxHeight: "54em",
    overflowY: "auto",
    backgroundColor: "#121212",
    boxShadow: "none",
    borderRadius: "0.75rem",

    // For WebKit browsers (like Chrome and Safari) to hide scrollbar
    "&::-webkit-scrollbar": {
      display: "none",
    },

    // For Firefox to hide scrollbar
    "& scrollbarWidth": "none",
  }));
  return (
    <NewCard
      sx={{
        backgroundColor: "transparent",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isSmScreen ? "column" : "row",
          justifyContent: isSmScreen ? "center" : "space-between",
          flexWrap: isSmScreen ? "wrap" : "none",
          marginBottom: "1.4rem",
          width: "100%",
          gap: "1rem",
          paddingLeft: isMdScreen ? "0" : "4rem",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h1"
          fontSize="1.5rem"
          fontFamily="PeydaSemiBold"
          textAlign={isSmScreen ? "center" : "left"}
        >
          رتبه بندی اپراتورها
        </Typography>

        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap="0.94rem"
        >
          <Typography variant="h4" sx={{ whiteSpace: "nowrap" }}>
            انتخاب استان:{" "}
          </Typography>

          <StyledFormControl sx={{ width: "11.75rem" }}>
            <ContainedSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProvince}
              onChange={handleProvinceChange}
              renderValue={(selectedValue) =>
                selectedValue ? selectedValue : "انتخاب کنید"
              }
              sx={{
                border: " 1.5px solid #F0F4F3",
                borderRadius: "1rem",
                height: "3.25rem",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#313131" : "white",
              }}
              displayEmpty
            >
              {provinceData.map((provinceItem) => (
                <MenuItem key={provinceItem.name} value={provinceItem.name}>
                  {provinceItem.name}
                </MenuItem>
              ))}
            </ContainedSelect>
          </StyledFormControl>

          <Typography variant="h4" whiteSpace={"nowrap"}>
            {" "}
            چینش براساس:
          </Typography>

          <StyledFormControl sx={{ width: "11.75rem" }}>
            <ContainedSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              sx={{
                border: " 1.5px solid #F0F4F3",
                borderRadius: "1rem",
                height: "3.25rem",
                backgroundColor:
                  theme.palette.mode === "dark" ? "#313131" : "white",
              }}
              displayEmpty
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
            </ContainedSelect>
          </StyledFormControl>
        </Box>

        <Typography variant="h4" whiteSpace={"nowrap"}>
          {" "}
          خروجی اکسل{" "}
        </Typography>
      </Box>
      <Box
        sx={{
          overflowX: isMdScreen ? "scroll" : "hidden",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          sx={{ width: isXsScreen ? "19em" : isMdScreen ? "51.5em" : "100%" }}
        >
          <ISPTable
            isDetail={true}
            ISPdata={sortedISPData.slice(0, visibleRows)}
          />
        </Box>
      </Box>
    </NewCard>
  );
};

export default ISPPerformance;
