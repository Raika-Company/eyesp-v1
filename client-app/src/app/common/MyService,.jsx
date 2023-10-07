import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  SvgIcon,
  Typography,
  keyframes,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ContainedButton } from "./ContainedButton";
import frame from "../../app/assets/image/frame.svg";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SendReport from "./SendReport";
import CustomSnackbar from "./CustomeSnackbar";
import CardContainer from "./CardContainer";

const MyService = (props) => {
  const { qualityPercentage } = props;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fill = keyframes`
  to {
    width: ${qualityPercentage}%;
  }
`;

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
      <CardContainer
        marginY="1rem"
        paddingTop="3.5rem"
        paddingBottom="2.25rem"
        sx={{
          marginY: "1rem",
          paddingTop: "3.5rem",
          paddingBottom: "2.25rem",
          paddingX: "5%",
          flexBasis: isMdScreen ? "100%" : "49.5%",
        }}
      >
        <Typography variant="h1" color="text.textBlack" gutterBottom>
          سرویس من
        </Typography>
        <Typography variant="h2" color="text.main" gutterBottom>
          ایرانسل
        </Typography>

        <Box display="flex" flexDirection="column" marginTop="5.75rem">
          <Typography
            variant="h1"
            color="primary"
            sx={{
              marginRight: `${100 - qualityPercentage - 2.6}%`,
              opacity: visible ? 1 : 0,
              transition: "opacity 2s",
            }}
          >{`${qualityPercentage}%`}</Typography>

          <SvgIcon
            sx={{
              opacity: visible ? 1 : 0,
              transition: "opacity 2s",
              marginRight: `${100 - qualityPercentage - 1.5}%`,
              marginBottom: "0.25rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="38"
              viewBox="0 1 14 29"
              fill="none"
            >
              <path
                d="M9 0.339745L0.339744 9L9 17.6603L17.6603 9L9 0.339745ZM10.5 38L10.5 9L7.5 9L7.5 38L10.5 38Z"
                fill="#008EDD"
              />
            </svg>
          </SvgIcon>
          <Box
            position="relative"
            height="0.875rem"
            backgroundColor="#D9D9D9"
            width="100%"
            borderRadius="0.65625rem"
            sx={{ direction: "ltr" }}
          >
            <Box
              height="100%"
              width={qualityPercentage}
              backgroundColor="#008EDD"
              borderRadius="0.65625rem"
              sx={{
                animation: `${fill} 3s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
              }}
            ></Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h5" color="text.main">
            وضعیت:{" "}
            <Typography component="span" variant="h4" color="primary">
              مطلوب
            </Typography>
          </Typography>
          <Typography variant="h5" color="text.main">
            عملکرد کلی
          </Typography>
        </Box>

        {/* <img
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
          <Typography variant="h5" color="text.main">
            وضعیت:{" "}
            <Typography component="span" variant="h3" color="primary.main">
              مطلوب
            </Typography>
          </Typography>
          <Typography variant="h5" color="text.main">
            عملکرد کلی
          </Typography>
        </Box> */}
        <Typography
          variant="h3"
          color="text.main"
          marginTop="2.875rem"
          gutterBottom
        >
          اختلالات موجود (
          <Typography component="span" variant="h4" color="text.main">
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
                <Typography variant="h6" color="text.main">
                  {disorder.title}
                </Typography>
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
            txtHover="#FF8A35"
            sx={{ fontSize: "1rem" }}
            onClick={handleClickOpenDialog}
          >
            گزارش اختلال
          </ContainedButton>
          <Button
            variant="h6"
            sx={{
              color: "text.main",
              marginRight: "min(1.94rem, 2vw)",
            }}
            onClick={handleDisturbanceClick}
          >
            گزارش خطا در اطلاعات
          </Button>
        </Box>
      </CardContainer>
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
