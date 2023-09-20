// React core imports
import React, { useState, useEffect } from "react";

// MUI (Material-UI) core and component imports
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Autocomplete,
  Box,
  Button,
  Container,
  Paper,
  IconButton,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

// MUI Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import WestIcon from "@mui/icons-material/West";

// Local component and utility imports
import { ContainedButton } from "../../app/common/ContainedButton";
import NewIranMap from "./map/NewIranMap";
import ISPTable from "./NewISPTable";
import NewLogo from "../../app/common/NewLogo";
import StatisticBox from "../../app/common/StatisticBox";

// Assets and data imports
import frame from "../../app/assets/image/Frame.svg";
import provinces from "./../../../public/data/provinces.json";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import SendReport from "../../app/common/SendReport";

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

const createData = (rank, ISPname, disturbance, pings, speed, desc) => {
  return { rank, ISPname, disturbance, pings, speed, desc };
};

const RawISPData = [
  createData("1", "زیتل", "1%", "49ms", "28Mbps"),
  createData("2", "همراه اول", "3%", "51ms", "23Mbps"),
  createData("3", "ایرانسل", "3%", "52ms", "21Mbps"),
  createData("4", "رایتل", "4%", "59ms", "19Mbps"),
  createData("5", "شاتل", "6%", "61ms", "18Mbps"),
  createData("6", "مخابرات", "8%", "61ms", "16Mbps"),
  createData("7", "آسیاتک", "9%", "64ms", "14Mbps"),
  createData("8", "های وب", "11%", "53ms", "19Mbps"),
];

const selectionItems = [
  "نام ISP",
  "بیشترین اختلال",
  "کمترین اختلال",
  "بیشترین میانگین پینگ",
  "کمترین میانگین پینگ",
  "بیشترین میانگین سرعت",
  "کمترین میانگین سرعت",
];

const parseNumber = (str) => {
  return parseFloat(str.replace(/[^0-9.]/g, ""));
};

const sortFunctions = {
  "نام ISP": (a, b) => a.ISPname.localeCompare(b.ISPname),
  "بیشترین اختلال": (a, b) =>
    parseNumber(b.disturbance) - parseNumber(a.disturbance),
  "کمترین اختلال": (a, b) =>
    parseNumber(a.disturbance) - parseNumber(b.disturbance),
  "بیشترین میانگین پینگ": (a, b) => parseNumber(b.pings) - parseNumber(a.pings),
  "کمترین میانگین پینگ": (a, b) => parseNumber(a.pings) - parseNumber(b.pings),
  "بیشترین میانگین سرعت": (a, b) => parseNumber(b.speed) - parseNumber(a.speed),
  "کمترین میانگین سرعت": (a, b) => parseNumber(a.speed) - parseNumber(b.speed),
};

const radialBackground =
  "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)";

