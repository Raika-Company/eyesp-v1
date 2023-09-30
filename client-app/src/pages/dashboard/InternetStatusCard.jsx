// External Libraries
import React, { useEffect, useState } from "react";
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
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";

// Local Components
import NewIranMap from "./map/NewIranMap";
import CardContainer from "../../app/common/CardContainer";
import { ContainedButton } from "../../app/common/ContainedButton";
import { ContainedSelect } from "../../app/common/ContainedSelect";

// Hooks
import useDynamicMP from "../../app/hooks/useDynamicMP";

// Data & Assets
import provinces from "./../../../public/data/provinces.json";

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
    <Typography variant="h1" color="text.textBlack" gutterBottom>
      وضعیت اینترنت
    </Typography>
    <Typography variant="h2" color="text.main" gutterBottom>
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
const DisorderAccordion = ({ theme, title, detail }) => (
  <Accordion
    sx={{
      boxShadow: 0,
      marginY: "0.5em",
      backgroundColor: theme.palette.mode == "light" ? "#FFF" : "transparent",
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
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography variant="h6" color="text.main">
        {detail}
      </Typography>
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
  const theme = useTheme();

  const paddingMainBox = useDynamicMP(390, 1440, 1.81, 4);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

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
        <Typography variant="h3" color="text.main" marginTop="2.875rem" gutterBottom>
          اختلالات موجود (
          <Typography component="span" variant="h4" color="text.main">
            3 مورد
          </Typography>
          )
        </Typography>
        <Box>
          {disorders.map((disorder) => (
            <DisorderAccordion theme={theme} key={disorder.title} {...disorder} />
          ))}
        </Box>
        <Box marginTop="2.875rem">
          <ContainedButton
            variant="contained"
            sx={{ fontSize: "1rem" }}
            onClick={handleClickOpenDialog}
            bgColor="#FF8A35"
            txtHover="#FF8A35"
          >
            گزارش اختلال
          </ContainedButton>
          <Button
            variant="text.main"
            sx={{
              marginRight: "min(1.94rem, 2vw)",
            }}
            onClick={handleDisturbanceClick}
          >
            <Typography variant="h6" color="text.main">
            گزارش خطا در اطلاعات
            </Typography>
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
          <Typography variant="h3" color="text.main">
            استان مورد نظر:
          </Typography>
          <ContainedSelect
            labelId="change-province-label"
            id="change-province"
            label="انتخاب کنید"
            value={province}
            onChange={handleProvinceChange}
            displayEmpty
            sx={{ paddingLeft: "2rem" }}
          >
            <MenuItem value="">انتخاب کنید</MenuItem>
            {provinces.map((provinceItem) => (
              <MenuItem key={provinceItem.name} value={provinceItem.name}>
                {provinceItem.name}
              </MenuItem>
            ))}
          </ContainedSelect>
        </Box>
        <Box margin="5%">
          <NewIranMap />
        </Box>
      </Box>
    </CardContainer>
  );
};

export default InternetStatusCard;
