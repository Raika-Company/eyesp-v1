import {
  Box,
  Button,
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

import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import CustomSnackbar from "../../app/common/CustomSnackbar";
import PerformancePercentage from "../../app/common/PerformancePercentage";
import OperatorProfile from "../../app/common/OperatorProfile";
import NewCardContainer from "../../app/common/NewCardContainer";
import Irancell from "../../app/assets/image/irancell.svg";
import { ContainedButton } from "../../app/common/ContainedButton";

const labels = {
  0.5: "بی فایده",
  1: "بی‌فایده+",
  1.5: "ضعیف",
  2: "ضعیف+",
  2.5: "معمولی",
  3: "معمولی+",
  3.5: "خوب",
  4: "خوب+",
  4.5: "عالی",
  5: "عالی+",
};

function getLabelText(value) {
  return `${value} Icon${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

function getIcon(value, size = "default") {
  // default value if no size is specified
  const commonStyle = { fontSize: size };

  if (value <= 1)
    return <SentimentVeryDissatisfiedIcon style={commonStyle} color="error" />;
  if (value <= 2)
    return <SentimentDissatisfiedIcon style={commonStyle} color="error" />;
  if (value <= 3)
    return <SentimentSatisfiedIcon style={commonStyle} color="warning" />;
  if (value <= 4)
    return <SentimentSatisfiedAltIcon style={commonStyle} color="success" />;
  return <SentimentVerySatisfiedIcon style={commonStyle} color="success" />;
}

const ProvinceAndOperatorDetail = () => {
  const handleDisturbanceClick = () => {
    setOpenFeedBackDialog(false);
    setTimeout(() => {
      setDisturbance(true);
    }, 500);
  };
  const [disturbance, setDisturbance] = useState(false);
  const handleDisturbanceClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDisturbance(false);
  };
  const [value, setValue] = React.useState(3);
  const [hover, setHover] = React.useState(-1);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [openFeedBackDialog, setOpenFeedBackDialog] = useState(false);
  const [selectedButton, setSelectedButton] = useState("مشخصات استان"); // initialize to the first button

  const handleClickOpenFeedbackDialog = () => {
    setOpenFeedBackDialog(true);
  };
  const handleCloseFeedbackDialog = () => {
    setOpenFeedBackDialog(false);
  };

  const backgroundColor = theme.palette.mode === "dark" ? "#303030" : "#F4F4F4";

  return (
    <>
      <Box display="flex" gap={2}>
        <NewCardContainer
          sx={{
            marginTop: "1rem",
            paddingTop: "1.5rem",
            paddingBottom: "2.5rem",
            paddingX: "3%",
            flexBasis: isMdScreen ? "100%" : "50%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: backgroundColor,
              padding: "1rem",
              borderRadius: "1rem",
            }}
          >
            <Button
              variant="text"
              onClick={() => setSelectedButton("مشخصات استان")}
              sx={{
                color:
                  selectedButton === "مشخصات استان"
                    ? theme.palette.text.info
                    : isDark
                    ? "white"
                    : "black",
              }}
            >
              مشخصات استان
            </Button>{" "}
            <Box
              sx={{
                width: "2px",
                height: "25px",
                background: isDark ? "#FFF" : "#000",
              }}
            />
            <Button
              variant="text"
              onClick={() => setSelectedButton("مشخصات اپراتور")}
              sx={{
                color:
                  selectedButton === "مشخصات اپراتور"
                    ? theme.palette.text.info
                    : isDark
                    ? "white"
                    : "black",
              }}
            >
              مشخصات اپراتور
            </Button>{" "}
          </Box>
          <Box
            mt="2.13rem"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h2">تهران</Typography>
            {/* <img src={Irancell} alt="irnacell" /> */}
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
                onClick={handleClickOpenFeedbackDialog}
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
        </NewCardContainer>{" "}
        <PerformancePercentage />
      </Box>
      <Dialog
        open={openFeedBackDialog}
        onClose={handleCloseFeedbackDialog}
        PaperProps={{
          style: {
            width: "60%",
            height: "30%",
          },
        }}
      >
        <DialogContent
          sx={{
            direction: "ltr",
            textAlign: "center",
            pt: "3rem",
          }}
        >
          <Rating
            name="hover-feedback"
            value={value}
            precision={0.5}
            getLabelText={getLabelText}
            icon={getIcon(value, "3rem")}
            emptyIcon={
              <SentimentSatisfiedIcon
                style={{ fontSize: "3rem", opacity: 0.55 }}
              />
            }
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
          />
          {value !== null && (
            <Box sx={{ ml: "1rem", fontSize: "1.3rem", userSelect: "none" }}>
              {labels[hover !== -1 ? hover : value]}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Typography
            variant="button"
            color="success.main"
            onClick={handleDisturbanceClick}
            sx={{ cursor: "pointer" }}
          >
            ثبت بازخورد
          </Typography>
          <Typography
            variant="button"
            color="error.main"
            autoFocus
            onClick={handleCloseFeedbackDialog}
            sx={{ cursor: "pointer", pr: "1rem" }}
          >
            لغو
          </Typography>
          <CustomSnackbar
            open={disturbance}
            message="بازخورد شما با موفقیت ارسال شد."
            severity="info"
            handleClose={handleDisturbanceClose}
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ProvinceAndOperatorDetail;
