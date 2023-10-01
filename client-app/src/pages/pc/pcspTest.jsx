import React from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  keyframes,
  Button,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";

import { STATUS_MAP } from "../speedtest/constant";

import io from "socket.io-client";
import axios from "axios";
import { convertToPersianNumbers } from "../../app/utils/convertToPersianNumbers";

// Assets
import Download from "../../app/assets/image/Img-SpeedTest/download1.svg";
import Upload from "../../app/assets/image/Img-SpeedTest/upload1.svg";
import Ping from "../../app/assets/image/Img-SpeedTest/ping1.svg";
import Globe from "../../app/assets/image/Img-SpeedTest/server.svg";
import Person from "../../app/assets/image/Img-SpeedTest/user.svg";
import tikRed from "../../app/assets/image/Img-SpeedTest/tikRed.svg";
import virasty from "../../app/assets/image/Img-SpeedTest/virasty 1.svg";
import Web from "../../app/assets/image/Img-SpeedTest/Web.svg";

import PcSpeedBox from "./pcSpeedBox";
import PcDrawMeter from "./pcDrawMeter";
import PcAboutBox from "./pcAboutBox";
import PcInformationBox from "./pcInformationBox";
import { Link } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const InfoBoxData = [
  {
    title: "Scaleway",
    value: "51.15.57.153",
    iconSrc: Person,
    altText: "Person Icon",
  },
  {
    title: "KEYYO",
    value: "Paris",
    iconSrc: Globe,
    altText: "Server Icon",
    buttonLabel: "Change Server",
  },
];

