import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  keyframes,
} from "@mui/material";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { convertToPersianNumbers } from "../../app/utils/convertToPersianNumbers";
import elipse from "../../app/assets/image/elipse.svg";

import ShowResult from "./ShowResult";
import { STATUS_MAP } from "./constant";

import io from "socket.io-client";
import CardContainer from "../../app/common/CardContainer";
import useDynamicMP from "../../app/hooks/useDynamicMP";
import useFetchServers from "../../app/utils/useFetchServers";
import HistoryIcon from "@mui/icons-material/History";
import SwitchBtn from "../../app/common/SwitchBtn";
import FloatingResult from "./FloatingResult";
import DrawMeterAnimate from "./DrawMeterAnimate";
import axios from "axios";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const mbpsToAmount = (s) => {
  return 1 - 1 / Math.pow(1.3, Math.sqrt(s));
};

const AddressAndServer = () => (
  <Box>
    {["آدرس", "سرور"].map((text, index) => (
      <Typography
        key={index}
        color="#676767"
        fontSize="1.25rem"
        fontFamily="PeydaSemiBold"
      >
        {text}:
        <Typography
          component="span"
          fontSize="1rem"
          fontFamily="PeydaLight"
          marginX="0.5rem"
        >
          {text === "آدرس" ? "129.86.45.122" : "تهران - زیرساخت"}
        </Typography>
      </Typography>
    ))}
  </Box>
);

const SpeedTest = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const pXCardContainers = useDynamicMP(390, 1440, 1.81, 4);
  const pYCardContainers = useDynamicMP(390, 1440, 1.19, 3.5);
  const [status, setStatus] = useState(2);
  const [openDialog, setOpenDialog] = useState(false);
  const [isGoButtonVisible, setIsGoButtonVisible] = useState(true);
  const [socket, setSocket] = useState(null);
  const [latency, setLatency] = useState(0);
  const [download, setDownload] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [upload, setUpload] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [testStateNumber, setTestStateNumber] = useState(0)
  const [isDl, setIsDl] = useState(true);
  const [clientIp, setClientIp] = useState("");
  const { isFetchingServers, selectBestServer } = useFetchServers();
  const [selectedServerURL, setSelectedServerURL] = useState("https://server1.eyesp.live/");

  useEffect(() => {
    axios.get("https://server1.eyesp.live/get-ip")
      .then((res) => setClientIp(res.data.ip))
      .catch((error) => console.error("Error fetching client IP:", error));
  }, []);

  // useEffect(() => {
  //   if (selectedServerURL) return;

  //   if (!isFetchingServers) {
  //     selectBestServer().then(url => {
  //       if (url) {
  //         setSelectedServerURL(url);
  //       }
  //     });
  //   }
  // }, [isFetchingServers, selectBestServer, selectedServerURL]);

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
    setIsGoButtonVisible(false);
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
          testState
        } = data;
        setTestStateNumber(testState)
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
            testType: "دقیق",
            upload: convertToPersianNumbers(ulStatus),
            server: "ایرانسل-تهران",
            ip: clientIp,
          };
          const existingResults = JSON.parse(
            localStorage.getItem("testResults") || "[]"
          );
          existingResults.push(testResults);
          localStorage.setItem("testResults", JSON.stringify(existingResults));
          setIsGoButtonVisible(true);
          setOpenDialog(true);
        }
      };
      window.speedtest.onend = () => {
        setStatus(STATUS_MAP.READY);
      };
      setStatus(STATUS_MAP.RUNNING);
      window.speedtest.start();
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <CardContainer
        component="main"
        sx={{
          paddingX: pXCardContainers,
          paddingY: pYCardContainers,
          height: isMdScreen ? "calc(90vh - 10rem)" : "calc(100vh - 10rem)",
          position: "relative",
          overflow: "visible",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography
            variant="h1"
            color="#2C2C2C"
            gutterBottom
          >
            وضعیت اینترنت
          </Typography>
          <Button
            fontSize="1.25rem"
            fontFamily="PeydaRegular"
            startIcon={<HistoryIcon />}
          >
            تست های گذشته
          </Button>
        </Box>
        <Box
          display="flex"
          flexDirection={isMdScreen ? "row" : "column"}
          justifyContent="space-evenly"
          alignItems="center"
          height="100%"
        >
          <AddressAndServer />
          <Box
            width={isMdScreen ? "25vmin" : "55vmin"}
            height={isMdScreen ? "25vmin" : "55vmin"}
          >
            {isGoButtonVisible ? (
              <Button
                onClick={handleButtonClick}
                sx={{
                  boxShadow: `
            inset 0 0 20px #9DB8C8,  /* inner shadow */
            0px 4px 59px 0px rgba(0, 163, 255, 0.22)  /* outer shadow */
        `,
                  borderRadius: "50%",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Typography
                  color="#000"
                  fontSize="1.75rem"
                  fontFamily="PeydaRegular"
                >
                  شروع
                </Typography>
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                  animation: `${fadeIn} 1s ease-in-out`,
                  height: "100%",
                  width: "100%",
                }}
              >
                <img
                  src={elipse}
                  alt="speed-meter"
                  style={{ maxWidth: "100%", height: "100%", zIndex: 1 }}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 2,
                  }}
                >
                  <DrawMeterAnimate
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
                </div>
              </Box>
            )}
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-end">
            <SwitchBtn textOn="تست دقیق" textOff="تست فوری" />
            <Typography marginLeft="1rem">نوع تست</Typography>
          </Box>
          <FloatingResult download={download} upload={upload} latency={latency} />
        </Box>
      </CardContainer >
      <ShowResult
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
        ping={latency}
        download={download}
        upload={upload}
      />
    </>
  );
};

export default SpeedTest;
