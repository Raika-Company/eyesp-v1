import {
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  ButtonGroup,
  Button,
  FormControl,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import services from "../../app/api/index";

import { ContainedSelect } from "../../app/common/ContainedSelect";

import NewCardContainer from "./NewCardContainer";

import ViewDetailsButton from "./ViewDetailsButton";
import CircleChart from "./CircleChart";

let gradientColors = ["#0C6087", "#0C6087"];

const OperatorProfile = () => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [percentage, setPercentage] = useState(65);

  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);
  const [age, setAge] = useState("در حال حاضر");

  useEffect(() => {
    services.myISP
      .nowPercentage()
      .then((response) => {
        setPercentage(response.data.data.download);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleChangeDailyPercent = (event) => {
    const selectedOption = event.target.value;
    setAge(selectedOption);
    setClickedButtonIndex(0);

    let apiFunction;

    switch (selectedOption) {
      case "در حال حاضر":
        apiFunction = services.myISP.nowPercentage;
        break;
      case "۳ ساعت پیش":
        apiFunction = services.myISP.HoursAgoPercentage;
        break;
      case "امروز":
        apiFunction = services.myISP.TodayPercentage;
        break;
      case "دیروز":
        apiFunction = services.myISP.YesterDayPercentage;
        break;
      case "هفتگی":
        apiFunction = services.myISP.WeekPercentage;
        break;
      case "ماهانه":
        apiFunction = services.myISP.MonthPercentage;
        break;
      case "سالانه":
        apiFunction = services.myISP.YearPercentage;
        break;
      default:
        console.error("Unknown selection");
        return;
    }

    apiFunction()
      .then((response) => {
        //should be change .darsadamalkard
        setPercentage(response.data.data.download);
        // console.log(":::::", response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const buttonGroupStyle = {
    backgroundColor: theme.palette.mode === "dark" ? "#303030" : "#F4F4F4",
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: " 0.9375rem",
    paddingY: "1rem",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  };
  const buttons = [
    { label: "عملکرد کلی", width: "90%", dataType: "download", percentage: 70 }, // Assuming 'overall' as a placeholder for default value
    { label: "دانلود", width: "90%", dataType: "download", percentage: 80 },
    { label: "آپلود", width: "90%", dataType: "upload", percentage: 90 },
    { label: "پینگ", width: "90%", dataType: "ping", percentage: 60 },
    { label: "پاکت", width: "90%", dataType: "packet_loss", percentage: 60 },
  ];
  const handleButtonClick = (index) => {
    setClickedButtonIndex(index);

    // Get the selected data type from the button
    const selectedDataType = buttons[index].dataType;

    // Based on the selected option from ContainedSelect, decide the API function to call
    let apiFunction;
    switch (
      age // Using 'age' since that's your state variable for the dropdown selection
    ) {
      case "در حال حاضر":
        apiFunction = services.myISP.nowPercentage;
        break;
      case "۳ ساعت پیش":
        apiFunction = services.myISP.HoursAgoPercentage;
        break;
      case "امروز":
        apiFunction = services.myISP.TodayPercentage;
        break;
      case "دیروز":
        apiFunction = services.myISP.YesterDayPercentage;
        break;
      case "هفتگی":
        apiFunction = services.myISP.WeekPercentage;
        break;
      case "ماهانه":
        apiFunction = services.myISP.MonthPercentage;
        break;
      case "سالانه":
        apiFunction = services.myISP.YearPercentage;
        break;
      default:
        console.error("Unknown selection");
        return;
    }

    // Make the API call
    apiFunction()
      .then((response) => {
        // Get the correct data based on the button clicked
        const newPercentage = response.data.data[selectedDataType];

        setPercentage(newPercentage);
      })
      .catch((error) => {
        console.error(error);
      });
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
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Typography
            variant="h1"
            component="h2"
            color="text.textBlack"
            gutterBottom
            mb={2}
          >
            درصد عملکرد
          </Typography>
          <FormControl sx={{ width: "50%", height: "60px" }}>
            <ContainedSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="سال"
              onChange={handleChangeDailyPercent}
              displayEmpty
            >
              <MenuItem value="در حال حاضر">درحال حاضر</MenuItem>
              <MenuItem value="۳ ساعت پیش">۳ ساعت پیش</MenuItem>
              <MenuItem value="امروز">امروز</MenuItem>
              <MenuItem value="دیروز">دیروز</MenuItem>
              <MenuItem value="هفتگی">هفتگی</MenuItem>
              <MenuItem value="ماهانه">ماهانه</MenuItem>
              <MenuItem value="سالانه">سالانه</MenuItem>
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
              finalPercentage={percentage.percentage}
              gradientColors={gradientColors}
              size={140}
              lineWidth={10}
              variant="h1"
            />
          </Box>
        </Box>
        <Box mt={2} display="flex" justifyContent="center">
          <ViewDetailsButton target="/isp-performance" />
        </Box>
      </NewCardContainer>
    </>
  );
};

export default OperatorProfile;
