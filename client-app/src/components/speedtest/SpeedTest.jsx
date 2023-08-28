// React core and hooks
import React, { useState } from "react";

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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";

// Local components
// Importing custom drawn meter component and accordion for modular structure
import DrawMeter from "./DrawMeter";
import CustomAccordion from './CustomAccordion';

// Assets
// Importing images used in the speed test component
import DownloadHide from "../../app/assets/image/download-hide.svg";
import UploadHide from "../../app/assets/image/upload-hide.svg";
import PingHide from "../../app/assets/image/ping-hide.svg";
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
const SpeedBox = ({ title, iconSrc, altText, value }) => (
  <Box>
    <Typography>{title}</Typography>
    <Box display="flex" alignItems="center" gap={1}>
      <img src={iconSrc} alt={altText} />
      <Typography component="span" marginX="0.5rem">
        {value !== null ? value : "--"}
      </Typography>
      <Typography component="span">Mbps</Typography>
    </Box>
  </Box>
);

// AnimatedButton is a button with animation effect used for starting the speed test
const AnimatedButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  marginTop: "15dvh",
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
      <Typography component="span">{title}</Typography>
      <Typography component="span">{value}</Typography>
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
const SpeedTest = () => {
  const [isGoButtonVisible, setIsGoButtonVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const [speedData, setSpeedData] = useState({
    ping: null,
    downloadSpeed: null,
  });

  const handleButtonClick = () => {
    setIsGoButtonVisible(false);
    setSpeedData({
      ping: 80,
      downloadSpeed: 40.2,
    });
  };

  return (
    <Box component="main" height="100dvh">
      <Container maxWidth="lg">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          height="8vh"
          alignItems="center"
          textAlign="center"
          sx={{
            borderRadius: "1.2rem",
            border: "1.468px solid rgba(0, 0, 0, 0.10)",
            display: { xs: "none", md: "flex" },
          }}
          marginTop="10vh"
        >
          <SpeedBox
            title="پینگ"
            iconSrc={PingHide}
            altText="ping icon"
            value={isGoButtonVisible ? null : speedData.ping}
          />
          <Divider />
          <SpeedBox
            title="سرعت آپلود"
            iconSrc={UploadHide}
            altText="before upload icon"
            value={null}
          />
          <Divider />
          <SpeedBox
            title="سرعت دانلود"
            iconSrc={DownloadHide}
            altText="before download icon"
            value={isGoButtonVisible ? null : speedData.downloadSpeed}
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
                height: "16rem",
                width: "16rem",
                borderRadius: "50%",
                borderColor: "transparent",
                borderWidth: "6px",
                borderStyle: "solid",
                backgroundImage:
                  "linear-gradient(white, white), linear-gradient(to left, #70A8FC, #3681F1)",
                backgroundOrigin: "border-box",
                backgroundClip: "padding-box, border-box",
                boxShadow: "inset 0 0 0 4px transparent, 0 0 0 4px transparent",
                fontSize: "4rem",
                fontWeight: "400",
                lineHeight: "normal",
                fontStyle: "normal",
              }}
              variant="outlined"
            >
              GO
            </AnimatedButton>
          ) : (
            <Box marginTop="10dvh" width="100%">
              <DrawMeter
                amount={0.2}
                bk={
                  /Trident.*rv:(\d+\.\d+)/i.test(navigator.userAgent)
                    ? "#1B70EE1C"
                    : "#1B70EE1C"
                }
                fg={"#1B70EE1C"}
                progress={0.3}
                prog={0.3}
                mbps={20}
                isDl={true}
              />
            </Box>
          )}
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={10}
          marginY="10dvh"
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
      </Container>
      <CustomAccordion expanded={expanded} setExpanded={setExpanded} Person={Person} Globe={Globe} />
    </Box>
  );
};

export default SpeedTest;
