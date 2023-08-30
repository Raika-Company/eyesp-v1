// React core and hooks
import React, { useState, useEffect } from "react";
import backgroundImage from "../../app/assets/image/back.svg";
import { useMediaQuery } from "@mui/material";

// Third-party libraries or components
// Import Material-UI components and styles
import {
  Button,
  Container,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

// Local components
// Importing custom drawn meter component and accordion for modular structure
import DrawMeter from "./DrawMeter";
import CustomAccordion from "./CustomAccordion";

// Assets
// Importing images used in the speed test component
import Download from "../../app/assets/image/download.svg";
import Upload from "../../app/assets/image/upload.svg";
import Ping from "../../app/assets/image/ping.svg";
import Globe from "../../app/assets/image/globe.svg";
import Person from "../../app/assets/image/person.svg";

// Constants
// Defining some constants for color coding
const TRANSPARENT_BLUE = "rgba(54, 129, 241, 0.8)";
const SECONDARY_BG = "#1B70EE1C";

// Components
// Divider component to visually separate sections
const Divider = () => (
  <Box
    sx={{
      width: "1px",
      height: "80%",
      background: "#000",
      opacity: "0.1",
      borderRadius: "10%",
    }}
  />
);

// SpeedBox displays speed statistics such as ping, upload, and download speeds
const SpeedBox = ({ title, iconSrc, altText, value, measure, opacity }) => (
  <Box>
    <Typography variant="subtitle2">{title}</Typography>
    <Box display="flex" alignItems="center" gap={1} sx={{ opacity: opacity }}>
      <img src={iconSrc} alt={altText} height="32px" />
      <Typography component="span" marginX="0.5rem">
        {value !== null ? value : "--"}
      </Typography>
      <Typography component="span">{measure}</Typography>
    </Box>
  </Box>
);

// AnimatedButton is a button with animation effect used for starting the speed test
const AnimatedButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-5px",
    left: "-5px",
    right: "-5px",
    bottom: "-5px",
    borderRadius: "50%",
    border: `6px solid ${TRANSPARENT_BLUE}`,
    animation: "ringAnimation 3s infinite",
    transform: "scale(1)",
    opacity: 0.6,
  },
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
}));

// InformationBox displays information about a server or user IP
const InformationBox = ({ title, value, iconSrc, altText, buttonLabel }) => (
  <Box display="flex" flexDirection="row" gap={3}>
    <Box display="flex" flexDirection="column" textAlign="right">
      <Typography component="h6" variant="h6">
        {title}
      </Typography>
      <Typography component="span" variant="subtitle1">
        {value}
      </Typography>
      {buttonLabel ? <Button>{buttonLabel}</Button> : null}
    </Box>
    <img src={iconSrc} alt={altText} />
  </Box>
);

// SpeedTest is the main component that orchestrates the layout and functionality of the speed test application
/**
 * SpeedTest Component
 *
 * This is the primary component responsible for executing and displaying the internet speed test.
 *
 * Structure:
 * - Contains state for handling visibility of the GO button, accordion expansion status, and speed data results.
 * - Provides handlers for starting the speed test and toggling the accordion expansion.
 * - Renders the various UI components for the speed test: meters, buttons, and information boxes.
 * - Relies on a series of child components for specific UI elements: DrawMeter, CustomAccordion, SpeedBox, etc.
 * - Adapts its display based on the viewport size (responsive design).
 *
 * @returns {React.Element} Rendered component
 */
