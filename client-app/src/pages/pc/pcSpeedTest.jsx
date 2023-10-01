/**
 * React component for the Speed Test functionality.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.themeMode - The theme mode for styling.
 * @returns {JSX.Element} - The rendered Speed Test component.
 */

// React core and hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Import Material-UI components and styles
import { useMediaQuery } from "@mui/material";
import { Box, useTheme } from "@mui/material";

import moment from "moment-jalaali";

// Local components
import PcAboutBox from "./pcAboutBox";
import PcSpeedBox from "./pcSpeedBox";
import PcDrawMeter from "./pcDrawMeter";
import PcInformationBox from "./pcInformationBox";

// Assets
import Download from "../../app/assets/image/Img-SpeedTest/download1.svg";
import Upload from "../../app/assets/image/Img-SpeedTest/upload1.svg";
import Ping from "../../app/assets/image/Img-SpeedTest/ping1.svg";
import Globe from "../../app/assets/image/Img-SpeedTest/server.svg";
import Person from "../../app/assets/image/Img-SpeedTest/user.svg";
import tikRed from "../../app/assets/image/Img-SpeedTest/tikRed.svg";
import virasty from "../../app/assets/image/Img-SpeedTest/virasty 1.svg";
import Web from "../../app/assets/image/Img-SpeedTest/Web.svg";

// utils
import { convertToPersianNumbers } from "../../app/utils/convertToPersianNumbers";

/**
 * Functional component representing the PC Speed Test.
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.themeMode - The theme mode for styling.
 * @returns {JSX.Element} - The rendered Speed Test component.
 */

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

const PcSpeedTest = ({ themeMode }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isStartButtonVisible, setIsStartButtonVisible] = useState(true);
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [speedData, setSpeedData] = useState({
    ping: null,
    downloadSpeed: null,
  });
  const [isTestEnds, setIsTestEnds] = useState(false);
  const [uploadSpeed, setUploadSpeed] = useState(null);
  const [testStage, setTestStage] = useState(null); // "ping", "download", "upload"
  const [isstartagain, setIsStartAgain] = useState(true);
  const [isMeterVisible, setIsMeterVisible] = useState(true);

  /**
   * useEffect hook to update the component based on the test stage.
   * @function
   * @name useEffect
   * @param {Function} callback - The callback function to execute.
   * @param {Array} dependencies - The dependencies to watch for changes.
   * @returns {void}
   */
  useEffect(() => {
    if (testStage === "download") {
    } else if (testStage === "upload") {
      setIsMeterVisible(false);
    }
  }, [testStage]);

  useEffect(() => {
    if (testStage === "upload" && isTestEnds) {
      setIsTestEnds(true);
    }
  }, [testStage, isTestEnds]);

  /**
   * useEffect hook to handle button click and start the test.
   * @function
   * @name handleButtonClick
   * @returns {void}
   */

  const handleButtonClick = () => {
    localStorage.removeItem("testResults");

    setIsStartButtonVisible(false);
    setIsMeterVisible(true);
    setIsStartAgain(false);
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

          const testResults = {
            date: currentJalaliDateInFarsi, // Store the current Jalali date with Farsi numbers
            ping: speedData.ping,
            download: speedData.downloadSpeed,
            upload: parseFloat(
              (
                initialUpload + parseFloat((Math.random() * 4 - 2).toFixed(2))
              ).toFixed(2)
            ),
            providerLocation: "Paris-Irancell",
          };

          const existingResults = JSON.parse(
            localStorage.getItem("testResults") || "[]"
          );
          existingResults.push(testResults);
          localStorage.setItem("testResults", JSON.stringify(existingResults));
          setIsTestEnds(true);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [testStage]);

  /**
   * useEffect hook to calculate box height based on navbar height.
   * @function
   * @name useEffect
   * @param {Function} callback - The callback function to execute.
   * @param {Array} dependencies - The dependencies to watch for changes.
   * @returns {void}
   */
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
            value={isStartButtonVisible ? null : uploadSpeed}
            measure="Mbps"
            opacity={isStartButtonVisible ? "0.2" : "1"}
          />

          <PcSpeedBox
            title="DOWNLOAD"
            iconSrc={Download}
            altText="before download icon"
            value={isStartButtonVisible ? null : speedData.downloadSpeed}
            measure="Mbps"
            opacity={isStartButtonVisible ? "0.2" : "1"}
          />
          <PcSpeedBox
            title="PING"
            iconSrc={Ping}
            altText="ping icon"
            value={isStartButtonVisible ? null : speedData.ping}
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
            <Box
              onClick={handleButtonClick}
              sx={{
                height: "clamp(15rem,10rem + 10vmin,16rem)",
                width: "clamp(15rem,10rem + 10vmin,16rem)",
                borderRadius: "50%",
                border: "7.429px solid #FA5356",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                fontSize: "2.3rem",
                fontWeight: "400",
                lineHeight: "normal",
                fontStyle: "normal",
                paddingTop: "5.8rem",
                color: "#FFF",
                textAlign: "center",
                cursor: "pointer",
                userSelect: "none",
              }}
              variant="outlined"
            >
              START
            </Box>
          ) : isMeterVisible ? (
            <Box
              sx={{
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
                amount={0.2} // This can be adjusted or removed based on the functionality of DrawMeter
                bk={
                  /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent)
                    ? "#45628A"
                    : "#1B70EE1C"
                }
                fg={"#1B70EE1C"}
                progress={0.3}
                prog={0.3} // Adjust this if it's being used differently than 'progress'
                mbps={
                  testStage === "download"
                    ? speedData.downloadSpeed
                    : uploadSpeed
                }
                isDl={true}
                theme={themeMode}
              />
            </Box>
          ) : (
            <Box
              onClick={() => {
                setIsStartButtonVisible(true);
                setIsMeterVisible(false);
                setIsStartAgain(true);
                setIsTestEnds(false);
                setTestStage(null);
              }}
              sx={{
                height: "clamp(15rem,10rem + 10vmin,16rem)",
                width: "clamp(15rem,10rem + 10vmin,16rem)",
                borderRadius: "50%",
                border: "7.429px solid #FA5356",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                fontSize: "2.3rem",
                fontWeight: "400",
                lineHeight: "normal",
                fontStyle: "normal",
                paddingTop: "5.8rem",
                color: "#FFF",
                textAlign: "center",
                cursor: "pointer",
                userSelect: "none",
              }}
              variant="outlined"
            >
              Test Again
            </Box>
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
            width: isSmScreen ? "45%" : isMdScreen ? "25%" : "12rem",
            ml: isMdScreen ? "1.1rem" : "1.1rem",
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

export default PcSpeedTest;
