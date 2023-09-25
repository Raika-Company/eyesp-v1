import React from "react";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  keyframes,
} from "@mui/material";
import clock from "../../app/assets/image/clock.svg";
import { styled } from "@mui/material/styles";
import "./SpeedTest.css";
import leftArrow from "../../app/assets/image/leftArrow.svg";
import uploadIcon from "../../app/assets/image/uploadIcon.svg";
import downloadIcon from "../../app/assets/image/downloadIcon.svg";
import clockIcon from "../../app/assets/image/clockIcon.svg";
import DrawMeter from "./DrawMeter";
import { useEffect, useState, useRef } from "react";
import moment from "moment-jalaali";
import { convertToPersianNumbers } from "../../app/utils/convertToPersianNumbers";
import elipse from "../../app/assets/image/elipse.svg";

import { Link } from "react-router-dom";
import ShowResult from "./ShowResult";
import { STATUS_MAP } from "./constant";

import io from "socket.io-client";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SpeedTest = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isGoButtonVisible, setIsGoButtonVisible] = useState(true);
  const [speedData, setSpeedData] = useState({
    ping: null,
    downloadSpeed: null,
  });
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [testStage, setTestStage] = useState(null); // "ping", "download", "upload"

  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down("md"));
  const isXS = useMediaQuery(theme.breakpoints.only("xs"));
  const AnimatedButton = styled(Button)(({ theme }) => ({
    position: "relative",
    overflow: "visible",
    border: "none",
  }));

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [status, setStatus] = useState(2);
  const [ping, setPing] = useState("0.0");
  const [jitter, setJitter] = useState("0.0");
  const [download, setDownload] = useState(0);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [upload, setUpload] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDl, setIsDl] = useState(true);
  const [clientIp, setClientIp] = useState("");

  const [latency, setLatency] = useState(0);
  const [socket, setSocket] = useState(null);
  const [selectedServerURL, setSelectedServerURL] = useState(
    "https://server1.eyesp.live"
  );

  useEffect(() => {
    fetch("https://server1.eyesp.live/get-ip")
      .then((res) => res.json())
      .then((data) => setClientIp(data.ip))
      .catch((error) => console.error("Error fetching client IP:", error));
  }, []);

  const PING_TIMES = 10; // Number of pings

  useEffect(() => {
    if (!socket) {
      const s = io(selectedServerURL);
      setSocket(s);
    } else {
      socket.io.uri = selectedServerURL;
      socket.connect();
    }
    return () => socket && socket.disconnect();
  }, [selectedServerURL]);

  useEffect(() => {
    if (socket) {
      let pingCount = 0;
      let minLatency = Infinity;

      socket.on("pong_event", async (timestamp) => {
        const currentLatency = performance.now() - timestamp;
        minLatency = Math.min(minLatency, currentLatency);
        pingCount++;

        if (pingCount === PING_TIMES) {
          setLatency(minLatency.toFixed(2));
          // await downloadTest();
        } else {
          socket.emit("ping_event", performance.now());
        }
      });
    }
  }, [socket]);

  const startPingTest = () => {
    if (socket) {
      socket.emit("ping_event", performance.now());
    }
  };

  const mbpsToAmount = (s) => {
    return 1 - 1 / Math.pow(1.3, Math.sqrt(s));
  };

  let flag = true;

  const handleButtonClick = () => {
    setIsGoButtonVisible(false);
    startPingTest();
    handleStart();
  };

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
        } = data;
        setJitter(jitterStatus.length === 0 ? "0.0" : jitterStatus);
        setPing(pingStatus.length === 0 ? "0.0" : pingStatus);
        if (isDl && flag) {
          setDownload(dlStatus);
          console.log("dlProgress", dlProgress);
          setDownloadProgress(dlStatus);
          if (dlProgress == 1) {
            setIsDl(false);
            flag = false;
            console.log("isDl", isDl);
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

  // useEffect(() => {
  //   if (testStage === "init") {
  //     let index = 0;
  //     let increment = true; // A flag to determine whether to increment or decrement the index
  //     const interval = setInterval(() => {
  //       if (increment) {
  //         index =
  //           index < 10 ? +index + 0.125 : index < 20 ? index + 0.5 : index + 1;
  //       } else {
  //         index =
  //           index < 10 ? +index - 0.125 : index < 20 ? index - 0.5 : index - 1;
  //       }
  //       setSpeedData((prev) => ({
  //         ...prev,
  //         downloadSpeed: index,
  //       }));
  //       if (index >= 120) {
  //         increment = false;
  //       } else if (index <= 0) {
  //         increment = true;
  //       }
  //     }, 1000 / 240);
  //   } else if (testStage === "download") {
  //     let timeElapsed = 0;
  //     let initialDownload = parseFloat((Math.random() * 20 + 10).toFixed(2)); // random number between 10 and 30

  //     const interval = setInterval(() => {
  //       timeElapsed += 100;
  //       if (timeElapsed <= 1000) {
  //         setSpeedData((prev) => ({
  //           ...prev,
  //           downloadSpeed: initialDownload,
  //         }));
  //       } else if (timeElapsed > 1000 && timeElapsed <= 6000) {
  //         let randomDifference = (Math.random() * 4 - 2).toFixed(2);
  //         setSpeedData((prev) => ({
  //           ...prev,
  //           downloadSpeed: parseFloat(
  //             (initialDownload + parseFloat(randomDifference)).toFixed(2)
  //           ),
  //         }));
  //       } else {
  //         clearInterval(interval);
  //         setTimeout(() => {
  //           setTestStage("upload");
  //         }, 3000);
  //       }
  //     }, 100);
  //     return () => clearInterval(interval);
  //   } else if (testStage === "upload") {
  //     let timeElapsed = 0;
  //     let initialUpload = parseFloat((Math.random() * 10 + 5).toFixed(2));

  //     const interval = setInterval(() => {
  //       timeElapsed += 100;
  //       if (timeElapsed <= 500) {
  //         setUploadSpeed(10 * (timeElapsed / 500));
  //       } else if (timeElapsed > 500 && timeElapsed <= 5500) {
  //         let randomDifference = (Math.random() * 4 - 2).toFixed(2);
  //         setUploadSpeed(
  //           parseFloat(
  //             (initialUpload + parseFloat(randomDifference)).toFixed(2)
  //           )
  //         );
  //       } else {
  //         clearInterval(interval);
  //         const currentJalaliDateInEnglish = moment().format("jYYYY/jM/jD");
  //         const currentJalaliDateInFarsi = convertToPersianNumbers(
  //           currentJalaliDateInEnglish
  //         );

  //         const getCurrentTime = () => {
  //           const now = new Date();
  //           const hours = now.getHours().toString().padStart(2, "0");
  //           const minutes = now.getMinutes().toString().padStart(2, "0");
  //           const seconds = now.getSeconds().toString().padStart(2, "0");

  //           return `${hours}:${minutes}:${seconds}`;
  //         };

  //         const testResults = {
  //           date: currentJalaliDateInFarsi,
  //           time: convertToPersianNumbers(getCurrentTime()),
  //           ping: convertToPersianNumbers(speedData.ping),
  //           download: convertToPersianNumbers(speedData.downloadSpeed),
  //           testDuration: convertToPersianNumbers("00:16"),
  //           testType: "دقیق",
  //           upload: convertToPersianNumbers(
  //             parseFloat(
  //               (
  //                 initialUpload + parseFloat((Math.random() * 4 - 2).toFixed(2))
  //               ).toFixed(2)
  //             )
  //           ),
  //           server: "ایرانسل-تهران",
  //         };
  //         const existingResults = JSON.parse(
  //           localStorage.getItem("testResults") || "[]"
  //         );
  //         existingResults.push(testResults);
  //         localStorage.setItem("testResults", JSON.stringify(existingResults));
  //         setOpenDialog(true);
  //       }
  //     }, 100);
  //     return () => clearInterval(interval);
  //   }
  // }, [testStage]);

  const boxesData = [
    { src: clockIcon, alt: "clockIcon", label: "پینگ:", value: latency },
    {
      src: downloadIcon,
      alt: "download",
      label: "سرعت دانلود:",
      value: download,
    },
    {
      src: uploadIcon,
      alt: "upload",
      label: "سرعت اپلود:",
      value: upload,
    },
  ];

  const DesktopIP = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            position: "absolute",
            backgroundColor: "white",
            height: "30%",
            width: "70%",
            borderRadius: "2rem",
            bottom: "-80px",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              height: "40%",
              marginTop: "1.5em",
              alignItems: "flex-start",
            }}
          >
            {boxesData.map((box, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  <img src={box.src} alt={box.alt} />
                  <Typography variant="h6">{box.label}</Typography>
                  <Typography variant="h6">{box.value}</Typography>
                </Box>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "white",
              height: "20%",
            }}
          >
            <Typography variant="h7">
              برای دریافت اطلاعات بر روی دکمه شروع کلیک کنید.
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              width: "95%",
              height: "10%",
              gap: "5px",
            }}
          >
            <Button
              component={Link}
              to="/history"
              variant="text"
              sx={{ color: "#259FDA" }}
            >
              مشاهده جزوئیات
            </Button>
            <img src={leftArrow} alt="leftArrow" />
          </Box>
        </Box>
      </>
    );
  };

  const MobileIP = () => {
    return (
      <>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h7">برای دریافت اطلاعات بر روی </Typography>
          <Typography variant="h7">دکمه شروع کلیک کنید </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "50%",
            marginTop: "1.5em",
            width: "70%",
          }}
        >
          {boxesData.map((box, index) => {
            return (
              <Box
                key={index}
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                  marginTop: index === 0 ? "0.5rem" : undefined,
                }}
              >
                <img
                  src={box.src}
                  alt={box.alt}
                  style={{
                    width: (index === 1 || index === 2) && isMD && "30%",
                  }}
                />
                <Typography variant="h6">{box.label}</Typography>
                <Typography variant="h6">{box.value}</Typography>
              </Box>
            );
          })}
        </Box>
      </>
    );
  };
  return (
    <>
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: isXS ? "80%" : "72%",
            width: "100%",
            borderRadius: "2rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2em",
            gap: isXS ? "33px" : isMD ? "33px" : "0px",
          }}
        >
          <Box
            sx={{
              height: "10%",
              width: isMD ? "88%" : "80%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.5em",
              alignItems: "center",
            }}
          >
            <Typography variant={isMD ? "h4" : "h2"}>تست سرعت</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                width: isXS ? "52%" : isMD ? "40%" : "41%",
              }}
            >
              {" "}
              <img src={clock} alt="clock" />
              <Typography variant={isXS ? "body1" : isMD ? "h4" : "h2"}>
                تست های گذشته
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              height: "60%",
              width: isMD ? "88%" : "73%",
              display: "flex",
              flexDirection: isMD ? "column" : "row",
              gap: isMD ? "30px" : "1px",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                width: "23%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h3">ادرس IP:</Typography>
                <Typography variant="h7">{clientIp}</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h3">سرور:</Typography>
                <Typography variant="h7">ایرانسل-تهران</Typography>
              </Box>
            </Box>
            <Box width="66%" display="flex" justifyContent="center">
              {isGoButtonVisible ? (
                <AnimatedButton
                  onClick={handleButtonClick}
                  sx={{
                    height: "clamp(10rem,10rem + 10vmin,16rem)",
                    width: "clamp(10rem,10rem + 10vmin,16rem)",
                    borderRadius: "50%",
                    boxShadow: "inset  0px 0px 20px #9C9C9C", // Updated the color to #3686B4

                    fontSize: "2rem",
                    fontWeight: "400",
                    lineHeight: "normal",
                    fontStyle: "normal",
                    color: "black",
                  }}
                  variant="outlined"
                >
                  شروع
                </AnimatedButton>
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
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
                  <img
                    src={elipse}
                    alt="speed-meter"
                    style={{ maxWidth: "100%", height: "auto", zIndex: 1 }}
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
                    <DrawMeter
                      bk={
                        /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent)
                          ? "#45628A"
                          : "#1B70EE1C"
                      }
                      fg={"#1B70EE1C"}
                      progress={isDl ? downloadProgress : uploadProgress}
                      prog={isDl ? downloadProgress : uploadProgress}
                      mbps={isDl ? download : upload}
                      isDl={isDl}
                      theme="light"
                    />
                  </div>
                </Box>
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "12px",
              }}
              className="btn-container"
            >
              <label className="switch btn-color-mode-switch">
                <input
                  type="checkbox"
                  name="color_mode"
                  id="color_mode"
                  value="1"
                />
                <label
                  htmlFor="color_mode"
                  data-on="تست فوری"
                  data-off="تست دقیق"
                  className="btn-color-mode-switch-inner"
                ></label>
              </label>
            </Box>
          </Box>
          {isMD ? <MobileIP /> : <DesktopIP />}
        </Box>
      </Box>
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
