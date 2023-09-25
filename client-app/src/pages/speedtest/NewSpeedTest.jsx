import React from "react";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import useDynamicMP from "../../app/hooks/useDynamicMP";
import CardContainer from "../../app/common/CardContainer";
import HistoryIcon from "@mui/icons-material/History";
import SwitchBtn from "../../app/common/SwitchBtn";
import StartButton from "./StartButton";

import uploadIcon from "../../app/assets/image/uploadIcon.svg";
import downloadIcon from "../../app/assets/image/downloadIcon.svg";
import pingIcon from "../../app/assets/image/clockIcon.svg";

const NewSpeedTest = () => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const pXCardContainers = useDynamicMP(390, 1440, 1.81, 4);
  const pYCardContainers = useDynamicMP(390, 1440, 1.19, 3.5);
  return (
    <CardContainer
      component="main"
      sx={{
        paddingX: pXCardContainers,
        paddingY: pYCardContainers,
        height: "calc(100dvh - 10rem)",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          fontFamily="PeydaSemibold"
          fontSize="1.5rem"
          color="#2C2C2C"
          gutterBottom
        >
          وضعیت اینترنت
        </Typography>
        <Button
          fontSize="1.25rem"
          fontFamily="PeydaRegular"
          startIcon={<HistoryIcon />}
        >
          تست های گذشته
        </Button>
      </Box>
      <Box
        display="flex"
        flexDirection={isMdScreen ? "row" : "column"}
        justifyContent="space-evenly"
        alignItems="center"
        height="100%"
      >
        <Box>
          <Typography
            color="#676767"
            fontSize="1.25rem"
            fontFamily="PeydaSemiBold"
          >
            آدرس:
            <Typography
              component="span"
              fontSize="1rem"
              fontFamily="PeydaLight"
              marginX="0.5rem"
            >
              129.86.45.122
            </Typography>
          </Typography>
          <Typography
            color="#676767"
            fontSize="1.25rem"
            fontFamily="PeydaSemiBold"
          >
            سرور:
            <Typography
              component="span"
              fontSize="1rem"
              fontFamily="PeydaLight"
              marginX="0.5rem"
            >
              تهران - زیرساخت
            </Typography>
          </Typography>
        </Box>
        <StartButton />
        <Box display="flex" flexDirection="column" alignItems="flex-end">
          <SwitchBtn textOn="تست دقیق" textOff="تست فوری" />
          <Typography marginLeft="1rem">نوع تست</Typography>
        </Box>
        <Typography sx={{ display: { md: "none" } }}>
          برای دریافت اطلاعات بر روی دکمه شروع کلیک کنید.
        </Typography>
        <Box display="flex" justifyContent="space-evenly" width="100%" sx={{display: {md: "none"}}}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={downloadIcon} alt="download" />
            <Typography
              fontSize="0.875rem"
              fontFamily="PeydaLight"
              color="#878787"
            >
              سرعت دانلود
            </Typography>
            <Typography
              fontSize="0.875rem"
              fontFamily="PeydaLight"
              color="#878787"
            >
              0
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={uploadIcon} alt="upload" />
            <Typography
              fontSize="0.875rem"
              fontFamily="PeydaLight"
              color="#878787"
            >
              سرعت آپلود
            </Typography>
            <Typography
              fontSize="0.875rem"
              fontFamily="PeydaLight"
              color="#878787"
            >
              0
            </Typography>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="center">
            <img src={pingIcon} alt="ping" />
            <Typography
              fontSize="0.875rem"
              fontFamily="PeydaLight"
              color="#878787"
            >
              پینگ
            </Typography>
            <Typography
              fontSize="0.875rem"
              fontFamily="PeydaLight"
              color="#878787"
            >
              0
            </Typography>
          </Box>
        </Box>
      </Box>
    </CardContainer>
  );
};

export default NewSpeedTest;
