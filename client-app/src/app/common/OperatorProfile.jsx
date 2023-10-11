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
  return (
    <>
      <NewCardContainer
        paddingTop="3.5rem"
        sx={{
          marginY: "1rem",
          paddingTop: "2.5rem",
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
          <Typography>ایرانسل</Typography>
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
              backgroundColor: "#303030",
              padding: "1rem",
              alignItems: "center",
            }}
          >
            <Typography fontSize="2rem">رتبه کلی اپراتور</Typography>
            <Typography textAlign="center" fontSize="2rem" marginTop="1rem">
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
              sx={{ direction: "ltr" }}
            />
            <Box display="flex" justifyContent="center" gap="2rem">
              <Typography variant="h6" color="text.main">
                (2.5)
              </Typography>
              <Typography variant="h6" color="text.main">
                10423 نظر
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
