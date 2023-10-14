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
import CircleChart from "../../pages/dashboard/newDashboard/components/CircleChart";
import AxisIsp from "../assets/image/AxisIsp.svg";

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
    width: "44%",
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
        padding: "5px 14px;",
      },
  }));
  const StyledDiv = styled("div")({
    width: "10%",
    maxWidth: 300,
    margin: "0 auto",
    position: "relative",
    "& .column tbody": {
      aspectRatio: "4 / 3",
    },
    "& .column tbody td": {
      marginInlineStart: "20%",
      marginInlineEnd: "20%",
      background:
        "radial-gradient(ellipse 100% 8px at bottom, red 90px, transparent 90px) bottom, radial-gradient(ellipse 100% 8px at top, red 90px, transparent 50px) top, linear-gradient(rgba(255, 0, 0, 0.5), rgba(255, 0, 0, 0.3))",
      position: "relative",
    },
    "& .column tbody td::before, & .column tbody td::after": {
      content: '""',
      display: "block",
      position: "absolute",
      width: "100%",
      height: 4,
      backgroundColor: "red",
      boxShadow: "0 0 10px red, 0 0 20px red",
    },
    "& .column tbody td::before": {
      top: 0,
      left: 0,
    },
    "& .column tbody td::after": {
      bottom: 0,
      left: 0,
    },
  });
  const StyledTable = styled("table")({
    "&.charts-css.column.hide-data tbody": {
      height: "90px",
      width: "90px",
    },

    "&.charts-css.column.hide-data span": {
      visibility: "hidden",
    },
  });
  const positions = [
    { top: "50%", left: "50%" },
    { top: "30%", left: "30%" },
    { top: "60%", left: "70%" },
    // ... more positions
  ];
  return (
    <>
      <NewCardContainer
        sx={{
          paddingTop: "1.5rem",
          paddingBottom: "1.5rem",
          paddingX: "3%",
          flexBasis: "100%",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          {" "}
          <Typography
            variant="h1"
            component="h2"
            color="text.textBlack"
            gutterBottom
          >
            اختلالات لحظه ای{" "}
          </Typography>
          <ViewDetailsButton />
        </Box>
        <Box
          mt={1}
          ml={3}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
        >
          {" "}
          <Typography color="text.textBlack" gutterBottom>
            نمایش تا
          </Typography>
          <StyledFormControl sx={{ width: "8.8125rem" }}>
            <ContainedSelect
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="سال"
              onChange={handleChange}
              sx={{ backgroundColor: "#313131" }}
              displayEmpty
            >
              <MenuItem value="در حال حاضر">درحال حاضر</MenuItem>
              <MenuItem value="1 روز قبل">1 روز قبل</MenuItem>
              <MenuItem value="1 هفته قبل">1 هفته قبل</MenuItem>
            </ContainedSelect>
          </StyledFormControl>
        </Box>
        <Box mt={3} position="relative">
          <img
            src={AxisIsp}
            alt=""
            style={{ width: "100%", display: "block" }}
          />
          {positions.map((position, index) => (
            <StyledDiv
              key={index}
              style={{
                position: "absolute",
                top: position.top,
                left: position.left,
                transform: "translate(-50%, -50%)",
              }}
            >
              <StyledTable className="charts-css column hide-data">
                <tbody>
                  <tr>
                    <td style={{ "--size": 1.0 }}>
                      <span>400000</span>
                    </td>
                  </tr>
                </tbody>
              </StyledTable>
            </StyledDiv>
          ))}
        </Box>
      </NewCardContainer>
    </>
  );
};

export default OperatorProfile;
