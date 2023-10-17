import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Rating,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { ContainedButton } from "./ContainedButton";
import StatisticBox from "./StatisticBox";
import CardContainer from "./CardContainer";

import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import CustomSnackbar from "./CustomSnackbar";
import NewCardContainer from "./NewCardContainer";
import Irancell from "../assets/image/irancell.svg";

const OperatorProfile = ({ openFeedbackDialog }) => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const theme = useTheme();
  const backgroundColor = theme.palette.mode === "dark" ? "#303030" : "#F4F4F4";

  return (
    <>
      <NewCardContainer
        sx={{
          marginTop: "1rem",
          paddingTop: "1.5rem",
          paddingBottom: "2.5rem",
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
          مشخصات اپراتور{" "}
        </Typography>
        <Box
          mt="2.13rem"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h2">ایرانسل</Typography>
          <img src={Irancell} alt="irnacell" />
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
              padding: "1rem",
              alignItems: "center",
              boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
            }}
          >
            <Typography variant="body1">رتبه کلی اپراتور</Typography>
            <Typography
              textAlign="center"
              variant="mainDigits"
              marginTop="1rem"
            >
              #1
            </Typography>{" "}
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="0.625rem"
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
              value={2.5}
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
            <Box display="flex" justifyContent="center" gap="2rem">
              <Typography variant="h6" color="text.main">
                10423 کاربر
              </Typography>{" "}
              <Typography variant="h6" color="text.main">
                (2.5)
              </Typography>
            </Box>
            <ContainedButton
              variant="button"
              onClick={openFeedbackDialog}
              sx={{
                backgroundColor: "#0C6087",
                color: "white",
                fontSize: "14px !important",
                borderRadius: "0.625rem",
                marginTop: "1.5rem",
              }}
              bgColor="#0C6087"
              txtHover="#0C6087"
            >
              ثبت بازخورد
            </ContainedButton>
          </Box>{" "}
        </Box>
      </NewCardContainer>
    </>
  );
};

export default OperatorProfile;
