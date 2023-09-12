import { useState, useEffect } from "react";
import IranMap from "./map/IranMap";
import ISPTable from "./ISPTable";
import { Link } from "react-router-dom";
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
import ChartDetail from "../detailTest/ChartDetail";

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
    stateVar: "pingAverage",
  },
  {
    name: "اختلال",
    icon: WifiOffIcon,
    stateVar: "/admin/province-isp"
  },
  {
    name: "سرعت",
    icon: SpeedIcon,
    stateVar: "speedAverage",
  },
  {
    name: "پکت لاس",
    icon: AirplayIcon,
    stateVar: "packetLossAverage",
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
  const theme = useTheme();

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
      variant="h3"
      sx={{
        flexWrap: "600",
        color: "textColor.main",
      }}
    >
      ● {text}
    </Typography>
  );

  const backgroundColor =
    theme.palette.mode === "light" ? "#E8E8E8" : "#13171C";
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
            variant="h1"
            sx={{
              color: "error.main",
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
            variant="h1"
            gutterBottom
            sx={{
              color: "info.main",
            }}
          >
            رتبه بندی ISPها{" "}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            gutterBottom
            sx={{
              color: "textColor.main",
              fontWeight: "700",
              fontSize: isSmScreen ? "0.9rem" : "overline",
            }}
          >
            براساس:{" "}
            <Select
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
              variant="outlined"
              color="primary"
              sx={{ marginRight: "0.5rem", color: "info.main" }}
            >
              <MenuItem sx={{ color: "textColor.light" }} value="نام ISP">
                نام ISP
              </MenuItem>
              <MenuItem
                sx={{ color: "textColor.light" }}
                value="بیشترین اختلال"
              >
                بیشترین اختلال
              </MenuItem>
              <MenuItem sx={{ color: "textColor.light" }} value="کمترین اختلال">
                کمترین اختلال
              </MenuItem>
              <MenuItem
                sx={{ color: "textColor.light" }}
                value="بیشترین میانگین پینگ"
              >
                بیشترین میانگین پینگ
              </MenuItem>
              <MenuItem
                sx={{ color: "textColor.light" }}
                value="کمترین میانگین پینگ"
              >
                کمترین میانگین پینگ
              </MenuItem>
              <MenuItem
                sx={{ color: "textColor.light" }}
                value="بیشترین میانگین سرعت"
              >
                بیشترین میانگین سرعت
              </MenuItem>
              <MenuItem
                sx={{ color: "textColor.light" }}
                value="کمترین میانگین سرعت"
              >
                کمترین میانگین سرعت
              </MenuItem>
            </Select>
          </Typography>
        </Box>
        <ISPTable ISPdata={ISPData.slice(0, visibleRows)} />
        {visibleRows < RawISPData.length && (
          <Typography
            variant="h3"
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
        <Typography textAlign="center" color="textColor.main" variant="h3">
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
              component={Link}
              to={val.stateVar.startsWith("/")
              ? val.stateVar
              : `/admin/detail-test/${val.stateVar}`}
              key={index}
              variant="contained"
              startIcon={
                <val.icon
                  sx={{ fontSize: "2rem", backgroundColor: "primary.main" }}
                />
              }
              sx={{
                width: isSmScreen ? "100%" : "49%",
                borderRadius: "1rem",
                padding: "1.5rem",
                fontSize: "1.3rem",
                marginTop: "1rem",
              }}
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
