// React core and hooks
import React, { useState, useEffect } from "react";
// import backgroundImage from "../../app/assets/image/Img-SpeedTest/image 21.svg";
import { useMediaQuery } from "@mui/material";

// Third-party libraries or components
// Import Material-UI components and styles
import { Box, useTheme, keyframes } from "@mui/material";

// Local components
// Importing custom drawn meter component and accordion for modular structure

import PcDrawMeter from "./pcDrawMeter";
import PcSpeedBox from "./pcSpeedBox";
import PcAboutBox from "./pcAboutBox";
import PcInformationBox from "./pcInformationBox";

// Assets
// Importing images used in the speed test component
import Download from "../../app/assets/image/Img-SpeedTest/download1.svg";
import Upload from "../../app/assets/image/Img-SpeedTest/upload1.svg";
import Ping from "../../app/assets/image/Img-SpeedTest/ping1.svg";
import Globe from "../../app/assets/image/Img-SpeedTest/server.svg";
import Person from "../../app/assets/image/Img-SpeedTest/user.svg";
import tikRed from "../../app/assets/image/Img-SpeedTest/tikRed.svg";
import virasty from "../../app/assets/image/Img-SpeedTest/virasty 1.svg";
import Web from "../../app/assets/image/Img-SpeedTest/Web.svg";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const PcSpeedTest = ({ themeMode }) => {
  const theme = useTheme();
  const [mbps, setMbps] = useState(0);
  const [boxHeight, setBoxHeight] = useState("90dvh");
  const [animationInterval, setAnimationInterval] = useState(null);
  const [isStartButtonVisible, setIsStartButtonVisible] = useState(true);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [speedData, setSpeedData] = useState({
    ping: null,
    downloadSpeed: null,
  });

  const handleButtonClick = () => {
    setIsStartButtonVisible(false);
    let startTime = Date.now();
    let totalDuration = 1000; // 1 seconds
    let halfwayPoint = totalDuration / 2; // 0.5 second
    let increasing = true; // flag to determine if mbps is increasing or decreasing

    const animateMbps = () => {
      let timePassed = Date.now() - startTime;

      if (timePassed <= halfwayPoint) {
        setMbps((timePassed / halfwayPoint) * 100); // from 0 to 100 in 1 second
      } else if (timePassed <= totalDuration) {
        setMbps(100 - ((timePassed - halfwayPoint) / halfwayPoint) * 80); // from 100 to 20 in 1 second
      } else {
        // after the main animation, start the continuous change between 15 and 25
        if (!animationInterval) {
          const interval = setInterval(() => {
            setMbps((prev) => {
              if (prev >= 25) increasing = false;
              if (prev <= 15) increasing = true;

              return increasing ? prev + 1 : prev - 1;
            });
          }, 40); // adjust the time interval as needed
          setAnimationInterval(interval);
        }
      }

      if (timePassed < totalDuration) {
        requestAnimationFrame(animateMbps);
      }
    };
    requestAnimationFrame(animateMbps);
  };

  useEffect(() => {
    return () => {
      if (animationInterval) {
        clearInterval(animationInterval);
      }
    };
  }, [animationInterval]);

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
          value={null}
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
            }}
            variant="outlined"
          >
            START
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              animation: `${fadeIn} 1s ease-in-out`,
              height: "clamp(10rem,10rem + 10vmin,16rem)",
              width: "clamp(10rem,10rem + 10vmin,16rem)",
            }}
          >
            <Box
              sx={{
                zIndex: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <PcDrawMeter
                amount={0.2}
                bk={
                  /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent)
                    ? "#45628A"
                    : "#1B70EE1C"
                }
                fg={"#1B70EE1C"}
                progress={0.3}
                prog={0.3}
                mbps={mbps}
                isDl={true}
                theme={themeMode}
              />
            </Box>
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
        <PcInformationBox
          title="Scaleway"
          value="51.15.57.153"
          iconSrc={Person}
          altText="Person Icon"
        />
        <PcInformationBox
          title="KEYYO"
          value="Paris"
          iconSrc={Globe}
          altText="Server Icon"
          buttonLabel="Change Server"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-evenly",
          width: "20%",
          ml: isMdScreen ? "1.8rem" : "0",
        }}
      >
        <PcAboutBox iconSrc={virasty} />
        <PcAboutBox iconSrc={tikRed} />
        <PcAboutBox iconSrc={Web} />
      </Box>
    </Box>
  );
};

export default PcSpeedTest;
