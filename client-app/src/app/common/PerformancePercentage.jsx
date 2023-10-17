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
  ButtonGroup,
  Button,
  FormControl,
  MenuItem,
  styled,
  CircularProgress,
  backdropClasses,
} from "@mui/material";
import React, { useState } from "react";
import { ContainedButton } from "./ContainedButton";
import StatisticBox from "./StatisticBox";
import CardContainer from "./CardContainer";
import { ContainedSelect } from "../../app/common/ContainedSelect";
import SentimentDissatisfiedIcon from "@mui/icons-material/SentimentDissatisfied";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import SentimentSatisfiedIcon from "@mui/icons-material/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import CustomSnackbar from "./CustomSnackbar";
import NewCardContainer from "./NewCardContainer";
import Irancell from "../assets/image/irancell.svg";
import ViewDetailsButton from "./ViewDetailsButton";
import CircleChart from "./CircleChart";

// const StyledFormControl = styled(FormControl)(({ theme }) => ({
//   width: "50%",
//   "& .css-1uk43v8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ":
//     {
//       padding: theme.palette.mode === "dark" ? "5px 14px" : "5px 14px",
//     },
// }));
let gradientColors = ["#0C6087", "#0C6087"];

const OperatorProfile = () => {
  const handleDisturbanceClick = () => {
    setOpenFeedBackDialog(false);
    setTimeout(() => {
      setDisturbance(true);
    }, 500);
  };

  const theme = useTheme();

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [openFeedBackDialog, setOpenFeedBackDialog] = useState(false);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);
  const [age, setAge] = useState("در حال حاضر");

  const buttonGroupStyle = {
    backgroundColor: theme.palette.mode === "dark" ? "#303030" : "#F4F4F4",
    width: "80%",
    alignItems: "center",
    gap: "11px",
    justifyContent: "center",
    borderRadius: " 0.9375rem",
    paddingY: "1rem",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  };
  const buttons = [
    { label: "عملکرد کلی", width: "90%", percentage: 70 },
    { label: "دانلود", width: "90%", percentage: 80 },
    { label: "آپلود", width: "90%", percentage: 90 },
    { label: "پینگ", width: "90%", percentage: 60 },
  ];
  const handleButtonClick = (index) => {
    setClickedButtonIndex(index);
    setPercentage(buttons[index].percentage);
  };
  const activeButtonStyle = {
    backgroundColor: "#0C6087",
    color: "white", // for readability based on theme
    borderRadius: "2rem",
    border: "none",
    width: "60%",
  };
  const defaultButtonStyle = {
    borderRadius: "2rem",
    border: "none",
    width: "60%",
    color: theme.palette.mode === "dark" ? "white" : "black",
  };
  const [percentage, setPercentage] = useState(65);

  const handleChangeDailyPercent = (event) => {
    const selectedYear = event.target.value;
    setAge(selectedYear);

    // For the sake of debugging, directly set percentages based on options
    if (selectedYear === "در حال حاضر") setPercentage(65);
    else if (selectedYear === "1 روز قبل") setPercentage(75);
    else if (selectedYear === "1 هفته قبل") setPercentage(85);
  };

  return (
    <>
      <NewCardContainer
        sx={{
          marginTop: "1rem",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          paddingX: "3%",
          flexBasis: isMdScreen ? "100%" : "50%",
        }}
      >
        <Box
          display="flex"
          alignItems="flex-end"
          justifyContent="space-between"
        >
          {" "}
          <Typography
            variant="h1"
            component="h2"
            color="text.textBlack"
            gutterBottom
          >
            درصد عملکرد{" "}
          </Typography>
          <FormControl sx={{ width: "50%" }}>
            <ContainedSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="سال"
              onChange={handleChangeDailyPercent}
              displayEmpty
            >
              <MenuItem value="در حال حاضر">درحال حاضر</MenuItem>
              <MenuItem value="1 روز قبل">1 روز قبل</MenuItem>
              <MenuItem value="1 هفته قبل">1 هفته قبل</MenuItem>
            </ContainedSelect>
          </FormControl>
        </Box>
        <Box
          display="flex"
          justifyContent="center"
          gap={0.5}
          // flexWrap="wrap"
          mt={isMdScreen ? "72px" : "32px"}
        >
          <Box flexBasis="50%">
            <ButtonGroup
              orientation="vertical"
              variant="outlined"
              aria-label="outlined button group"
              sx={buttonGroupStyle}
            >
              {buttons.map((btn, index) => (
                <Button
                  key={index}
                  onClick={() => handleButtonClick(index)}
                  style={
                    clickedButtonIndex === index
                      ? { ...activeButtonStyle, width: btn.width }
                      : { ...defaultButtonStyle, width: btn.width }
                  }
                >
                  {btn.label}
                </Button>
              ))}
            </ButtonGroup>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexBasis: "50%",
            }}
          >
            <CircleChart
              finalPercentage={percentage}
              gradientColors={gradientColors}
              size={140}
            />
          </Box>
        </Box>
        <Box mt={3} display="flex" justifyContent="center">
          <ViewDetailsButton target="/isp-performance" />
        </Box>
      </NewCardContainer>
    </>
  );
};

export default OperatorProfile;
