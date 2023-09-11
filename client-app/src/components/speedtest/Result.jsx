import { Box, Button, Typography } from "@mui/material";

import Download from "../../app/assets/image/download.svg";
import Upload from "../../app/assets/image/upload.svg";
import Ping from "../../app/assets/image/ping.svg";
import Globe from "../../app/assets/image/globe.svg";
import Person from "../../app/assets/image/person.svg";

import CustomAccordion from "./CustomAccordion";
import { useState } from "react";

const SpeedBox = ({ title, iconSrc, altText, value, measure, opacity }) => (
  <Box>
    <Typography
      variant="h4"
      sx={{ color: "textColor.dark", opacity: 0.3, }}
    >
      {title}
    </Typography>
    <Box display="flex" alignItems="center" gap={1} sx={{ opacity: opacity }}>
      <Typography variant="h2" sx={{ color: "textColor.dark" }}>
        {measure}
      </Typography>
      <Typography variant="h2" marginX="1rem" sx={{ color: "textColor.dark" }}>
        {value !== null ? value : "--"}
      </Typography>
      <img src={iconSrc} alt={altText} height="32px" />
    </Box>
  </Box>
);

const InformationBox = ({ title, value, iconSrc, altText, buttonLabel }) => (
  <Box display="flex" flexDirection="row" gap={3}>
    <Box display="flex" flexDirection="column" textAlign="right">
      <Typography component="h6" variant="h3" color="textColor.dark">
        {title}
      </Typography>
      <Typography component="span" variant="h2" color="textColor.light">
        {value}
      </Typography>
      {buttonLabel ? <Button>{buttonLabel}</Button> : null}
    </Box>
    <img src={iconSrc} alt={altText} />
  </Box>
);

const Result = ({ ping, download, upload }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        padding="2rem"
        width="80%"
        marginTop="25dvh"
        marginX="auto"
        alignItems="center"
        textAlign="center"
        gap={10}
        sx={{
          borderRadius: "1.2rem",
          border: "1.468px solid rgba(0, 0, 0, 0.10)",
          background: "transparent",
          display: { xs: "none", md: "flex" },
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-evenly"
          width="100%"
        >
          <SpeedBox
            title="پینگ"
            iconSrc={Ping}
            altText="ping icon"
            value={ping}
            measure="ms"
            opacity={1}
          />
          <SpeedBox
            title="سرعت آپلود"
            iconSrc={Upload}
            altText="ping icon"
            value={upload}
            measure="Mbps"
            opacity={1}
          />
          <SpeedBox
            title="سرعت دانلود"
            iconSrc={Download}
            altText="ping icon"
            value={download}
            measure="Mbps"
            opacity={1}
          />
        </Box>
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={10}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <InformationBox
            title="سرور مقصد"
            value="تهران - امام"
            iconSrc={Globe}
            altText="Globe Icon"
          />
          <InformationBox
            title="همراه اول"
            value="51.15.57.153"
            iconSrc={Person}
            altText="Person Icon"
          />
        </Box>

        <Box display="flex" gap={4}>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "info.main",
              color: "white",
              fontSize: "1.8rem",
              borderRadius: "1.625rem",
              border: 0,
              width: "20rem",
            }}
          >
            تست مجدد
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "secondary.main",
              color: "white",
              fontSize: "1.8rem",
              borderRadius: "1.625rem",
              border: 0,
              width: "16rem",
            }}
          >
            اشتراک گذاری
          </Button>
        </Box>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        padding="1rem"
        width="80%"
        height="60dvh"
        marginTop="10dvh"
        marginX="auto"
        alignItems="center"
        textAlign="center"
        sx={{
          borderRadius: "1.2rem",
          border: "1.468px solid rgba(0, 0, 0, 0.10)",
          background: "transparent",
          display: { xs: "flex", md: "none" },
        }}
      >
        <SpeedBox
          title="پینگ"
          iconSrc={Ping}
          altText="ping icon"
          value={ping}
          measure="ms"
          opacity={1}
        />
        <SpeedBox
          title="سرعت آپلود"
          iconSrc={Upload}
          altText="ping icon"
          value={upload}
          measure="Mbps"
          opacity={1}
        />
        <SpeedBox
          title="سرعت دانلود"
          iconSrc={Download}
          altText="ping icon"
          value={download}
          measure="Mbps"
          opacity={1}
        />
        <Box display="flex" flexDirection="column" gap={4} marginTop="1rem">
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "info.main",
              color: "white",
              fontSize: "1.8rem",
              borderRadius: "1.625rem",
              border: 0,
            }}
          >
            تست مجدد
          </Button>
          <Button
            variant="outlined"
            sx={{
              backgroundColor: "secondary.main",
              color: "white",
              fontSize: "1.8rem",
              borderRadius: "1.625rem",
              border: 0,
            }}
          >
            اشتراک گذاری
          </Button>
        </Box>
      </Box>
      <CustomAccordion
        expanded={expanded}
        setExpanded={setExpanded}
        Person={Person}
        Globe={Globe}
      />
    </>
  );
};
export default Result;
