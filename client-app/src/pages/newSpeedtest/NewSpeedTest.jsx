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
import iLogo from "../../app/assets/image/iLogo.svg";
import leftArrow from "../../app/assets/image/leftArrow.svg";
import upload from "../../app/assets/image/uploadIcon.svg";
import download from "../../app/assets/image/downloadIcon.svg";
import clockIcon from "../../app/assets/image/clockIcon.svg";
import DrawMeter from "./NewDrawMeter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment-jalaali";
import { convertToPersianNumbers } from "../../app/utils/convertToPersianNumbers";
import elipse from "../../app/assets/image/elipse.svg";

import { Link } from "react-router-dom";
import ShowResult from "./ShowResult";

const NewSpeedTest = () => {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down("md"));
  const isXS = useMediaQuery(theme.breakpoints.only("xs"));
  const AnimatedButton = styled(Button)(({ theme }) => ({
    position: "relative",
    overflow: "visible",
    border: "none",

    "@keyframes ringAnimation": {
      "0%": {
        transform: "scale(1)",
        opacity: 0.6,
      },
      "100%": {
        transform: "scale(1.3)",
        opacity: 0,
      },
    },
    "&:focus": {
      outline: "none", // remove the default browser focus outline
    },
    "&:hover": {
      border: "none", // you can add this if you don't want any border on hover
    },
  }));

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(true);

  const handleAlertClick = () => {
    navigate("/new");
  };

  const beforeMobileBreakpoint = useMediaQuery(theme.breakpoints.up("sm"));
  const [animationInterval, setAnimationInterval] = useState(null);

  const [isGoButtonVisible, setIsGoButtonVisible] = useState(true);

  const [expanded, setExpanded] = useState(false);
  const [speedData, setSpeedData] = useState({
    ping: null,
    downloadSpeed: null,
  });
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [testStage, setTestStage] = useState(null); // "ping", "download", "upload"

  const handleButtonClick = () => {
    setIsGoButtonVisible(false);
    setTimeout(() => {
      // After 1 second, display ping value
      setSpeedData((prev) => ({
        ...prev,
        ping: Math.floor(Math.random() * 31) + 50,
      }));
      setTestStage("download");
    }, 1000);
  };

  useEffect(() => {
    if (testStage === "download") {
      // Simulate download test
      let timeElapsed = 0;
      // Generate initial random number for download
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
            // Add a timeout here to delay the next test
            setTestStage("upload");
          }, 3000); // Delay the upload test by 3 seconds
        }
      }, 100);
      return () => clearInterval(interval);
    } else if (testStage === "upload") {
      // Simulate upload test
      let timeElapsed = 0;
      // Generate initial random number for upload
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
            upload: convertToPersianNumbers(parseFloat(
              (
                initialUpload + parseFloat((Math.random() * 4 - 2).toFixed(2))
              ).toFixed(2)
            )),
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

  const MobileIP = () => {
    return (
      <>
        <Box
          sx={{
            height: "60%",
            width: isMD ? "88%" : "73%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <Typography sx={{ color: "#676767" }} variant="h4">
                ادرس IP:
              </Typography>
              <Typography variant="h7">129.86.45.122</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#676767" }} variant="h3">
                سرور:
              </Typography>
              <Typography variant="h7">ایرانسل-تهران</Typography>
            </Box>
          </Box>
          <Box>
            <AnimatedButton
              onClick={handleButtonClick}
              // onClick={handleButtonClick}
              sx={{
                height: "clamp(10rem,10rem + 10vmin,16rem)",
                width: "clamp(10rem,10rem + 10vmin,16rem)",
                borderRadius: "50%",
                // borderWidth: "6px",
                // backgroundOrigin: "border-box",
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
            {/* <Box
              sx={{
                width: "96%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="h7">نوع تست</Typography>
              <img src={iLogo} alt="iLogo" />
            </Box> */}
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h7">برای دریافت اطلاعات بر روی </Typography>
          <Typography variant="h7">دکمه شروع کلیک کنید </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "50%",
            marginTop: "1.5em",
            alignItems: "flex-start",
            width: "80%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <img src={clockIcon} alt="clockIcon" />
            <img
              style={{
                transform: "translateX(16px)",
              }}
              src={download}
              alt="clockIcon"
            />
            <img
              style={{
                transform: "translateX(16px)",
              }}
              src={upload}
              alt="clockIcon"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="body">پینگ</Typography>
            <Typography variant="body">سرعت دانلود</Typography>{" "}
            <Typography variant="body">سرعت اپلود</Typography>{" "}
          </Box>
        </Box>{" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            height: "20%",
          }}
        ></Box>{" "}
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
          {isMD ? (
            <MobileIP />
          ) : (
            <>
              <Box
                sx={{
                  height: "60%",
                  width: isMD ? "88%" : "73%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
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
                <Box width="100%" display="flex" justifyContent="center">
                  {isGoButtonVisible ? (
                    <AnimatedButton
                      // onClick={handleButtonClick}
                      onClick={handleButtonClick}
                      sx={{
                        height: "clamp(10rem,10rem + 10vmin,16rem)",
                        width: "clamp(10rem,10rem + 10vmin,16rem)",
                        borderRadius: "50%",
                        // borderWidth: "6px",
                        // backgroundOrigin: "border-box",
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
                  {/* <Box
                    sx={{
                      width: "96%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography variant="h7">نوع تست</Typography>
                    <img src={iLogo} alt="iLogo" />
                  </Box> */}
                </Box>
              </Box>
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
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <img src={clockIcon} alt="clockIcon" />

                    <Typography variant="h6">پینگ:</Typography>
                    <Typography variant="h6">{speedData.ping}</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <img src={download} alt="clockIcon" />
                    <Typography variant="h6">سرعت دانلود:</Typography>
                    <Typography variant="h6">
                      {speedData.downloadSpeed}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <img src={upload} alt="clockIcon" />
                    <Typography variant="h6">سرعت اپلود:</Typography>
                    <Typography variant="h6">{uploadSpeed}</Typography>
                  </Box>
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
          )}
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
