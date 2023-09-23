// React core imports
import React, { useState, useEffect, useRef } from "react";

// MUI (Material-UI) core and component imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
  SvgIcon,
} from "@mui/material";

// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WestIcon from "@mui/icons-material/West";

// Local component and utility imports
import { ContainedButton } from "../../../app/common/ContainedButton";
import NewIranMap from "./../map/NewIranMap";
import NewLogo from "../../../app/common/NewLogo";

// Assets and data imports
import frame from "../../../app/assets/image/Frame.svg";
import provinces from "./../../../../public/data/provinces.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SendReport from "../../../app/common/SendReport";
import CustomSnackbar from "../../../app/common/CustomeSnackbar";
import ISPStatistics from "../ISPStatistics";
import ISPCompareTable from "../ISPCompareTable";
import useDynamicMP from "../../../app/hooks/useDynamicMP";
import CardContainer from "../../../app/common/CardContainer";

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

const NewProvince = () => {
  const navigate = useNavigate();
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const location = useLocation();
  const { provinceName, provinceQuality } = location.state;

  const [province, setProvince] = useState(provinceName);

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
  
    setProvince(selectedProvince);
  
    navigate(`/dashboard/${selectedProvince}`, {
      state: {
        provinceName: selectedProvince,
        provinceQuality: Math.floor(Math.random() * 50) + 50,
      },
    });
  };

  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);
  const paddingMainBox = useDynamicMP(390, 1440, 1.81, 4);

  const [disturbance, setDisturbance] = useState(false);

  const handleDisturbanceClick = () => {
    setDisturbance(true);
  };

  const handleDisturbanceClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDisturbance(false);
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const [fillPercentage, setFillPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const targetPercentage = provinceQuality;
  const duration = 3000;
  const startTime = useRef(Date.now());

  const cubicEaseOut = (t, b, c, d) => {
    t /= d;
    t--;
    return c * (t * t * t + 1) + b;
  };

  const updateFillPercentage = () => {
    const currentTime = Date.now() - startTime.current;
    if (currentTime >= duration) {
      clearInterval(intervalId.current);
      setIsAnimating(false);
      setFillPercentage(targetPercentage);
    } else {
      const newPercentage = cubicEaseOut(
        currentTime,
        0,
        targetPercentage,
        duration
      );
      setFillPercentage(Math.round(newPercentage));
    }
  };

  const intervalId = useRef(null);

  useEffect(() => {
    if (isAnimating) {
      intervalId.current = setInterval(updateFillPercentage, 50);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isAnimating]);

  useEffect(() => {
    setIsAnimating(true);
    setFillPercentage(0);
    startTime.current = Date.now();

  }, [provinceQuality]);

  return (
    <Box width="100%">
      <Container maxWidth="xl">
        <NewLogo />
        <CardContainer
          sx={{
            display: "flex",
            flexDirection: isMdScreen ? "row" : "column-reverse",
            marginTop: "1rem",
            paddingTop: "3.5rem",
            paddingX: paddingMainBox,
          }}
        >
          <Box flex={1}>
            <Typography
              fontFamily="PeydaSemibold"
              fontSize="1.5rem"
              color="#2C2C2C"
              gutterBottom
            >
              وضعیت اینترنت
            </Typography>
            <Typography
              fontFamily="PeydaLight"
              fontSize="1.5rem"
              color="#676767"
              gutterBottom
            >
              استان{" "}
              <Typography
                component="span"
                fontSize="1.5rem"
                fontFamily="PeydaLight"
                color="#008EDD"
              >
                {provinceName}
              </Typography>
            </Typography>
            <Box display="flex" flexDirection="column" marginTop="5.75rem">
              <Box
                position="relative"
                height="0.875rem"
                backgroundColor="#D9D9D9"
                width="100%"
                borderRadius="0.65625rem"
                sx={{ direction: "ltr" }}
              >
                <Box
                  position="absolute"
                  top="-4rem"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  transition="left 5s cubic-bezier(0.23, 1, 0.32, 1)"
                  sx={{ left: `${fillPercentage - 3}%` }}
                >
                  <Typography
                    fontSize="1.5rem"
                    fontFamily="PeydaSemiBold"
                    color="#008EDD"
                  >{`${fillPercentage}%`}</Typography>
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="38"
                      viewBox="0 0 18 38"
                      fill="none"
                    >
                      <path
                        d="M9 0.339745L0.339744 9L9 17.6603L17.6603 9L9 0.339745ZM10.5 38L10.5 9L7.5 9L7.5 38L10.5 38Z"
                        fill="#008EDD"
                      />
                    </svg>
                  </SvgIcon>
                </Box>
                <Box
                  height="100%"
                  width={`${fillPercentage}%`}
                  backgroundColor="#008EDD"
                  borderRadius="0.65625rem"
                ></Box>
              </Box>
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
                color="warning"
                variant="contained"
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
              <CustomSnackbar
                open={disturbance}
                message="گزارش شما با موفقیت ارسال شد."
                severity="info"
                handleClose={handleDisturbanceClose}
              />
            </Box>
          </Box>
          <Box flex={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
            >
              <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                gap="1rem"
              >
                <Typography>استان مورد نظر:</Typography>
                <Select
                  labelId="change-province-label"
                  id="change-province"
                  label={provinceName}
                  value={provinceName}
                  onChange={handleProvinceChange}
                  sx={{ borderRadius: "1.25rem" }}
                >
                  {provinces.map((provinceItem) => (
                    <MenuItem key={provinceItem.name} value={provinceItem.name}>
                      {provinceItem.name}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Button
                component={Link}
                to="/dashboard"
                fontSize="1rem"
                variant="text"
                sx={{ color: "#008EDD", fontFamily: "PeydaRegular" }}
                endIcon={<WestIcon />}
              >
                وضعیت کل کشور
              </Button>
            </Box>
            <NewIranMap currentProvince={provinceName} isProvince={true} />
          </Box>
        </CardContainer>
        <Box
          sx={{
            display: "flex",
            flexDirection: isMdScreen ? "row" : "column-reverse",
            marginTop: mpCardContainers,
            gap: mpCardContainers,
            marginBottom: "2rem",
          }}
        >
          <ISPStatistics mpCardContainers={mpCardContainers} />
          <ISPCompareTable mpCardContainers={mpCardContainers} />
        </Box>
        <SendReport
          openDialog={openDialog}
          handleCloseDialog={handleCloseDialog}
        />
      </Container>
    </Box>
  );
};

export default NewProvince;
