import React from "react";
import {Box, Typography, useTheme} from "@mui/material";
import uploadIcon from "../../app/assets/image/uploadIcon.svg";
import downloadIcon from "../../app/assets/image/downloadIcon.svg";

const InfoSection = ({label, value}) => (
  <>
    <Typography marginTop="0.5rem" variant="h6" color="text.main">
      {label}:{" "}
      <Typography variant="body1" color="text.main" component="span">
        {value}
      </Typography>
    </Typography>
  </>
);

const ResultSection = ({icon, label, value, unit}) => (
  <Box display="flex" flexDirection="column" alignItems="center">
    <img src={icon} alt={label} />
    <Typography variant="chartTitle" color="text.textInfo">
      {value}
    </Typography>
    <Typography variant="subtitle1" color="text.chartTitleColor">
      {unit}
    </Typography>
  </Box>
);

const HistoryCard = ({
  date,
  time,
  testDuration,
  testType,
  server,
  ping,
  download,
  upload,
  ip,
}) => {
  const theme = useTheme();
  return (
    <Box
      padding="1rem"
      borderRadius="1rem"
      backgroundColor={theme.palette.mode === "dark" ? "#081C30" : "#FFF"}
      boxShadow={
        theme.palette.mode === "dark"
          ? "0px 0px 5px 0px rgba(255, 255, 255, 0.40)"
          : "0px 4px 10px 0px rgba(0, 0, 0, 0.05)"
      }
    >
      <InfoSection label="تاریخ" value={date} />
      <InfoSection label="ساعت" value={time} />
      <InfoSection label="مدت زمان تست" value={testDuration} />
      <InfoSection label="نوع تست" value={testType} />
      <InfoSection label="سرور" value={server} />
      <InfoSection label="آی پی" value={ip} />
      <Box
        paddingX="1.5rem"
        paddingY="0.6rem"
        marginTop={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="1.5rem"
        borderRadius="2rem"
        sx={{
          background:
            "radial-gradient(434.9% 131.07% at 7.52% 0%, rgba(244, 249, 255, 0.50) 0%, rgba(169, 187, 207, 0.35) 100%)",
        }}
      >
        <ResultSection
          icon={downloadIcon}
          label="دانلود"
          value={download}
          unit="mb/s"
        />
        <ResultSection
          icon={uploadIcon}
          label="آپلود"
          value={upload}
          unit="mb/s"
        />
        {/* <ResultSection icon={clockIcon} label="پینگ" value={ping} unit="(ms)" /> */}
      </Box>
    </Box>
  );
};

export default HistoryCard;
