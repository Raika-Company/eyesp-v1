import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Paper,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { ContainedButton } from "./ContainedButton";
import StatisticBox from "./StatisticBox";

const UserSatisfaction = () => {
  const radialBackground =
    "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)";
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
      <Box
        component={Paper}
        elevation={8}
        marginY="1rem"
        borderRadius="2rem"
        paddingTop="3.5rem"
        paddingBottom="2.25rem"
        paddingX="5%"
        sx={{
          background: radialBackground,
          flexBasis: isMdScreen ? "100%" : "49.5%",
          boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.20)",
        }}
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
            sx={{
              backgroundColor: "#008EDD",
              color: "white",
              "&:hover": {
                // backgroundColor: ,
                color: "#008EDD",
              },
            }}
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
    </>
  );
};

export default UserSatisfaction;
