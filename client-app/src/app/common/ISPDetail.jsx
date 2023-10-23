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
import PerformancePercentage from "./PerformancePercentage";
import OperatorProfile from "./OperatorProfile";

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

const ISPDetail = ({operator, data}) => {
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
      <Box display="flex" gap={2}>
        <OperatorProfile operator={operator} openFeedbackDialog={handleClickOpenFeedbackDialog} />
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

export default ISPDetail;
