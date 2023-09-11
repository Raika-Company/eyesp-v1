import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import download from "../../app/assets/image/download.svg";
import upload from "../../app/assets/image/upload.svg";
import ping from "../../app/assets/image/ping.svg";

function ResultTestHistory() {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const getTypographyStyles = () => ({
    fontSize: isSmScreen ? "10px" : isMdScreen ? "14px" : "18px",
  });

  const getImageWidth = () => (isSmScreen ? "1em" : isMdScreen ? "1.5em" : "2em");

  const storedResults = JSON.parse(localStorage.getItem("testResults") || "[]");

  const elements = storedResults.map((result, index) => (
    <Box
      key={index}
      display="flex"
      paddingBottom="2em"
      flexGrow={1}
      width="100%"
    >
      {[
        result.date,
        result.providerLocation,
        `${result.download}Mbps`,
        `${result.upload}Mbps`,
        `${result.ping}ms`,
      ].map((text, idx) => (
        <Typography
          key={idx}
          sx={{
            ...getTypographyStyles(),
            color: idx === 2 ? "#EF676B" : idx === 3 ? "#126AED" : idx === 4 ? "#DB7F12" : undefined,
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          {text}
        </Typography>
      ))}
    </Box>
  ));

  const headers = [
    { label: "پینگ", image: ping, isImageFirst: false },
    { label: "آپلود", image: upload },
    { label: "دانلود", image: download },
    { label: "اپراتور-سرور" },
    { label: "تاریخ" },
  ];

  return (
    <Box sx={{
      width: "90vw",
      border: "2px solid #E0E0E0",
      borderRadius: "2em",
      marginX: "auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: "24px",
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "stretch",
        paddingY: "1em",
        borderBottom: "2px solid #E0E0E0",
      }}>
        {headers.map(({ label, image, isImageFirst = true }) => (
          <Box key={label} display= "flex" justifyContent= "center" flexGrow={1} gap="0.5em">
            {!isImageFirst && <Typography sx={getTypographyStyles()}>{label}</Typography>}
            {image && <img style={{ width: getImageWidth() }} src={image} alt={label} />}
            {isImageFirst && <Typography sx={getTypographyStyles()}>{label}</Typography>}
          </Box>
        ))}
      </Box>
      <Box sx={{
        height: "30vh",
        borderBottomLeftRadius: "2em",
        borderBottomRightRadius: "2em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflowY: "auto",
        marginBottom: "2em",
        direction: "rtl",
      }}>
        {elements}
      </Box>
    </Box>
  );
}
export default ResultTestHistory;