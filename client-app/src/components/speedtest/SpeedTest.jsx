import React from "react";
import { Button, Container, Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

import DownloadHide from "../../app/assets/image/download-hide.svg";
import UploadHide from "../../app/assets/image/upload-hide.svg";
import PingHide from "../../app/assets/image/ping-hide.svg";
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

const SpeedBox = ({ title, iconSrc, altText }) => (
  <Box>
    <Typography>{title}</Typography>
    <Box display="flex" alignItems="center" gap={1}>
      <img src={iconSrc} alt={altText} />
      <Typography component="span" marginX="0.5rem">
        --
      </Typography>
      <Typography component="span">Mbps</Typography>
    </Box>
  </Box>
);

const AnimatedButton = styled(Button)(({ theme }) => ({
  position: "relative",
  overflow: "visible",
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-10px",
    left: "-10px",
    right: "-10px",
    bottom: "-10px",
    borderRadius: "50%",
    border: "6px solid rgba(112, 168, 252, 0.6)", // #70A8FC with some transparency
    animation: "$ringAnimation 1.5s infinite",
    transform: "scale(1)",
    opacity: 0,
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

export default function SpeedTest() {
  return (
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
        }}
        marginY="10vh"
      >
        <SpeedBox title="پینگ" iconSrc={PingHide} altText="before ping icon" />
        <Divider />
        <SpeedBox
          title="سرعت آپلود"
          iconSrc={UploadHide}
          altText="before upload icon"
        />
        <Divider />
        <SpeedBox
          title="سرعت دانلود"
          iconSrc={DownloadHide}
          altText="before download icon"
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AnimatedButton
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
      </Box>

      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center" gap={10} marginY="10dvh">
        <Box display="flex" flexDirection="row" gap={3}>
          <Box display="flex" flexDirection="column" textAlign="right">
            <Typography component="span">همراه اول</Typography>
            <Typography component="span">51.15.57.153</Typography>
          </Box>
          <img src={Person} alt="Person Icon"/>
        </Box>
        <Box display="flex" flexDirection="row" gap={3}>
          <Box display="flex" flexDirection="column">
            <Typography component="span">سرور مقصد</Typography>
            <Typography component="span">تهران - امام</Typography>
            <Button>تغییر سرور</Button>
          </Box>
          <img src={Globe} alt="Globe Icon"/>
        </Box>
      </Box>
    </Container>
  );
}

export default SpeedTest;
