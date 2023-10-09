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

const UserSatisfaction = () => {
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

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [openFeedBackDialog, setOpenFeedBackDialog] = useState(false);

  const handleClickOpenFeedbackDialog = () => {
    setOpenFeedBackDialog(true);
  };
  const handleCloseFeedbackDialog = () => {
    setOpenFeedBackDialog(false);
  };
  return (
    <>
      <CardContainer
        paddingTop="3.5rem"
        paddingBottom="2.25rem"
        sx={{
          marginY: "1rem",
          paddingTop: "3.5rem",
          paddingBottom: "2.25rem",
          paddingX: "5%",
          flexBasis: isMdScreen ? "100%" : "49.5%",
        }}
      >
        <Typography variant="h1" color="text.textBlack" gutterBottom>
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
            variant="h3"
            color="text.main"
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
            <Typography variant="h6" color="text.main">
              (2.5)
            </Typography>
            <Typography variant="h6" color="text.main">
              10423 نظر
            </Typography>
          </Box>
          <ContainedButton
            variant="button"
            onClick={handleClickOpenFeedbackDialog}
            sx={{
              backgroundColor: "#008EDD",
              color: "white",
            }}
            bgColor="#008EDD"
            txtHover="#008EDD"
          >
            ثبت بازخورد
          </ContainedButton>
        </Box>
        <Grid container justifyContent="space-evenly">
          <Grid width="45%" marginY="0.875rem">
            <StatisticBox
              background={
                theme.palette.mode === "light"
                  ? "radial-gradient(467.22% 181.99% at -1.81% 6.72%, #BDE7FF 0%, rgba(205, 224, 235, 0.00) 100%)"
                  : "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #236286 0%, #253644 100%)"
              }
              title="تعداد کاربرها"
              unit="کاربر"
              value="1624201"
            />
          </Grid>
          <Grid width="45%" marginY="0.875rem">
            <StatisticBox
              background={
                theme.palette.mode === "light"
                  ? "radial-gradient(467.22% 181.99% at -1.81% 6.72%, #C1E0B9 0%, rgba(205, 224, 235, 0.00) 100%)"
                  : "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #44593E 0%, #253644 100%)"
              }
              title="میانگین سرعت"
              unit="(mb/s)"
              value="21"
            />
          </Grid>
          <Grid width="45%" marginY="0.875rem">
            <StatisticBox
              background={
                theme.palette.mode === "light"
                  ? "radial-gradient(467.22% 181.99% at -1.81% 6.72%, #C1E0B9 0%, rgba(205, 224, 235, 0.00) 100%)"
                  : "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #44593E 0%, #253644 100%)"
              }
              title="میانگین پینگ"
              unit="ms"
              value="43"
            />
          </Grid>
          <Grid width="45%" marginY="0.875rem">
            <StatisticBox
              background={
                theme.palette.mode === "light"
                  ? "radial-gradient(467.22% 181.99% at -1.81% 6.72%, #FFCCA8 0%, rgba(205, 224, 235, 0.00) 100%)"
                  : "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #59553E 0%, #253644 100%)"
              }
              title="میانگین درصد عملکرد"
              unit="%"
              value="58"
            />
          </Grid>
        </Grid>
      </CardContainer>
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
            icon={getIcon(value, "3rem")} // setting the icon size to 2rem as an example
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

export default UserSatisfaction;