const SpeedTest = ({ themeMode }) => {
  const theme = useTheme();

  const beforeMobileBreakpoint = useMediaQuery(theme.breakpoints.up("sm"));

  const [isGoButtonVisible, setIsGoButtonVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [speedData, setSpeedData] = useState({
    ping: null,
    downloadSpeed: null,
  });
  const [mbps, setMbps] = useState(0);

  const [boxHeight, setBoxHeight] = useState("90dvh");

  const handleButtonClick = () => {
    setIsGoButtonVisible(false);

    let startTime = Date.now();
    let totalDuration = 1000; // 1 seconds
    let halfwayPoint = totalDuration / 2; // 0.5 second

    const animateMbps = () => {
      let timePassed = Date.now() - startTime;

      if (timePassed <= halfwayPoint) {
        setMbps((timePassed / halfwayPoint) * 100); // from 0 to 100 in 1 second
      } else if (timePassed <= totalDuration) {
        setMbps(100 - ((timePassed - halfwayPoint) / halfwayPoint) * 80); // from 100 to 20 in 1 second
      }

      if (timePassed < totalDuration) {
        requestAnimationFrame(animateMbps);
      }
    };
    requestAnimationFrame(animateMbps);
  };

  useEffect(() => {
    const navbarElement = document.querySelector(".nav-height");

    if (navbarElement) {
      const navbarHeight = navbarElement.offsetHeight;
      setBoxHeight(`calc(100dvh - ${navbarHeight}px)`);
    } else {
      setBoxHeight("100dvh");
    }
  }, []);

  return (
    <Box
      component="main"
      height={boxHeight}
      sx={{
        backgroundImage: `url(${backgroundImage})`,
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
      justifyContent="space-around"
      alignItems="stretch"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly"
        height="clamp(5rem,5rem + 3vmin, 3rem)"
        width="65%"
        marginX="auto"
        alignItems="center"
        textAlign="center"
        sx={{
          borderRadius: "1.2rem",
          border: "1.468px solid rgba(0, 0, 0, 0.10)",
          display: { xs: "none", md: "flex" },
        }}
      >
        <SpeedBox
          title="سرعت دانلود"
          iconSrc={Download}
          altText="before download icon"
          value={isGoButtonVisible ? null : speedData.downloadSpeed}
          measure="Mbps"
          opacity={isGoButtonVisible ? "0.5" : "1"}
        />
        <Divider />
        <SpeedBox
          title="سرعت آپلود"
          iconSrc={Upload}
          altText="before upload icon"
          value={null}
          measure="Mbps"
          opacity={isGoButtonVisible ? "0.5" : "0.5"}
        />
        <Divider />
        <SpeedBox
          title="پینگ"
          iconSrc={Ping}
          altText="ping icon"
          value={isGoButtonVisible ? null : speedData.ping}
          measure="ms"
          opacity={isGoButtonVisible ? "0.5" : "1"}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {isGoButtonVisible ? (
          <AnimatedButton
            onClick={handleButtonClick}
            sx={{
              height: "clamp(10rem,10rem + 10vmin,16rem)",
              width: "clamp(10rem,10rem + 10vmin,16rem)",
              borderRadius: "50%",
              borderColor: "transparent",
              borderWidth: "6px",
              borderStyle: "solid",
              border: "3px solid rgba(54, 129, 241, 0.8)",
              backgroundOrigin: "border-box",
              backgroundClip: "padding-box, border-box",
              boxShadow: "inset 0 0 0 4px transparent, 0 0 0 4px transparent",
              fontSize: "4rem",
              fontWeight: "400",
              lineHeight: "normal",
              fontStyle: "normal",
              paddingTop: "2rem",
            }}
            variant="outlined"
          >
            GO
          </AnimatedButton>
        ) : (
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
              mbps={mbps}
              isDl={true}
              theme={themeMode}
            />
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
        <InformationBox
          title="همراه اول"
          value="51.15.57.153"
          iconSrc={Person}
          altText="Person Icon"
        />

        <InformationBox
          title="سرور مقصد"
          value="تهران - امام"
          iconSrc={Globe}
          altText="Globe Icon"
          buttonLabel="تغییر سرور"
        />
      </Box>
      <CustomAccordion
        expanded={expanded}
        setExpanded={setExpanded}
        Person={Person}
        Globe={Globe}
      />
    </Box>
  );
};

export default SpeedTest;
