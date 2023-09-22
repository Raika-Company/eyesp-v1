// External Libraries
import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
  keyframes,
  SvgIcon,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

// Local Components
import NewIranMap from "./map/NewIranMap";
import CardContainer from "../../app/common/CardContainer";
import { ContainedButton } from "../../app/common/ContainedButton";

// Hooks
import useDynamicMP from "../../app/hooks/useDynamicMP";

// Data & Assets
import provinces from "./../../../public/data/provinces.json";
import frame from "../../app/assets/image/Frame.svg";

/**
 * Sample disorder data.
 * @type {Array<Object>}
 */
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

/**
 * Renders the internet status title.
 * @returns {JSX.Element} The rendered component.
 */
const InternetStatusTitle = () => (
  <React.Fragment>
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
  </React.Fragment>
);

/**
 * Renders an accordion component for displaying disorders.
 * @param {Object} props - Component properties.
 * @param {string} props.title - The title of the disorder.
 * @param {string} props.detail - Detailed information about the disorder.
 * @returns {JSX.Element} The rendered component.
 */
const DisorderAccordion = ({ title, detail }) => (
  <Accordion
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
      <Typography>{title}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography>{detail}</Typography>
    </AccordionDetails>
  </Accordion>
);

/**
 * Renders the main internet status card component.
 * @param {Object} props - Component properties.
 * @param {Function} props.handleClickOpenDialog - Function to handle the dialog open action.
 * @param {Function} props.handleDisturbanceClick - Function to handle disturbance click action.
 * @param {string} props.province - Current selected province.
 * @param {Function} props.handleProvinceChange - Function to handle province change action.
 * @returns {JSX.Element} The rendered component.
 */
const InternetStatusCard = (props) => {
  const {
    handleClickOpenDialog,
    handleDisturbanceClick,
    province,
    handleProvinceChange,
    qualityPercentage,
  } = props;

  const paddingMainBox = useDynamicMP(390, 1440, 1.81, 4);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const [fillPercentage, setFillPercentage] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(true);

  const targetPercentage = qualityPercentage;
  const duration = 5000;
  const startTime = React.useRef(Date.now());

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

  const intervalId = React.useRef(null);

  React.useEffect(() => {
    if (isAnimating) {
      intervalId.current = setInterval(updateFillPercentage, 50);
    }
    return () => {
      clearInterval(intervalId.current);
    };
  }, [isAnimating]);

  return (
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
        <InternetStatusTitle />
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
            <DisorderAccordion key={disorder.title} {...disorder} />
          ))}
        </Box>
        <Box marginTop="2.875rem">
          <ContainedButton
            variant="contained"
            sx={{ fontSize: "1rem", backgroundColor: "#FF8A35" }}
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
      <Box flex={1}>
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
            displayEmpty
            sx={{ borderRadius: "1.25rem" }}
          >
            <MenuItem value="">انتخاب کنید</MenuItem>
            {provinces.map((provinceItem) => (
              <MenuItem key={provinceItem.name} value={provinceItem.name}>
                {provinceItem.name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box margin="5%">
          <NewIranMap />
        </Box>
      </Box>
    </CardContainer>
  );
};

export default InternetStatusCard;
