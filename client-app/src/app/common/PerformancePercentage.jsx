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
  const [age, setAge] = useState("1400");

  const buttonGroupStyle = {
    backgroundColor: theme.palette.mode === "dark" ? "#303030" : "#F4F4F4",
    width: "50%",
    alignItems: "center",
    gap: "11px",
    justifyContent: "center",
    borderRadius: " 0.9375rem",
    paddingY: "1rem",
    boxShadow: "0px 0px 6px rgba(0, 0, 0, 0.2)",
  };
  const buttons = [
    { label: "سرعت دانلود", width: "90%" },
    { label: "سرعت آپلود", width: "90%" },
    { label: "پینگ", width: "90%" },
    { label: "درصد عملکرد", width: "90%" },
  ];
  const handleButtonClick = (index) => {
    setClickedButtonIndex(index);
    updateChartData(index);
  };
  const activeButtonStyle = {
    backgroundColor: "#0C6087",
    color: "white",
    borderRadius: "2rem",
    border: "none",
    width: "60%",
  };
  const defaultButtonStyle = {
    borderRadius: "2rem",
    border: "none",
    width: "60%",
    color: "#E7E7E7",
  };
  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setAge(selectedYear);

    const yearData = data.find((d) => d.id === selectedYear.toString());
    if (yearData) {
      setChartData(yearData.data);
    }
  };

  const StyledFormControl = styled(FormControl)(({ theme }) => ({
    "& .css-1uk43v8-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ":
      {
        padding: "5px 14px;", // e.g., "10px 15px"
      },
  }));
  return (
    <>
      <NewCardContainer
        sx={{
          marginY: "1rem",
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          paddingX: "3%",
          flexBasis: isMdScreen ? "100%" : "50%",
        }}
      >
        <Box display="flex" justifyContent="space-between">
          {" "}
          <Typography
            variant="h1"
            component="h2"
            color="text.textBlack"
            gutterBottom
          >
            درصد عملکرد{" "}
          </Typography>
          <StyledFormControl sx={{ width: "50%" }}>
            <ContainedSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="سال"
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value="1400">1400</MenuItem>
              <MenuItem value="1401">1401</MenuItem>
              <MenuItem value="1402">1402</MenuItem>
            </ContainedSelect>
          </StyledFormControl>
        </Box>
        <Box display="flex" justifyContent="space-between" mt={4}>
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
        <Box mt={4} display="flex" justifyContent="center">
          <ViewDetailsButton />
        </Box>
      </NewCardContainer>
    </>
  );
};

export default OperatorProfile;
