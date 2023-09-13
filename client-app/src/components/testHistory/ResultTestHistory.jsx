import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import download from "../../app/assets/image/download.svg";
import upload from "../../app/assets/image/upload.svg";
import ping from "../../app/assets/image/ping.svg";

function ResultTestHistory() {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const getImageWidth = () => (isSmScreen ? "0.8rem" : "2rem");

  const getFlexStyles = (idx) => {
    const basisValues = [
      "20%", // For "تاریخ"
      "20%", // For "اپراتور-سرور"
      "20%", // For "دانلود"
      "20%", // For "آپلود"
      "20%", // For "پینگ"
    ];
    return {
      flexGrow: 0,
      flexShrink: 0,
      flexBasis: basisValues[idx],
    };
  };

  const storedResults = JSON.parse(localStorage.getItem("testResults") || "[]");

  const elements = storedResults.map((result, index) => (
    <Box
      key={index}
      display="flex"
      flexDirection="row-reverse"
      justifyContent="center"
      paddingBottom={isSmScreen ? "1em" : "1.5em"}
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
          variant="body2"
          key={idx}
          sx={{
            ...getFlexStyles(idx),
            color:
              idx === 2
                ? "#EF676B"
                : idx === 3
                ? "#126AED"
                : idx === 4
                ? "#DB7F12"
                : undefined,
            textAlign: "center",
          }}
        >
          {text}
        </Typography>
      ))}
    </Box>
  ));

  const headers = [
    { label: "تاریخ" },
    { label: "اپراتور-سرور" },
    { label: "دانلود", image: download },
    { label: "آپلود", image: upload },
    { label: "پینگ", image: ping },
  ];

  return (
    <Box
      width="90vw"
      border="2px solid #E0E0E0"
      borderRadius="2em"
      marginX="auto"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      gap="24px"
      overflow="hidden"
    >
      <Box
        width="100%"
        display="flex"
        flexDirection="row-reverse"
        justifyContent="center"
        alignItems="stretch"
        paddingY="1em"
        borderBottom="2px solid #E0E0E0"
      >
        {headers.map(({ label, image }, idx) => (
          <Box
            key={label}
            display="flex"
            justifyContent="center"
            {...getFlexStyles(idx)}
            gap={isSmScreen ? "0.3rem" : "0.5rem"}
          >
            {image && (
              <img style={{ width: getImageWidth() }} src={image} alt={label} />
            )}
            <Typography variant="body2">{label}</Typography>
          </Box>
        ))}
      </Box>
      <Box
        maxHeight="30vh"
        borderbottomleftradius="2em"
        borderbottomrightradius="2em"
        display="flex"
        flexDirection="column"
        overflow="auto"
        marginBottom="2em"
        width="100%"
      >
        {elements}
      </Box>
    </Box>
  );
}
export default ResultTestHistory;
