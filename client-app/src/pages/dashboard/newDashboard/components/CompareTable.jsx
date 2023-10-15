import {Box, Button, Typography, useTheme} from "@mui/material";
import leftArrow from "../../../../app/assets/image/leftArrow.svg";
import {Link} from "react-router-dom";
import {useState} from "react";
import {useMediaQuery} from "@mui/material";
import Table from "./Table";
import ViewDetailsButton from "../../../../app/common/ViewDetailsButton";

/**
 * Raw data for the ISPs for comparison.
 * @type {Array<{ rank: string, ISPname: string, disturbance: string, pings: string, speed: string }>}
 */
const RawISPData = [
  {
    rank: "#1",
    ISPname: "زیتل",
    disturbance: "1",
    pings: "49",
    speed: "28",
    performance: 83,
    province: "تهران",
  },
  {
    rank: "#2",
    ISPname: "همراه اول",
    disturbance: "3",
    pings: "51",
    speed: "23",
    performance: 81,
    province: "خراسان رضوی",
  },
  {
    rank: "#3",
    ISPname: "ایرانسل",
    disturbance: "3",
    pings: "52",
    speed: "21",
    performance: 80,
    province: "اصفهان",
  },
  {
    rank: "#4",
    ISPname: "رایتل",
    disturbance: "4",
    pings: "59",
    speed: "19",
    performance: 79,
    province: "البرز",
  },
  {
    rank: "#5",
    ISPname: "شاتل",
    disturbance: "6",
    pings: "61",
    speed: "18",
    performance: 76,
    province: "فارس",
  },
  {
    rank: "#6",
    ISPname: "مخابرات",
    disturbance: "8",
    pings: "61",
    speed: "16",
    performance: 73,
    province: "یزد",
  },
  {
    rank: "#7",
    ISPname: "آسیاتک",
    disturbance: "9",
    pings: "64",
    speed: "14",
    performance: 72,
    province: "گیلان",
  },
  {
    rank: "#8",
    ISPname: "های وب",
    disturbance: "11",
    pings: "53",
    speed: "19",
    performance: 71,
    province: "شیراز",
  },
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
 * ISPCompareTable Component - Show different ISPs based on their performance and operation .
 *
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} The rendered component.
 */
const CompareTable = ({title, showProvince}) => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [visibleRows, setVisibleRows] = useState(6);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  return (
    <Box
      sx={{
        display: "flex",
        background: theme.palette.mode === "dark" ? "#1A1A1A" : "#FFF",
        flexDirection: "column",
        justifyContent: "center",
        flex: 1,
        padding: "1.75rem",
        width: "22.5%",
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 0px 30px 0px rgba(255, 255, 255, 0.20)"
            : "0px 0px 30px 0px rgba(0, 0, 0, 0.20)",
        borderRadius: "1rem",
      }}
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
          {title}
        </Typography>
      </Box>
      <Table
        ISPdata={RawISPData.slice(0, visibleRows)}
        showProvince={showProvince}
      />
      {visibleRows < RawISPData.length && (
        <Typography
          variant="body1"
          color="text.main"
          sx={{
            textAlign: "center",
            marginY: "1rem",
            cursor: "pointer",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={handleShowMore}
        >
          مشاهده بیشتر
          <img src="/src/app/assets/image/down_arrow.svg" />
        </Typography>
      )}

      <ViewDetailsButton backgroundColor="#0C6087" target="/isp-performance" />
    </Box>
  );
};

export default CompareTable;
