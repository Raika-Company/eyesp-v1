import React, { useEffect, useState } from "react";
import {
  Box,
  useMediaQuery,
  useTheme,
  keyframes,
  Button,
  Typography,
} from "@mui/material";
import moment from "moment-jalaali";
import io from "socket.io-client";
import axios from "axios";

import { STATUS_MAP } from "./constant";
import { convertToPersianNumbers } from "../../app/utils/convertToPersianNumbers";
import storage from "../../app/api/storage";

// Assets
import Download from "../../app/assets/image/Img-SpeedTest/PingUp.svg";
import Upload from "../../app/assets/image/Img-SpeedTest/upload1.svg";
import Ping from "../../app/assets/image/Img-SpeedTest/DownloadUp.svg";
import PingNoColor from "../../app/assets/image/Img-SpeedTest/ping-NoColor.svg";
import downloadNoColor from "../../app/assets/image/Img-SpeedTest/download-NoColor.svg";
import uploadNoColor from "../../app/assets/image/Img-SpeedTest/upload-NoColor.svg";
import server from "../../app/assets/image/Img-SpeedTest/server.svg";
import client from "../../app/assets/image/Img-SpeedTest/user.svg";
import tikRed from "../../app/assets/image/Img-SpeedTest/tikRed.svg";
import virasty from "../../app/assets/image/Img-SpeedTest/virasty 1.svg";
import Web from "../../app/assets/image/Img-SpeedTest/Web.svg";

import PcSpeedBox from "./pcSpeedBox";
import PcDrawMeter from "./pcDrawMeter";
import PcAboutBox from "./pcAboutBox";
import PcInformationBox from "./pcInformationBox";
import PcMiniSpeedBox from "./pcMiniSpeedBox";
import useFetchServers from "../../app/hooks/useFetchServers";
import { useLocation, useNavigate, useParams } from "react-router-dom";

/**
 * A keyframes animation for fading in elements.
 * @type {Object}
 */

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

/**
 * PcspTest component is the main component for the speed test functionality.
 * It includes various sub-components like PcSpeedBox, PcDrawMeter, PcAboutBox, and PcInformationBox.
 * @returns {JSX.Element} - The rendered PcspTest component.
 */

