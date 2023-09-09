import React from "react";
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
  styled,
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

const ISPdata = [
  createData("#1", "سامانتل", "3%", "49ms", "72Mbps"),
  createData("#2", "همراه اول", "8%", "51ms", "73Mbps"),
  createData("#3", "ایرانسل", "9%", "52ms", "68Mbps"),
  createData("#4", "رایتل", "12%", "59ms", "65Mbps"),
  createData("#5", "شاتل", "16%", "61ms", "66Mbps"),
  createData("#6", "مخابرات", "18%", "61ms", "59Mbps"),
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

  const isXlScreen = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

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

  return (
    <Container maxWidth="xl" sx={{ direction: "rtl" }}>
      <div
        style={{
          width: "100%",
          height: isMdScreen ? "" : "53vh",
          background: "#E8E8E8",
          marginTop: isMdScreen ? "1rem" : "3rem",
          marginBottom: "1.3rem",
          borderRadius: "1.875rem",
          overflow: "visible",
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
          background: "#E8E8E8",
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
            gutterBottom
            sx={{
              color: "#9B9B9B",
              fontWeight: "700",
              fontSize: isSmScreen ? "0.9rem" : "1.28rem",
            }}
          >
            براساس:{" "}
            <Button
              variant="outlined"
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                marginRight: "0.5rem",
                borderRadius: "0.5rem",
                padding: "0.6rem 1rem",
              }}
            >
              <span style={{ marginLeft: "0.4rem" }}>بیشترین اختلال</span>{" "}
            </Button>
          </Typography>
        </Box>
        <ISPTable ISPdata={ISPdata} />
      </Card>
      <Card
        sx={{
          width: "100%",
          marginInline: "auto",
          marginTop: "1.3rem",
          marginBottom: isSmScreen ? "5.1rem" : "1.3rem",

          background: "#E8E8E8",
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
              key={index} // <-- Added this key
              variant="contained"
              startIcon={<val.icon style={{ fontSize: "2rem" }} />}
              sx={{
                width: isSmScreen ? "100%" : "49%",
                borderRadius: "1rem",
                padding: "1.5rem",
                fontSize: "1.3rem",
                marginTop: "1rem",
              }}
              onClick={() => navigate("/admin/detail-test")}
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
