import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NewLogo from "../../app/common/NewLogo";
import clock from "../../app/assets/image/clock.svg";
import { styled } from "@mui/material/styles";
import "./NewSpeedTest.css";
import leftArrow from "../../app/assets/image/leftArrow.svg";
import upload from "../../app/assets/image/uploadIcon.svg";
import download from "../../app/assets/image/downloadIcon.svg";
import clockIcon from "../../app/assets/image/clockIcon.svg";
import DrawMeter from "./NewDrawMeter";
import { useEffect, useState } from "react";
import moment from "moment-jalaali";
import { convertToPersianNumbers } from "../../app/utils/convertToPersianNumbers";
import elipse from "../../app/assets/image/elipse.svg";

import { Link } from "react-router-dom";
import ShowResult from "./ShowResult";

const NewSpeedTest = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isGoButtonVisible, setIsGoButtonVisible] = useState(true);
  const [speedData, setSpeedData] = useState({
    ping: null,
    downloadSpeed: null,
  });
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [testStage, setTestStage] = useState(null); // "ping", "download", "upload"
  const [boxHeight, setBoxHeight] = useState("90dvh");

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

  const handleButtonClick = () => {
    setIsGoButtonVisible(false);
    setTimeout(() => {
      setSpeedData((prev) => ({
        ...prev,
        ping: Math.floor(Math.random() * 31) + 50,
      }));
      setTestStage("download");
    }, 1000);
  };
  const boxesData = [
    { src: clockIcon, alt: "clockIcon", label: "پینگ:", value: speedData.ping },
    {
      src: download,
      alt: "download",
      label: "سرعت دانلود:",
      value: speedData.downloadSpeed,
    },
    { src: upload, alt: "upload", label: "سرعت اپلود:", value: uploadSpeed },
  ];

  useEffect(() => {
    if (testStage === "download") {
      let timeElapsed = 0;
      let initialDownload = parseFloat((Math.random() * 20 + 10).toFixed(2)); // random number between 10 and 30

      const interval = setInterval(() => {
        timeElapsed += 100;
        if (timeElapsed <= 1000) {
          setSpeedData((prev) => ({
            ...prev,
            downloadSpeed: initialDownload,
          }));
        } else if (timeElapsed > 1000 && timeElapsed <= 6000) {
          // Ensure subsequent values are within ±2 of the initial value
          let randomDifference = (Math.random() * 4 - 2).toFixed(2);
          setSpeedData((prev) => ({
            ...prev,
            downloadSpeed: parseFloat(
              (initialDownload + parseFloat(randomDifference)).toFixed(2)
            ),
          }));
        } else {
          clearInterval(interval);
          setTimeout(() => {
            setTestStage("upload");
          }, 3000); // Delay the upload test by 3 seconds
        }
      }, 100);
      return () => clearInterval(interval);
    } else if (testStage === "upload") {
      let timeElapsed = 0;
      let initialUpload = parseFloat((Math.random() * 10 + 5).toFixed(2)); // random number between 5 and 15

      const interval = setInterval(() => {
        timeElapsed += 100;
        if (timeElapsed <= 500) {
          setUploadSpeed(10 * (timeElapsed / 500));
        } else if (timeElapsed > 500 && timeElapsed <= 5500) {
          // Ensure subsequent values are within ±2 of the initial value
          let randomDifference = (Math.random() * 4 - 2).toFixed(2);
          setUploadSpeed(
            parseFloat(
              (initialUpload + parseFloat(randomDifference)).toFixed(2)
            )
          );
        } else {
          clearInterval(interval);
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
            ping: convertToPersianNumbers(speedData.ping),
            download: convertToPersianNumbers(speedData.downloadSpeed),
            testDuration: convertToPersianNumbers("00:16"),
            testType: "دقیق",
            upload: convertToPersianNumbers(
              parseFloat(
                (
                  initialUpload + parseFloat((Math.random() * 4 - 2).toFixed(2))
                ).toFixed(2)
              )
            ),
            server: "ایرانسل-تهران",
          };
          const existingResults = JSON.parse(
            localStorage.getItem("testResults") || "[]"
          );
          existingResults.push(testResults);
          localStorage.setItem("testResults", JSON.stringify(existingResults));
          setOpenDialog(true);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [testStage]);

  useEffect(() => {
    const navbarElement = document.querySelector(".nav-height");

    if (navbarElement) {
      const navbarHeight = navbarElement.offsetHeight;
      setBoxHeight(`calc(98dvh - ${navbarHeight}px)`);
    } else {
      setBoxHeight("98dvh");
    }
  }, []);

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
            <Button component={Link} to="/history" variant="text">
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
    <Container maxWidth="xl">
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <NewLogo />
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h3">ادرس IP:</Typography>
                <Typography variant="h7">129.86.45.122</Typography>
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
                    justifyContent: "center", // Centers children horizontally
                    alignItems: "center", // Centers children vertically
                    position: "relative", // Set to relative to allow absolute positioning of children

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
                      amount={0.2}
                      bk={
                        /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent)
                          ? "#45628A"
                          : "#1B70EE1C"
                      }
                      fg={"#1B70EE1C"}
                      progress={0.3}
                      prog={0.3}
                      mbps={
                        testStage === "download"
                          ? speedData.downloadSpeed
                          : uploadSpeed
                      }
                      isDl={true}
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
        ping={speedData.ping}
        download={speedData.downloadSpeed}
        upload={uploadSpeed}
      />
    </Container>
  );
};

export default NewSpeedTest;
