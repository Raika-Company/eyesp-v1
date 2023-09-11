import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import IranMap from "./map/IranMap";
import ISPTable from "./ISPTable";

import {
  Container,
  Typography,
  Box,
  useMediaQuery,
  Card,
  Button,
  Select,
  MenuItem,
  useTheme,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import WifiIcon from "@mui/icons-material/Wifi";
import AirplayIcon from "@mui/icons-material/Airplay";
import SpeedIcon from "@mui/icons-material/Speed";

const createData = (rank, ISPname, disturbance, pings, speed, desc) => {
  return { rank, ISPname, disturbance, pings, speed, desc };
};

const RawISPData = [
  createData("#1", "زیتل", "1%", "49ms", "28Mbps"),
  createData("#2", "همراه اول", "3%", "51ms", "23Mbps"),
  createData("#3", "ایرانسل", "3%", "52ms", "21Mbps"),
  createData("#4", "رایتل", "4%", "59ms", "19Mbps"),
  createData("#5", "شاتل", "6%", "61ms", "18Mbps"),
  createData("#6", "مخابرات", "8%", "61ms", "16Mbps"),
  createData("#7", "آسیاتک", "9%", "64ms", "14Mbps"),
  createData("#8", "های وب", "11%", "53ms", "19Mbps"),
];

const GpButtons = [
  {
    name: "پینگ",
    icon: WifiIcon,
  },
  {
    name: "اختلال",
    icon: WifiOffIcon,
  },
  {
    name: "سرعت",
    icon: SpeedIcon,
  },
  {
    name: "پکت لاس",
    icon: AirplayIcon,
  },
];

const disturbances = [
  "اختلال در مازندران",
  "کندی سرعت",
  "اختلال در خراسان رضوی",
  "افزایش jitter",
  "اختلال در فارس",
  "کند شدن سرعت",
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleButtonClick = (name) => {
    let switchName;
    switch (name) {
      case "پینگ":
        switchName = "pingAverage";
        break;
      case "اختلال":
        switchName = "performanceAverage";
        break;
      case "سرعت":
        switchName = "speedAverage";
        break;
      case "پکت لاس":
        switchName = "packetLossAverage";
        break;
      default:
        switchName = null;
    }
    navigate(`/admin/detail-test?active=${switchName}`);
  };
  const theme = useTheme();

  const isXlScreen = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const [sortCriteria, setSortCriteria] = useState("بیشترین اختلال");

  const [ISPData, setISPData] = useState(RawISPData);

  const [visibleRows, setVisibleRows] = useState(6);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  useEffect(() => {
    let sortedData;
    switch (sortCriteria) {
      case "نام ISP":
        sortedData = [...ISPData].sort((a, b) =>
          a.ISPname.localeCompare(b.ISPname)
        );
        break;
      case "بیشترین اختلال":
        sortedData = [...ISPData].sort(
          (a, b) => parseFloat(b.disturbance) - parseFloat(a.disturbance)
        );
        break;
      case "کمترین اختلال":
        sortedData = [...ISPData].sort(
          (a, b) => parseFloat(a.disturbance) - parseFloat(b.disturbance)
        );
        break;
      case "بیشترین میانگین پینگ":
        sortedData = [...ISPData].sort((a, b) =>
          b.pings.localeCompare(a.pings)
        );
        break;
      case "کمترین میانگین پینگ":
        sortedData = [...ISPData].sort((a, b) =>
          a.pings.localeCompare(b.pings)
        );
        break;
      case "بیشترین میانگین سرعت":
        sortedData = [...ISPData].sort((a, b) =>
          b.speed.localeCompare(a.speed)
        );
        break;
      case "کمترین میانگین سرعت":
        sortedData = [...ISPData].sort((a, b) =>
          a.speed.localeCompare(b.speed)
        );
        break;
    }
    setISPData(sortedData);
  }, [sortCriteria]);

  const DisturbanceText = ({ text }) => (
    <Typography
      sx={{
        fontSize: isSmScreen ? "1rem" : "1.5rem",
        flexWrap: "600",
        color: "#9B9B9B",
      }}
    >
      ● {text}
    </Typography>
  );

  const backgroundColor =
    theme.palette.mode === "light" ? "#E8E8E8" : "#171717";
  return (
    <Container maxWidth="xl" sx={{ direction: "rtl" }}>
      <div
        style={{
          width: "100%",
          height: isMdScreen ? "" : "53vh",
          marginTop: isMdScreen ? "1rem" : "3rem",
          marginBottom: "1.3rem",
          borderRadius: "1.875rem",
          overflow: "visible",
          backgroundColor: backgroundColor,
        }}
      >
        <Box
          sx={{
            float: "left",
            width: isMdScreen ? "100%" : "45%",
            marginTop: isMdScreen ? "0" : "12vh",
            padding: isMdScreen ? "1em" : "0",
            marginInline: "0.8%",
          }}
        >
          <IranMap />
        </Box>
        <div
          style={{
            width: isMdScreen ? "100%" : "45%",
            float: "left",
            fontSize: "10px",
            padding: "1.5em 2.2em",
          }}
        >
          <Typography
            sx={{
              color: "#EE0B0B",
              fontSize: isSmScreen ? "1.8rem" : "2.5rem",
              fontWeight: "700",
            }}
          >
            <span style={{ fontSize: "4rem" }}>4</span> اختلال یافت شده:
          </Typography>
          {disturbances.map((disturbance) => (
            <DisturbanceText text={disturbance} key={disturbance} />
          ))}
        </div>

        <div style={{ clear: "both" }}></div>
      </div>

      <Card
        sx={{
          width: "100%",
          marginInline: "auto",
          padding: "0 2.5rem",
          paddingTop: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: isSmScreen ? "center" : "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography
            gutterBottom
            sx={{
              color: "#126AED",
              fontWeight: "700",
              fontSize: isSmScreen ? "1.5rem" : "2rem",
            }}
          >
            رتبه بندی ISPها{" "}
          </Typography>
          <Typography
            component="div"
            gutterBottom
            sx={{
              color: "#9B9B9B",
              fontWeight: "700",
              fontSize: isSmScreen ? "0.9rem" : "1.28rem",
            }}
          >
            براساس:{" "}
            <Select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              variant="outlined"
              color="primary"
              sx={{ marginRight: "0.5rem" }}
            >
              <MenuItem value="نام ISP">نام ISP</MenuItem>
              <MenuItem value="بیشترین اختلال">بیشترین اختلال</MenuItem>
              <MenuItem value="کمترین اختلال">کمترین اختلال</MenuItem>
              <MenuItem value="بیشترین میانگین پینگ">
                بیشترین میانگین پینگ
              </MenuItem>
              <MenuItem value="کمترین میانگین پینگ">
                کمترین میانگین پینگ
              </MenuItem>
              <MenuItem value="بیشترین میانگین سرعت">
                بیشترین میانگین سرعت
              </MenuItem>
              <MenuItem value="کمترین میانگین سرعت">
                کمترین میانگین سرعت
              </MenuItem>
            </Select>
          </Typography>
        </Box>
        <ISPTable ISPdata={ISPData.slice(0, visibleRows)} />
        {visibleRows < RawISPData.length && (
          <Box
            sx={{
              color: "#9B9B9B",
              textAlign: "center",
              marginY: "1rem",
              cursor: "pointer",
              width: "100%",
            }}
            onClick={handleShowMore}
          >
            -- مشاهده بیشتر --
          </Box>
        )}
      </Card>
      <Card
        sx={{
          width: "100%",
          marginInline: "auto",
          marginTop: "1.3rem",
          marginBottom: isSmScreen ? "5.1rem" : "1.3rem",
          padding: "1rem 2.5rem",
        }}
      >
        <Typography textAlign="center" color="#9B9B9B" fontWeight="600">
          جزئیات فنی
        </Typography>

        <Box
          sx={{
            height: isSmScreen ? "" : "28dvh",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {GpButtons.map((val, index) => (
            <Button
              key={index}
              variant="contained"
              startIcon={<val.icon style={{ fontSize: "2rem" }} />}
              sx={{
                width: isSmScreen ? "100%" : "49%",
                borderRadius: "1rem",
                padding: "1.5rem",
                fontSize: "1.3rem",
                marginTop: "1rem",
              }}
              onClick={() => handleButtonClick(val.name)}
            >
              <span style={{ marginLeft: "0.4rem", marginRight: "1rem" }}>
                {val.name}
              </span>
            </Button>
          ))}
        </Box>
      </Card>
    </Container>
  );
};

export default Dashboard;