const NewDashboard = () => {
  const navigate = useNavigate();

  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const [sortCriteria, setSortCriteria] = useState("بیشترین اختلال");

  const [ISPData, setISPData] = useState(RawISPData);

  const [visibleRows, setVisibleRows] = useState(6);

  const handleShowMore = () => {
    setVisibleRows((prev) => prev + 2);
  };

  useEffect(() => {
    const sortFunction = sortFunctions[sortCriteria];
    if (sortFunction) {
      setISPData([...ISPData].sort(sortFunction));
    }
  }, [sortCriteria]);

  const [province, setProvince] = useState("انتخاب کنید");

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;

    setProvince(selectedProvince);

    navigate(`/new/dashboard/${selectedProvince}`, {
      state: {
        provinceName: selectedProvince,
      },
    });
  };

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

  // const action = (
  //   <>
  //     <Button variant="text" size="small" onClick={handleDisturbanceClose}>
  //       لغو کردن
  //     </Button>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="#4E9A51"
  //       onClick={handleDisturbanceClose}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </>
  // );

  return (
    <Box width="100%">
      <Container maxWidth="xl">
        <NewLogo />
        <Grid
          container
          component={Paper}
          elevation={8}
          marginY="1rem"
          borderRadius="2rem"
          paddingTop="3.5rem"
          paddingBottom="2.25rem"
          paddingX="5%"
          spacing={4}
          sx={{
            background: radialBackground,
          }}
        >
          <Grid xs={12} md={6}>
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
              سراسر کشور
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
            </Box>
          </Grid>
          <Grid xs={12} md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              gap="1rem"
              width="100%"
            >
              <Typography>استان مورد نظر:</Typography>
              <Select
                labelId="change-province-label"
                id="change-province"
                label="انتخاب کنید"
                value={province}
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
            <NewIranMap />
          </Grid>
        </Grid>
        <Box
          display="flex"
          alignItems="flex-start"
          flexDirection={isMdScreen ? "row" : "column"}
          width="100%"
          justifyContent="space-between"
          marginY="1rem"
        >
          <Box
            paddingY="2rem"
            // component={Paper}
            // elevation={8}
            borderRadius="2rem"
            width={isMdScreen ? "48%" : "100%"}
            sx={{
              background: radialBackground,
              boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.20)",
              backdropFilter: "blur(35px)"
            }}
          >
            <Box display="flex" justifyContent="space-between" marginX="0.5rem">
              <Typography
                color="#2C2C2C"
                fontSize="1.5rem"
                fontFamily="PeydaSemiBold"
              >
                آمار ISP های کشور
              </Typography>
              <Button
                fontSize="1rem"
                variant="text"
                sx={{ color: "#008EDD", fontFamily: "PeydaRegular" }}
                endIcon={<WestIcon />}
              >
                مشاهده جزئیات
              </Button>
            </Box>
            <Grid container justifyContent="space-evenly">
              <Grid xs={6} width="45%" marginY="0.875rem">
                <StatisticBox
                  background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #BDE7FF 0%, rgba(205, 224, 235, 0.00) 100%)"
                  title="تعداد"
                  unit=""
                  value="112"
                />
              </Grid>
              <Grid xs={6} width="45%" marginY="0.875rem">
                <StatisticBox
                  background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #C1E0B9 0%, rgba(205, 224, 235, 0.00) 100%)"
                  title="میانگین سرعت"
                  unit="(mb/s)"
                  value="21"
                />
              </Grid>
              <Grid xs={6} width="45%" marginY="0.875rem">
                <StatisticBox
                  background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #C1E0B9 0%, rgba(205, 224, 235, 0.00) 100%)"
                  title="میانگین پینگ"
                  unit="ms"
                  value="43"
                />
              </Grid>
              <Grid xs={6} width="45%" marginY="0.875rem">
                <StatisticBox
                  background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #FFCCA8 0%, rgba(205, 224, 235, 0.00) 100%)"
                  title="میانگین درصد عملکرد"
                  unit="%"
                  value="58"
                />
              </Grid>
            </Grid>
          </Box>
          <Box
            paddingY="2rem"
            paddingX="0.5rem"
            component={Paper}
            elevation={8}
            borderRadius="2rem"
            width={isMdScreen ? "48%" : "100%"}
            sx={{
              background: radialBackground,
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: isSmScreen ? "center" : "space-between",
                paddingX: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <Typography
                variant="h3"
                gutterBottom
                sx={{
                  color: "info.main",
                }}
              >
                رتبه بندی ISPها{" "}
              </Typography>
              <Typography
                variant="subtitle1"
                component="div"
                gutterBottom
                sx={{
                  color: "textColor.main",
                  fontWeight: "700",
                  fontSize: isSmScreen ? "0.9rem" : "overline",
                }}
              >
                براساس:{" "}
                <Select
                  value={sortCriteria}
                  onChange={(e) => setSortCriteria(e.target.value)}
                  variant="outlined"
                  color="primary"
                  sx={{ marginRight: "0.5rem", color: "info.main", borderRadius: "1.25rem" }}
                >
                  {selectionItems.map((item) => (
                    <MenuItem
                      key={item}
                      sx={{ color: "textColor.light" }}
                      value={item}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Typography>
            </Box>
            <ISPTable ISPdata={ISPData.slice(0, visibleRows)} />
            {visibleRows < RawISPData.length && (
              <Typography
                variant="body1"
                sx={{
                  color: "textColor.main",
                  textAlign: "center",
                  marginY: "1rem",
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={handleShowMore}
              >
                -- مشاهده بیشتر --
              </Typography>
            )}
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={disturbance}
        autoHideDuration={6000}
        onClose={handleDisturbanceClose}
      >
        <Alert
          onClose={handleDisturbanceClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          گزارش شما با موفقیت ارسال شد.
        </Alert>
      </Snackbar>
      <SendReport openDialog={openDialog} handleCloseDialog={handleCloseDialog} />
    </Box>
  );
};

export default NewDashboard;
