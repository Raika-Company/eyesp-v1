import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Rating,
  Snackbar,
  Typography,
  ButtonGroup,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Link,
} from "@mui/material";
import "./MyISP.css";
import leftArrow from "../../app/assets/image/leftArrow.svg";
import frame from "../../app/assets/image/frame.svg";
import { ContainedButton } from "../../app/common/ContainedButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StatisticBox from "../../app/common/StatisticBox";
import NewLogo from "../../app/common/NewLogo";
import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data from "../../../public/data/myISPChartData.json";
import { useEffect, useState } from "react";
import xAxis from "../../app/assets/image/xAxis.svg";
import yAxis from "../../app/assets/image/yAxisEmpty.svg";
import SendReport from "../../app/common/SendReport";

const radialBackground =
  "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)";

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
const MyISP = () => {
  const [rendered, setRendered] = useState(false);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);
  const [chartData, setChartData] = useState(data[0].data);

  const handleButtonClick = (index) => {
    setClickedButtonIndex(index);
    updateChartData(index);
  };

  const updateChartData = (index) => {
    if (index < data.length) {
      setChartData(data[index].data);
    }
  };
  useEffect(() => {
    setRendered(true);
  }, []);
  const buttonGroupStyle = {
    backgroundColor: "#F4F4F4",
    width: "70%",
    alignItems: "center",
    gap: "11px",
    justifyContent: "center",
    borderRadius: "2rem",
    paddingY: "1rem",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  };

  const activeButtonStyle = {
    backgroundColor: "#008EDD",
    color: "white",
    borderRadius: "2rem",
    border: "none",
    width: "60%",
  };

  const defaultButtonStyle = {
    borderRadius: "2rem",
    border: "none",
    width: "60%",
    color: "#676767",
  };

  const buttons = [
    { label: "سرعت دانلود", width: "80%" },
    { label: "سرعت آپلود", width: "80%" },
    { label: "پینگ", width: "80%" },
    { label: "درصد عملکرد", width: "80%" },
  ];
  const [age, setAge] = useState("1400");

  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setAge(selectedYear);

    const yearData = data.find((d) => d.id === selectedYear.toString());
    if (yearData) {
      setChartData(yearData.data);
    }
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

  const [openFeedBackDialog, setOpenFeedBackDialog] = useState(false);

  const handleClickOpenFeedbackDialog = () => {
    setOpenFeedBackDialog(true);
  };
  const handleCloseFeedbackDialog = () => {
    setOpenFeedBackDialog(false);
  };

  const [starsValue, setStarsValue] = useState(0);

  return (
    <Container maxWidth="xl">
      <NewLogo />
      <Box display="flex" gap="1rem">
        <Box
          component={Paper}
          elevation={8}
          marginY="1rem"
          borderRadius="2rem"
          paddingTop="3.5rem"
          paddingBottom="2.25rem"
          paddingX="5%"
          sx={{ background: radialBackground }}
          flexBasis="50%"
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
        </Box>
        <Box
          component={Paper}
          elevation={8}
          marginY="1rem"
          borderRadius="2rem"
          paddingTop="3.5rem"
          paddingBottom="2.25rem"
          paddingX="5%"
          sx={{ background: radialBackground }}
          flexBasis="50%"
        >
          <Typography
            fontFamily="PeydaSemibold"
            fontSize="1.5rem"
            color="#2C2C2C"
            gutterBottom
          >
            عملکرد اپراتور
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="0.625rem"
          >
            <Typography
              fontFamily="PeydaRegular"
              fontSize="1.25rem"
              color="#676767"
              marginTop="2.875rem"
              gutterBottom
            >
              رضایت کاربران
            </Typography>
            <Rating
              value={2.5}
              precision={0.5}
              name="read-only"
              readOnly
              sx={{ direction: "ltr" }}
            />
            <Box display="flex" justifyContent="center" gap="2rem">
              <Typography
                fontFamily="PeydaRegular"
                fontSize="1rem"
                sx={{ color: "#676767" }}
              >
                (2.5)
              </Typography>
              <Typography
                fontFamily="PeydaRegular"
                fontSize="1rem"
                sx={{ color: "#676767" }}
              >
                10423 نظر
              </Typography>
            </Box>
            <ContainedButton
              onClick={handleClickOpenFeedbackDialog}
              sx={{ backgroundColor: "#008EDD" }}
            >
              ثبت بازخورد
            </ContainedButton>
          </Box>
          <Grid container justifyContent="space-evenly">
            <Grid width="45%" marginY="0.875rem">
              <StatisticBox
                background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #BDE7FF 0%, rgba(205, 224, 235, 0.00) 100%)"
                title="تعداد کاربرها"
                unit="کاربر"
                value="1624201"
              />
            </Grid>
            <Grid width="45%" marginY="0.875rem">
              <StatisticBox
                background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #C1E0B9 0%, rgba(205, 224, 235, 0.00) 100%)"
                title="میانگین سرعت"
                unit="(mb/s)"
                value="21"
              />
            </Grid>
            <Grid width="45%" marginY="0.875rem">
              <StatisticBox
                background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #C1E0B9 0%, rgba(205, 224, 235, 0.00) 100%)"
                title="میانگین پینگ"
                unit="ms"
                value="43"
              />
            </Grid>
            <Grid width="45%" marginY="0.875rem">
              <StatisticBox
                background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #FFCCA8 0%, rgba(205, 224, 235, 0.00) 100%)"
                title="میانگین درصد عملکرد"
                unit="%"
                value="58"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box
        component={Paper}
        elevation={8}
        marginY="1rem"
        borderRadius="2rem"
        paddingTop="3.5rem"
        paddingBottom="4.25rem"
        paddingX="5%"
        sx={{ background: radialBackground }}
        flexBasis="50%"
      >
        <Typography
          fontFamily="PeydaSemibold"
          fontSize="1.5rem"
          color="#2C2C2C"
          gutterBottom
        >
          نمودار عملکرد اپراتور
        </Typography>
        <Grid container>
          <Grid item xs={12} md={9}>
            <Box display="flex">
              <Box>
                <Box
                  borderRadius="3rem"
                  padding="1rem"
                  sx={{
                    backgroundImage:
                      "radial-gradient(646.45% 156.82% at 1.67% -6.71%, #E2F7FF 0.31%, rgba(188, 203, 209, 0.00) 100%)",
                  }}
                  width="100%"
                  height="100%"
                >
                  {rendered && (
                    <Box>
                      <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={chartData}>
                          <Tooltip />
                          <defs>
                            <linearGradient
                              id="gradientChart"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="0.333333"
                                stopColor="#0091E3"
                                stopOpacity="0.167089"
                              />
                              <stop
                                offset="1"
                                stopColor="#008EDD"
                                stopOpacity="0"
                              />
                            </linearGradient>
                          </defs>
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#008EDD"
                            fill="url(#gradientChart)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>
                  )}
                </Box>
                <img src={xAxis} alt="xAxis" style={{ width: "100%" }} />
              </Box>
              <img src={yAxis} alt="yAxis" style={{ height: "100%" }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={4}
            >
              {" "}
              <ButtonGroup
                orientation="vertical"
                variant="outlined"
                aria-label="outlined button group"
                sx={buttonGroupStyle}
              >
                {buttons.map((btn, index) => (
                  <Button
                    key={index}
                    onClick={() => handleButtonClick(index)}
                    style={
                      clickedButtonIndex === index
                        ? { ...activeButtonStyle, width: btn.width }
                        : { ...defaultButtonStyle, width: btn.width }
                    }
                  >
                    {btn.label}
                  </Button>
                ))}
              </ButtonGroup>
              <Typography>سال:</Typography>
              <FormControl sx={{ width: "50%" }}>
                <InputLabel id="demo-simple-select-label">سال</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="سال"
                  onChange={handleChange}
                >
                  <MenuItem value="1400">1400</MenuItem>
                  <MenuItem value="1401">1401</MenuItem>
                  <MenuItem value="1402">1402</MenuItem>
                </Select>
              </FormControl>
              <Box display={"flex"} justifyContent={"center"} gap={2}>
                <Link>سایر اپراتورها</Link>
                <img src={leftArrow} alt="leftArrow" />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
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
      <Dialog open={openFeedBackDialog} onClose={handleCloseFeedbackDialog}>
        <DialogContent>
          <Rating
            name="simple-controlled"
            value={starsValue}
            size="large"
            sx={{ direction: "ltr" }}
            onChange={(event, newValue) => {
              setStarsValue(newValue);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="success"
            autoFocus
            onClick={handleCloseFeedbackDialog}
          >
            ثبت بازخورد
          </Button>
          <Button
            variant="text"
            color="error"
            autoFocus
            onClick={handleCloseFeedbackDialog}
          >
            لغو
          </Button>
        </DialogActions>
      </Dialog>
      <SendReport
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </Container>
  );
};

export default MyISP;
