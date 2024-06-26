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
  MenuItem,
  SvgIcon,
  keyframes
} from "@mui/material";

// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WestIcon from "@mui/icons-material/West";

// Local component and utility imports
import { ContainedButton } from "../../../app/common/ContainedButton";
import NewIranMap from "../map/NewIranMap";
import NewLogo from "../../../app/common/NewLogo";

// Assets and data imports
import frame from "../../../app/assets/image/Frame.svg";
import provinces from "../../../../public/data/provinces.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SendReport from "../../../app/common/SendReport";
import CustomSnackbar from "../../../app/common/CustomeSnackbar";
import ISPStatistics from "../ISPStatistics";
import ISPCompareTable from "../ISPCompareTable";
import useDynamicMP from "../../../app/hooks/useDynamicMP";
import CardContainer from "../../../app/common/CardContainer";
import { ContainedSelect } from "../../../app/common/ContainedSelect";

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

const Province = () => {
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

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const fill = keyframes`
  to {
    width: ${provinceQuality}%;
  }
`;

  return (
    <Box width="100%">
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
            variant="h1"
            color="text.textBlack"
            gutterBottom
          >
            وضعیت اینترنت
          </Typography>
          <Typography
            variant="h2"
            color="text.main"
            gutterBottom
          >
            استان{" "}
            <Typography
              component="span"
              variant="h2"
              color="primary"
            >
              {provinceName}
            </Typography>
          </Typography>
          <Box display="flex" flexDirection="column" marginTop="5.75rem">
            <Typography
              variant="h1"
              color="primary"
              sx={{
                marginRight: `${100 - provinceQuality - 2.6}%`,
                opacity: visible ? 1 : 0,
                transition: "opacity 2s",
              }}
            >{`${provinceQuality}%`}</Typography>
            <SvgIcon
              sx={{
                opacity: visible ? 1 : 0,
                transition: "opacity 2s",
                marginRight: `${100 - provinceQuality - 1.5}%`,
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
                width={provinceQuality}
                backgroundColor="#008EDD"
                borderRadius="0.65625rem"
                sx={{
                  animation: `${fill} 3s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
                }}
              ></Box>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between">
            <Typography
              variant="h5"
              color="text.main"
            >
              وضعیت:{" "}
              <Typography
                component="span"
                variant="h4"
                color="primary"
              >
                مطلوب
              </Typography>
            </Typography>
            <Typography
              variant="h5"
              color="text.main"
            >
              عملکرد کلی
            </Typography>
          </Box>
          <Typography
            variant="h3"
            color="text.main"
            marginTop="2.875rem"
            gutterBottom
          >
            اختلالات موجود (
            <Typography
            component="span"
              variant="h4"
              color="text.main"
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
                  <Typography variant="h6" color="text.main">{disorder.title}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="h6" color="text.main">{disorder.detail}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          <Box marginTop="2.875rem">
            <ContainedButton
              variant="contained"
              bgColor="#FF8A35"
              txtHover="#FF8A35"
              sx={{ fontSize: "1rem", backgroundColor: "#FF8A35" }}
              onClick={handleClickOpenDialog}
            >
              گزارش اختلال
            </ContainedButton>
            <Button
              fontSize="1rem"
              variant="text.main"
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
              <Typography variant="h3" color="text.main">استان مورد نظر:</Typography>
              <ContainedSelect
                labelId="change-province-label"
                id="change-province"
                label={provinceName}
                value={provinceName}
                onChange={handleProvinceChange}
                sx={{ borderRadius: "1.25rem", pl: "2rem" }}
                displayEmpty
              >
                {provinces.map((provinceItem) => (
                  <MenuItem key={provinceItem.name} value={provinceItem.name}>
                    {provinceItem.name}
                  </MenuItem>
                ))}
              </ContainedSelect>
            </Box>
            <Button
              component={Link}
              to="/dashboard"
              fontSize="1rem"
              variant="text.main"
              sx={{
                color: "#008EDD",
                fontFamily: "PeydaRegular",
              }}
              endIcon={<WestIcon sx={{ mr: "0.7rem" }} />}
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
    </Box>
  );
};

export default Province;
