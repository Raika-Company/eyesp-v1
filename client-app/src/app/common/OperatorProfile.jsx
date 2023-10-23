import {
  Box,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import NewCardContainer from "./NewCardContainer";
import Irancell from "../assets/image/irancell.svg";
import IrancellLight from "../assets/image/LogoOperator/irancell-logo-light.svg";
import tci from "../assets/image/LogoOperator/tci.webp";
import mobinnet from "../assets/image/LogoOperator/MOBINnet-removebg-preview.webp";
import hamrahaval from "../assets/image/LogoOperator/MCI-removebg-preview.webp";
import zitel from "../assets/image/LogoOperator/Zitel.webp";
import hiweb from "../assets/image/LogoOperator/hiwebLogo.webp";
import shatel from "../assets/image/LogoOperator/shatelLogo.webp";
import samantel from "../assets/image/LogoOperator/samsantelLogo.webp";
import ISPs from "../../../public/data/ISPs.json";

const getOperatorImage = (operator) => {
  const theme = useTheme();
  switch (operator) {
    case "Irancell":
      return theme.palette.mode === "dark" ? Irancell : IrancellLight;
    case "Hamraheaval":
      return hamrahaval;
    case "Mokhaberat":
      return tci;
    case "Zitel":
      return zitel;
    case "Shatel":
      return shatel;
    case "Hiweb":
      return hiweb;
    case "Samantel":
      return samantel;
    case "Mobinnet":
      return mobinnet;
    default:
      return null;
  }
};

const getLocalOperatorName = (internationalName) => {
  const operator = ISPs.find(
    (op) => op.internationalName === internationalName
  );
  return operator ? operator.localName : "";
};

const OperatorProfile = ({ operator, openFeedbackDialog }) => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const backgroundColor = theme.palette.mode === "dark" ? "#303030" : "#F4F4F4";
  const operatorImage = getOperatorImage(operator, theme);
  const localName = getLocalOperatorName(operator);

  return (
    <>
      <NewCardContainer
        sx={{
          marginTop: "1rem",
          paddingTop: "1rem",
          paddingBottom: "2rem",
          paddingX: "3%",
          flexBasis: isMdScreen ? "100%" : "50%",
        }}
      >
        <Typography
          variant="h1"
          component="h2"
          color="text.textBlack"
          gutterBottom
        >
          مشخصات اپراتور
        </Typography>
        <Box display="flex" justifyContent="space-evenly" alignItems="center">
          <Typography variant="h2">{localName}</Typography>
          <img
            style={{ width: "30%", height: "30%" }}
            src={operatorImage}
            alt={localName}
          />
        </Box>
        <Box
          mt={1}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box
            sx={{
              borderRadius: "1rem",
              backgroundColor: backgroundColor,
              padding: "1.6rem 0.3rem",
              mt: "1.6rem",
              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">رتبه کلی اپراتور</Typography>
            <Typography variant="mainDigits" marginTop="1rem">
              #1
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            flexBasis={isMdScreen ? "100%" : "50%"}
          >
            <Typography
              variant="h3"
              color="text.main"
              marginTop="1.875rem"
              gutterBottom
            >
              بازخورد کاربران
            </Typography>
            <Rating
              value={4}
              precision={0.5}
              name="read-only"
              readOnly
              sx={{
                direction: "ltr",
                "& .MuiRating-iconFilled": {
                  color: theme.palette.mode === "dark" ? "#E7E7E7" : "gold",
                },
              }}
            />
            <Box display="flex" justifyContent="center" gap="1rem">
              <Typography variant="h6" color="text.main">
                120135 کاربر
              </Typography>
              <Typography variant="h6" color="text.main">
                (4.1)
              </Typography>
            </Box>
          </Box>
        </Box>
      </NewCardContainer>
    </>
  );
};

export default OperatorProfile;
