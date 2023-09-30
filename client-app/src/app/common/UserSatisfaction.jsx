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
import { ContainedButton } from "./ContainedButton";
import StatisticBox from "./StatisticBox";
import CardContainer from "./CardContainer";

const UserSatisfaction = () => {
  const theme = useTheme();

  const [starsValue, setStarsValue] = useState(0);

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
        marginY="1rem"
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
          <Typography
            variant="button"
            color="success.main"
            onClick={handleCloseFeedbackDialog}
            sx={{ cursor: "pointer" }}
          >
            ثبت بازخورد
          </Typography>
          <Typography
            variant="button"
            color="error.main"
            autoFocus
            onClick={handleCloseFeedbackDialog}
            sx={{ cursor: "pointer" }}
          >
            لغو
          </Typography>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserSatisfaction;
