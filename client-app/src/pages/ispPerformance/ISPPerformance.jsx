import {useState, useMemo, useEffect} from "react";
import {
  Box,
  MenuItem,
  Typography,
  useMediaQuery,
  styled,
  FormControl,
  useTheme,
} from "@mui/material";
import ISPTable from "../../app/common/ISPTable";
import ProvincesCompare from "./../../../public/data/ProvincesCompare.json";
import {ContainedSelect} from "../../app/common/ContainedSelect";
import services from "../../app/api/index";
import convertToPersian from "../../app/utils/convertToPersian";

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

  const [sortCriteria, setSortCriteria] = useState("بیشترین اختلال");
  const [provinceData, setProvinceData] = useState(ProvincesCompare);
  const [selectedProvince, setSelectedProvince] = useState("همه استان‌ها");
  const theme = useTheme();

  const handleProvinceChange = (e) => {
    setSelectedProvince((prevState) => e.target.value);
  };

  const StyledFormControl = styled(FormControl)(({theme}) => ({
    "& .css-1uk43v8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ":
      {
        padding: "5px 14px;",
      },
  }));

  const NewCard = styled(Box)(({theme}) => ({
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

  // Getting the data for chart
  const [chartData, setChartData] = useState(null);
  const sortFunctions = useMemo(
    () => ({
      "نام ISP": (a, b) =>
        convertToPersian(a).localeCompare(convertToPersian(b)),
      "بیشترین اختلال": (a, b) =>
        (chartData.isp[b]?.disturbance || 0) -
        (chartData.isp[a]?.disturbance || 0),
      "کمترین اختلال": (a, b) =>
        (chartData.isp[a]?.disturbance || 0) -
        (chartData.isp[b]?.disturbance || 0),
      "بیشترین میانگین پینگ": (a, b) =>
        chartData.isp[b].pingAverage - chartData.isp[a].pingAverage,
      "کمترین میانگین پینگ": (a, b) =>
        chartData.isp[a].pingAverage - chartData.isp[b].pingAverage,
      "بیشترین میانگین سرعت": (a, b) =>
        chartData.isp[b].downloadSpeedAverage -
        chartData.isp[a].downloadSpeedAverage,
      "کمترین میانگین سرعت": (a, b) =>
        chartData.isp[a].downloadSpeedAverage -
        chartData.isp[b].downloadSpeedAverage,
    }),
    [chartData]
  );
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    services.dashboard.getIspMetrics().then((response) => {
      setChartData(response.data.data);
      setLoading(false);
    });
  }, []);

  const [sortedKeys, setSortedKeys] = useState([]);
  useEffect(() => {
    if (!chartData) return;
    const sortFunction = sortFunctions[sortCriteria];
    setSortedKeys(Object.keys(chartData.isp).sort(sortFunction));
  }, [chartData, sortCriteria, sortFunctions]);

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
          whiteSpace="nowrap"
        >
          رتبه بندی اپراتورها
        </Typography>

        <Box
          display={"flex"}
          width="100%"
          justifyContent={"space-between"}
          alignItems={"center"}
          gap="0.94rem"
        >
          <StyledFormControl sx={{width: "11.75rem", marginLeft: "auto"}}>
            <ContainedSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedProvince}
              onChange={handleProvinceChange}
              renderValue={(selectedValue) =>
                selectedValue ? selectedValue : "همه استان‌ها"
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

          <Typography variant="h4" whiteSpace={"nowrap"} marginRight="auto">
            {" "}
            چینش براساس:
          </Typography>

          <StyledFormControl sx={{width: "11.75rem"}}>
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
                  sx={{color: "textColor.light"}}
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
        {!loading && chartData && (
          <Box
            sx={{width: isXsScreen ? "19em" : isMdScreen ? "51.5em" : "100%"}}
          >
            <ISPTable ISPData={chartData} sortedKeys={sortedKeys} />
          </Box>
        )}
      </Box>
    </NewCard>
  );
};

export default ISPPerformance;