const PcspTest = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { startAgain } = useParams();
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const [testAgain, setTestAgain] = useState(storage.get("testAgain", true));
  const [isMeterVisible, setIsMeterVisible] = useState(true);
  const [isStartButtonVisible, setIsStartButtonVisible] = useState(true);
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
    testAgain ? storage.get("selectedServer", true) : ""
  );
  const { isFetchingServers, selectBestServer } = useFetchServers();
  const [isServerSelected, setIsServerSelected] = useState(
    testAgain ? true : false
  );

  const getValue = () => {
    if (isStartButtonVisible) return null;
    return isDl ? download : upload;
  };

  useEffect(() => {
    axios
      .get("https://server1.eyesp.live/get-ip")
      .then((res) => setClientIp(res.data.ip));
    // .catch((error) => console.error("Error fetching client IP:", error));
  }, []);

  useEffect(() => {
    if (selectedServerURL) {
      setIsServerSelected(true);
    }
  }, [selectedServerURL]);

  useEffect(() => {
    if (selectedServerURL) return;

    if (!isFetchingServers) {
      selectBestServer().then((url) => {
        if (url) {
          setSelectedServerURL(url);
        }
      });
    }
  }, [isFetchingServers, selectBestServer, selectedServerURL]);

  const PING_TIMES = 10;

  useEffect(() => {
    if (selectedServerURL === "") {
      return;
    }
    const s = socket || io(selectedServerURL);
    setSocket(s);

    s.on("connect", () => {
      console.log("Socket connected");
    });

    s.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => s.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServerURL]);

  useEffect(() => {
    if (!socket || !isServerSelected) return;
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
  }, [socket, isServerSelected]);

  const startPingTest = () => {
    if (!isServerSelected) return;
    socket.emit("ping_event", performance.now());
  };

  const handleButtonClick = () => {
    if (!isServerSelected || !socket) return;
    setIsStartButtonVisible(false);
    startPingTest();
    handleStart();
  };

  useEffect(() => {
    if (!testAgain) return;
    handleButtonClick();
    storage.set("testAgain", false, true);

    const timer = setTimeout(() => {
      setTestAgain(false);
    }, 2000);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testAgain, isServerSelected, socket]);

  let flag = true;

  const handleStart = () => {
    /**
     * Handles the start of the speed test when the button is clicked.
     */
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

  console.log(testAgain);
  return (
    <Box
      component="main"
      height="100dvh"
      display="flex"
      flexDirection="column"
      justifyContent="space-evenly"
      alignItems="center"
      dir="ltr"
      bgcolor="#232323"
      p="1rem"
    >
      <Box
        sx={{
          display: "flex",
          minWidth: "360px",
          flexWrap: "wrap",
          textAlign: "center",
          justifyContent: "center",
          gap: isSmScreen
            ? "3rem"
            : isMdScreen
            ? "4rem"
            : isLgScreen
            ? "8rem"
            : "3rem",
        }}
      >
        <PcSpeedBox
          title="UPLOAD"
          iconSrc={isStartButtonVisible ? uploadNoColor : Upload}
          altText="before upload icon"
          value={isStartButtonVisible ? null : upload}
          measure="Mbps"
        />

        <PcSpeedBox
          title="DOWNLOAD"
          iconSrc={isStartButtonVisible ? downloadNoColor : Download}
          altText="before download icon"
          value={isStartButtonVisible ? null : download}
          measure="Mbps"
        />
        <PcSpeedBox
          title="PING"
          iconSrc={isStartButtonVisible ? PingNoColor : Ping}
          altText="ping icon"
          value={isStartButtonVisible ? null : latency}
          measure="ms"
          isFull={isSmScreen ? true : false}
        />
      </Box>
      <Box
        sx={{
          width: "100%",
          // height: "clamp(17.6rem,17.6rem + 3vmin, 3rem)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isStartButtonVisible && !testAgain ? (
          <Button
            onClick={handleButtonClick}
            sx={{
              height: "clamp(15.5rem,18rem + 10vmin,15rem)",
              width: "clamp(15.5rem,18rem + 10vmin,15rem)",
              border: "5.529px solid transparent",

              background:
                "linear-gradient(#232323, #232323) padding-box, linear-gradient(to right, rgba(186, 10, 10, 1), rgba(250, 83, 86, 1)) border-box",

              padding: "5px",
              transition: "background .25s",
              borderRadius: "50em",
              paddingTop: "1.8rem",
              color: "#FFF",
              textAlign: "center",
              cursor: "pointer",
              userSelect: "none",
              position: "relative",
              zIndex: "10",
              "&:hover": {
                background:
                  "linear-gradient(#232323bb, #232323cc) padding-box, linear-gradient(to right, rgba(186, 10, 10, 1), rgba(250, 83, 86, 1)) border-box ",
              },
            }}
          >
            <Typography variant="text" sx={{ fontSize: "2.8rem" }}>
              START
            </Typography>
          </Button>
        ) : isMeterVisible || testAgain ? (
          <Box
            sx={{
              position: "relative",
              animation: `${fadeIn} 1s ease-in-out`,
              height: "clamp(9rem,9rem + 10vmin,16rem)",
              width: "clamp(21rem,21rem + 10vmin,16rem)",
            }}
          >
            <PcDrawMeter
              bk={
                /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent)
                  ? isDl
                    ? "rgba(250, 113, 116, .1)"
                    : "#45628A"
                  : isDl
                  ? "rgba(250, 113, 116, .1)"
                  : "#1B70EE1C"
              }
              fg={"#1B70EE1C"}
              progress={isDl ? downloadProgress : uploadProgress}
              mbps={isDl ? download : upload}
              isDl={isDl}
              testState={testStateNumber}
              theme="light"
            />
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-evenly"
              height="clamp(2rem,2rem + 3vmin, 3rem)"
              width="100%"
              marginX="auto"
              alignItems="center"
              textAlign="center"
              sx={{
                display: {
                  xs: "none",
                  sm: "flex",
                  position: "absolute",
                  bottom: "-30px",
                },
              }}
            >
              <PcMiniSpeedBox
                iconSrc={isDl ? Download : Upload}
                altText="before upload icon"
                value={getValue()}
                measure="Mbps"
                opacity={isStartButtonVisible ? "0.2" : "1"}
              />
            </Box>
          </Box>
        ) : (
          <Button
            onClick={() => {
              storage.set("testAgain", true, true);
              storage.set("selectedServer", selectedServerURL, true);
              navigate(0);
            }}
            sx={{
              height: "clamp(15.5rem,20rem + 10vmin,16rem)",
              width: "clamp(15.5rem,20rem + 10vmin,16rem)",
              border: "5.529px solid transparent",

              background:
                " linear-gradient(#232323, #232323) padding-box, linear-gradient(to right, rgba(186, 10, 10, 1), rgba(250, 83, 86, 1)) border-box",
              borderRadius: "50em",
              paddingTop: "1.8rem",
              color: "#FFF",
              textAlign: "center",
              cursor: "pointer",
              userSelect: "none",
              ":hover": {
                border: "5.529px solid transparent",
                background:
                  " linear-gradient(#232323, #232323) padding-box, linear-gradient(to right, rgba(186, 10, 10, 1), rgba(250, 83, 86, 1)) border-box",
                borderRadius: "50em",
              },
            }}
          >
            <Typography
              variant="text"
              sx={{ fontSize: "2.6rem", textTransform: "capitalize" }}
            >
              Test Again
            </Typography>
          </Button>
        )}
      </Box>
      <Box alignItems="center" justifyContent="center" gap={7} display="flex">
        <PcInformationBox
          title="Tehran"
          value={clientIp === "" ? "Finding IP..." : clientIp}
          iconSrc={client}
          altText="client information"
        />
        <PcInformationBox
          title={selectedServerURL === "" ? "Finding Server..." : "Tehran"}
          value={
            selectedServerURL === "" ? "Finding Server..." : "infrastructure"
          }
          iconSrc={server}
          altText="server information"
          buttonLabel={
            isStartButtonVisible || isTestEnds ? "Change Server" : null
          }
        />
      </Box>
    </Box>
  );
};

export default PcspTest;
