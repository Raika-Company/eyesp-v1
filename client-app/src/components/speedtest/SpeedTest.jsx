import React, { useState } from "react";
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
import DrawMeter from "./DrawMeter";

import DownloadHide from "../../app/assets/image/download-hide.svg";
import UploadHide from "../../app/assets/image/upload-hide.svg";
import PingHide from "../../app/assets/image/ping-hide.svg";
import Download from "../../app/assets/image/download.svg";
import Upload from "../../app/assets/image/upload.svg";
import Ping from "../../app/assets/image/ping.svg";
import Globe from "../../app/assets/image/globe.svg";
import Person from "../../app/assets/image/person.svg";

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
    border: "6px solid rgba(54, 129, 241, 0.8)", // #70A8FC with some transparency
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

const SpeedTest = () => {
  const [isGoButtonVisible, setIsGoButtonVisible] = useState(true);

  const [pingValue, setPingValue] = useState(null);
  const [downloadSpeedValue, setDownloadSpeedValue] = useState(null);

  const handleButtonClick = () => {
    setIsGoButtonVisible(false);
    setPingValue(80);
    setDownloadSpeedValue(40.2);
  };

  return (
    <>
      <Container component="main" maxWidth="lg">
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
            value={isGoButtonVisible ? null : pingValue}
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
            value={isGoButtonVisible ? null : downloadSpeedValue}
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
            <Box marginTop="10dvh">
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
          <Box display="flex" flexDirection="row" gap={3}>
            <Box display="flex" flexDirection="column" textAlign="right">
              <Typography component="span">همراه اول</Typography>
              <Typography component="span">51.15.57.153</Typography>
            </Box>
            <img src={Person} alt="Person Icon" />
          </Box>
          <Box display="flex" flexDirection="row" gap={3}>
            <Box display="flex" flexDirection="column">
              <Typography component="h6">سرور مقصد</Typography>
              <Typography component="span">تهران - امام</Typography>
              <Button>تغییر سرور</Button>
            </Box>
            <img src={Globe} alt="Globe Icon" />
          </Box>
        </Box>
      </Container>
      <Accordion sx={{ display: { xs: "block", md: "none" } }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box display="flex" flexDirection="row" gap={3}>
            <Box display="flex" flexDirection="column" textAlign="right">
              <Typography component="span">همراه اول</Typography>
              <Typography component="span">51.15.57.153</Typography>
            </Box>
            <img src={Person} alt="Person Icon" />
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="row" gap={3}>
            <Box display="flex" flexDirection="column">
              <Typography component="h6">سرور مقصد</Typography>
              <Typography component="span">تهران - امام</Typography>
              <Button>تغییر سرور</Button>
            </Box>
            <img src={Globe} alt="Globe Icon" />
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SpeedTest;
