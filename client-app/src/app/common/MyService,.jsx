import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { ContainedButton } from "./ContainedButton";
import frame from "../../app/assets/image/frame.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendReport from "./SendReport";
import CustomSnackbar from "./CustomeSnackbar";

const MyService = () => {
  const disorders = [
    {
      title: "اختلال در برقراری با سرور های خارج",
      detail:
        "توضیحات مربوط به اختلال در برقراری با سرور های خارج می تواند در این قسمت قرار گیرد. ممکن است شما بخواهید جزئیات بیشتری در مورد این اختلال، دلایل آن یا راه حل های پیشنهادی را در این قسمت ارائه دهید.",
    },
    {
      title: "کندی سرعت",
      detail:
        "توضیحات مربوط به اختلال سرعت می تواند در این قسمت قرار گیرد. ممکن است شما بخواهید جزئیات بیشتری در مورد این اختلال، دلایل آن یا راه حل های پیشنهادی را در این قسمت ارائه دهید.",
    },
    {
      title: "افزایش پینگ",
      detail:
        "توضیحات مربوط به افزایش پینگ می تواند در این قسمت قرار گیرد. ممکن است شما بخواهید جزئیات بیشتری در مورد این اختلال، دلایل آن یا راه حل های پیشنهادی را در این قسمت ارائه دهید.",
    },
  ];
  const radialBackground =
    "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)";
  const [openDialog, setOpenDialog] = useState(false);
  const [disturbance, setDisturbance] = useState(false);

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const handleDisturbanceClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDisturbance(false);
  };

  const handleDisturbanceClick = () => {
    setDisturbance(true);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Box
        component={Paper}
        elevation={8}
        marginY="1rem"
        borderRadius="2rem"
        paddingTop="3.5rem"
        paddingBottom="2.25rem"
        paddingX="5%"
        sx={{
          background: radialBackground,
          flexBasis: isMdScreen ? "100%" : "49.5%",
          boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.20)",
        }}
      >
        <Typography
          fontFamily="PeydaSemibold"
          fontSize="1.5rem"
          color="#2C2C2C"
          gutterBottom
        >
          سرویس من
        </Typography>
        <Typography
          fontFamily="PeydaLight"
          fontSize="1.5rem"
          color="#676767"
          gutterBottom
        >
          ایرانسل
        </Typography>
        <img
          src={frame}
          alt="frame"
          style={{ width: "100%", marginTop: "0.69rem" }}
        />
        <Box
          height="0.875rem"
          backgroundColor="#D9D9D9"
          width="100%"
          borderRadius="0.65625rem"
          sx={{ direction: "ltr" }}
        >
          <Box
            height="100%"
            width="58%"
            backgroundColor="#008EDD"
            borderRadius="0.65625rem"
          ></Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography
            fontSize="1rem"
            fontFamily="PeydaLight"
            sx={{ color: "#676767" }}
          >
            وضعیت:{" "}
            <Typography
              component="span"
              fontFamily="PeydaSemiBold"
              fontSize="1.5rem"
              sx={{ color: "#008EDD" }}
            >
              مطلوب
            </Typography>
          </Typography>
          <Typography
            fontSize="1rem"
            fontFamily="PeydaLight"
            sx={{ color: "#676767" }}
          >
            عملکرد کلی
          </Typography>
        </Box>
        <Typography
          fontFamily="PeydaRegular"
          fontSize="1.25rem"
          color="#676767"
          marginTop="2.875rem"
          gutterBottom
        >
          اختلالات موجود (
          <Typography
            component="span"
            fontFamily="PeydaSemiBold"
            fontSize="1.25rem"
          >
            3 مورد
          </Typography>
          )
        </Typography>
        <Box>
          {disorders.map((disorder) => (
            <Accordion
              key={disorder.title}
              sx={{
                boxShadow: 0,
                marginY: "0.5em",
                "&.MuiAccordion-root": {
                  borderRadius: "1.875rem",
                  "&:before": {
                    display: "none",
                  },
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>{disorder.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{disorder.detail}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Box marginTop="2.875rem">
          <ContainedButton
            variant="contained"
            bgColor="#FF8A35"
            bgHover="white"
            txtHover="#FF8A35"
            sx={{ fontSize: "1rem" }}
            onClick={handleClickOpenDialog}
          >
            گزارش اختلال
          </ContainedButton>
          <Button
            fontSize="1rem"
            variant="text"
            sx={{
              color: "#676767",
              fontFamily: "PeydaRegular",
              marginRight: "min(1.94rem, 2vw)",
            }}
            onClick={handleDisturbanceClick}
          >
            گزارش خطا در اطلاعات
          </Button>
        </Box>
      </Box>
      <CustomSnackbar
        open={disturbance}
        message="گزارش شما با موفقیت ارسال شد."
        severity="info"
        handleClose={handleDisturbanceClose}
      />
      <SendReport
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default MyService;
