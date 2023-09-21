import React, { useEffect, useState } from "react";
import CardContainer from "../../app/common/CardContainer";
import {
  Box,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import ISPTable from "./ISPTable";
import ViewDetailsButton from "../../app/common/ViewDetailsButton";

const createData = (rank, ISPname, disturbance, pings, speed, desc) => {
  return { rank, ISPname, disturbance, pings, speed, desc };
};

const RawISPData = [
  createData("1", "زیتل", "1", "49", "28"),
  createData("2", "همراه اول", "3", "51", "23"),
  createData("3", "ایرانسل", "3", "52", "21"),
  createData("4", "رایتل", "4", "59", "19"),
  createData("5", "شاتل", "6", "61", "18"),
  createData("6", "مخابرات", "8", "61", "16"),
  createData("7", "آسیاتک", "9", "64", "14"),
  createData("8", "های وب", "11", "53", "19"),
];

const selectionItems = [
  "نام ISP",
  "بیشترین اختلال",
  "کمترین اختلال",
  "بیشترین میانگین پینگ",
  "کمترین میانگین پینگ",
  "بیشترین میانگین سرعت",
  "کمترین میانگین سرعت",
];

const parseNumber = (str) => {
  return parseFloat(str.replace(/[^0-9.]/g, ""));
};

const sortFunctions = {
  "نام ISP": (a, b) => a.ISPname.localeCompare(b.ISPname),
  "بیشترین اختلال": (a, b) =>
    parseNumber(b.disturbance) - parseNumber(a.disturbance),
  "کمترین اختلال": (a, b) =>
    parseNumber(a.disturbance) - parseNumber(b.disturbance),
  "بیشترین میانگین پینگ": (a, b) => parseNumber(b.pings) - parseNumber(a.pings),
  "کمترین میانگین پینگ": (a, b) => parseNumber(a.pings) - parseNumber(b.pings),
  "بیشترین میانگین سرعت": (a, b) => parseNumber(b.speed) - parseNumber(a.speed),
  "کمترین میانگین سرعت": (a, b) => parseNumber(a.speed) - parseNumber(b.speed),
};

const ISPCompareTable = ({ mpCardContainers }) => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [sortCriteria, setSortCriteria] = useState("بیشترین اختلال");

  const [ISPData, setISPData] = useState(RawISPData);

  const [visibleRows, setVisibleRows] = useState(6);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  useEffect(() => {
    const sortFunction = sortFunctions[sortCriteria];
    if (sortFunction) {
      setISPData([...ISPData].sort(sortFunction));
    }
  }, [sortCriteria]);

  return (
    <CardContainer
      sx={{ flex: 1, paddingX: mpCardContainers, paddingY: "1.75rem" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: isSmScreen ? "center" : "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography
          color="#2C2C2C"
          fontSize="1.5rem"
          fontFamily="PeydaSemiBold"
        >
          رتبه بندی ISPها
        </Typography>
        <ViewDetailsButton target="/isp-performance" />
      </Box>
      <ISPTable ISPdata={ISPData.slice(0, visibleRows)} />
      {visibleRows < RawISPData.length && (
        <Typography
          variant="body1"
          sx={{
            color: "textColor.main",
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
      <Select
        value={sortCriteria}
        onChange={(e) => setSortCriteria(e.target.value)}
        variant="outlined"
        color="primary"
        sx={{
          marginRight: "0.5rem",
          color: "#676767",
          borderRadius: "1.25rem",
          float: "left"
        }}
      >
        {selectionItems.map((item) => (
          <MenuItem key={item} sx={{ color: "textColor.light" }} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </CardContainer>
  );
};

export default ISPCompareTable;