const PcspTest = () => {
  const theme = useTheme();
  const [isMeterVisible, setIsMeterVisible] = useState(true);
  const [isStartButtonVisible, setIsStartButtonVisible] = useState(true);
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [status, setStatus] = useState(2);
  const [isTestEnds, setIsTestEnds] = useState(false);
  const [socket, setSocket] = useState(null);
  const [latency, setLatency] = useState(0);
  const [download, setDownload] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [upload, setUpload] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [testStateNumber, setTestStateNumber] = useState(0);
  const [isDl, setIsDl] = useState(true);
  const [clientIp, setClientIp] = useState("");
  const [selectedServerURL, setSelectedServerURL] = useState(
    "https://server1.eyesp.live/"
  );

  useEffect(() => {
    axios
      .get("https://server1.eyesp.live/get-ip")
      .then((res) => setClientIp(res.data.ip))
      .catch((error) => console.error("Error fetching client IP:", error));
  }, []);

  const PING_TIMES = 10;

  useEffect(() => {
    const s = socket || io(selectedServerURL);
    setSocket(s);
    return () => s.disconnect();
  }, [selectedServerURL]);

  useEffect(() => {
    if (!socket) return;
    let pingCount = 0,
      minLatency = Infinity;
    socket.on("pong_event", async (timestamp) => {
      const currentLatency = performance.now() - timestamp;
      minLatency = Math.min(minLatency, currentLatency);
      pingCount++;
      if (pingCount === PING_TIMES) {
        setLatency(minLatency.toFixed(2));
      } else {
        socket.emit("ping_event", performance.now());
      }
    });
  }, [socket]);

  const startPingTest = () =>
    socket && socket.emit("ping_event", performance.now());

  const handleButtonClick = () => {
    setIsStartButtonVisible(false);
    startPingTest();
    handleStart();
  };

  let flag = true;

  const handleStart = () => {
    if (window.speedtest.getState() === STATUS_MAP.RUNNING) {
    } else {
      window.speedtest.onupdate = (data) => {
        const {
          dlProgress,
          dlStatus,
          ulProgress,
          ulStatus,
          pingStatus,
          jitterStatus,
          testState,
        } = data;
        setTestStateNumber(testState);
        if (isDl && flag) {
          setDownload(dlStatus);
          setDownloadProgress(dlProgress);
          if (dlProgress == 1) {
            setIsDl(false);
            flag = false;
          }
        }

        if (!isDl || dlProgress == 1) {
          setUpload(ulStatus);
          setUploadProgress(ulProgress);
        }

        if (dlProgress == 1 && ulProgress == 1) {
          setIsMeterVisible(false);
          const currentJalaliDateInEnglish = moment().format("jYYYY/jM/jD");
          const currentJalaliDateInFarsi = convertToPersianNumbers(
            currentJalaliDateInEnglish
          );

          const getCurrentTime = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, "0");
            const minutes = now.getMinutes().toString().padStart(2, "0");
            const seconds = now.getSeconds().toString().padStart(2, "0");

            return `${hours}:${minutes}:${seconds}`;
          };

          const testResults = {
            date: currentJalaliDateInFarsi,
            time: convertToPersianNumbers(getCurrentTime()),
            ping: convertToPersianNumbers(latency),
            download: convertToPersianNumbers(dlStatus),
            testDuration: convertToPersianNumbers("00:16"),
            upload: convertToPersianNumbers(ulStatus),
            server: "Paris-KEYYO",
            ip: clientIp,
          };
          const existingResults = JSON.parse(
            localStorage.getItem("testResults") || "[]"
          );
          existingResults.push(testResults);
          localStorage.setItem("testResults", JSON.stringify(existingResults));

          setIsTestEnds(true);
        }
      };
      window.speedtest.onend = () => {
        setStatus(STATUS_MAP.READY);
      };
      setStatus(STATUS_MAP.RUNNING);
      window.speedtest.start();
    }
  };

  const [boxHeight, setBoxHeight] = useState("90dvh");
  useEffect(() => {
    const navbarElement = document.querySelector(".nav-height");

    if (navbarElement) {
      const navbarHeight = navbarElement.offsetHeight;
      setBoxHeight(`calc(98dvh - ${navbarHeight}px)`);
    } else {
      setBoxHeight("98dvh");
    }
  }, []);

  return (
    <>
      <Box
        component="main"
        height={boxHeight}
        sx={{
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundPosition: "left bottom",
          [theme.breakpoints.between("xs", "sm")]: {
            backgroundSize: "contain",
          },
          [theme.breakpoints.up("md")]: {
            backgroundSize: "40%",
          },
        }}
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        alignItems="stretch"
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          height="clamp(5rem,5rem + 3vmin, 3rem)"
          width="75%"
          marginX="auto"
          alignItems="center"
          textAlign="center"
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <PcSpeedBox
            title="UPLOAD"
            iconSrc={Upload}
            altText="before upload icon"
            value={isStartButtonVisible ? null : upload}
            measure="Mbps"
            opacity={isStartButtonVisible ? "0.2" : "1"}
          />

          <PcSpeedBox
            title="DOWNLOAD"
            iconSrc={Download}
            altText="before download icon"
            value={isStartButtonVisible ? null : download}
            measure="Mbps"
            opacity={isStartButtonVisible ? "0.2" : "1"}
          />
          <PcSpeedBox
            title="PING"
            iconSrc={Ping}
            altText="ping icon"
            value={isStartButtonVisible ? null : latency}
            measure="ms"
            opacity={isStartButtonVisible ? "0.2" : "1"}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isStartButtonVisible ? (
            <Button
              onClick={handleButtonClick}
              sx={{
                height: "clamp(15rem,10rem + 10vmin,16rem)",
                width: "clamp(15rem,10rem + 10vmin,16rem)",
                borderRadius: "50%",
                border: "7.429px solid #FA5356",
                paddingTop: "1.8rem",
                color: "#FFF",
                textAlign: "center",
                cursor: "pointer",
                userSelect: "none",
                ":hover": {
                  backgroundColor: "transparent",
                  border: "7.429px solid #FA5356",
                },
              }}
            >
              <Typography variant="text" sx={{ fontSize: "2.8rem" }}>
                START
              </Typography>
            </Button>
          ) : isMeterVisible ? (
            <Box
              sx={{
                animation: `${fadeIn} 1s ease-in-out`,
                [theme.breakpoints.between("xs", "sm")]: {
                  width: "100%",
                },
                [theme.breakpoints.up("md")]: {
                  width: "80%",
                },
                height: "clamp(10rem,10rem + 10vmin,16rem)",
                width: "clamp(10rem,10rem + 10vmin,16rem)",
              }}
            >
              <PcDrawMeter
                bk={
                  /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent)
                    ? "#45628A"
                    : "#1B70EE1C"
                }
                fg={"#1B70EE1C"}
                progress={isDl ? downloadProgress : uploadProgress}
                mbps={isDl ? download : upload}
                isDl={isDl}
                testState={testStateNumber}
                theme="light"
              />
            </Box>
          ) : (
            <Button
              onClick={() => window.location.reload(true)}
              sx={{
                height: "clamp(15rem,10rem + 10vmin,16rem)",
                width: "clamp(15rem,10rem + 10vmin,16rem)",
                borderRadius: "50%",
                border: "7.429px solid #FA5356",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                fontSize: "2.3rem",
                paddingTop: "1.8rem",
                color: "#FFF",
                textAlign: "center",
                cursor: "pointer",
                userSelect: "none",
                ":hover": {
                  backgroundColor: "transparent",
                  border: "7.429px solid #FA5356",
                },
              }}
              variant="outlined"
            >
              <Typography
                variant="text"
                sx={{ fontSize: "2.3rem", textTransform: "capitalize" }}
              >
                Test Again
              </Typography>
            </Button>
          )}
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={10}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {InfoBoxData.map((items, index) => (
            <PcInformationBox
              key={index}
              title={items.title}
              value={items.value}
              iconSrc={items.iconSrc}
              altText={items.altText}
              buttonLabel={items.buttonLabel}
            />
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: isSmScreen ? "45%" : isMdScreen ? "16%" : "12%",
          }}
        >
          <PcAboutBox iconSrc={virasty} />
          <PcAboutBox iconSrc={tikRed} />
          <PcAboutBox iconSrc={Web} />
        </Box>
      </Box>
    </>
  );
};

export default PcspTest;
