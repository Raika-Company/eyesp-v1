<<<<<<< HEAD
import {Box, Skeleton, Stack, Typography, useTheme} from "@mui/material";
=======
import {
  Box,
  Button,
  Stack,
  Typography,
  grid2Classes,
  useTheme,
} from "@mui/material";
import leftArrow from "../../../../app/assets/image/leftArrow.svg";
import { Link } from "react-router-dom";
>>>>>>> remotes/origin/develop
import CircleChart from "../../../../app/common/CircleChart";
import Square from "./Square";
import ViewDetailsButton from "../../../../app/common/ViewDetailsButton";
import {useEffect, useState} from "react";
import services from "../../../../app/api/index";

const statesKeys = ["download", "upload", "ping", "packet_loss"];
const statesProperties = {
  download: {
    id: 1,
    title: "سرعت دانلود",
    unit: "mb/s",
  },
  upload: {
    id: 2,
    title: "سرعت آپلود",
    unit: "mb/s",
  },

  ping: {
    id: 3,
    title: "پینگ",
    unit: "ms",
  },

  packet_loss: {
    id: 4,
    title: "پکت لاس",
    unit: "%",
  },
};

const AllSituationCard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [internetState, setInternetState] = useState(null);
  useEffect(() => {
    services.dashboard.getInternetStateForNow().then((response) => {
      setInternetState(response.data.data);
    });
  }, []);

  return (
    <Box
      sx={{
        boxShadow:
          theme.palette.mode === "dark"
            ? "0px 0px 30px 0px rgba(255, 255, 255, 0.20)"
            : "0px 0px 30px 0px rgba(0, 0, 0, 0.20)",
        background: isDark ? "#1A1A1A" : "#FFF",
        borderRadius: "1rem",
        paddingY: "1rem",
        paddingX: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
        transition: "all .25s",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
          variant="h1"
          sx={{
            fontSize: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            textAlign: "center",
          }}
        >
          وضعیت کلی اینترنت کشور
        </Typography>
        <ViewDetailsButton target="/isp-performance" />
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
<<<<<<< HEAD
        {statesKeys.map((key) => (
          <Box
            key={key}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: ".8rem",
            }}
          >
            <CircleChart
              id={statesProperties[key].id}
              finalPercentage={
                internetState ? internetState[key].percentage : 0
              }
              gradientColors={
                statesProperties[key].id === 2
                  ? ["#005E87", "rgba(44, 79, 121, 0.80)"]
                  : undefined
              }
            />
            <Typography>{statesProperties[key].title}</Typography>
            <Square
              value={
                internetState ? (
                  internetState[key].avg
                ) : (
                  <Skeleton width="2rem" height="2rem" />
                )
              }
              unit={statesProperties[key].unit}
              title={"میانگین"}
              background={
                isDark
                  ? "radial-gradient(143.37% 143.37% at 10.4% -3.47%, #434544 0%, rgba(67, 69, 68, 0.00) 100%)"
                  : "radial-gradient(143.37% 143.37% at 10.4% -3.47%, #E3E3E3 0%, rgba(144, 144, 144, 0.00) 100%)"
              }
            />
          </Box>
        ))}
=======
        {detailsData.map(
          ({ id, percentage, title, average, unit, gradient }) => (
            <Box
              key={id}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: ".8rem",
              }}
            >
              <CircleChart
                id={id}
                finalPercentage={percentage}
                gradientColors={
                  id === 2 ? ["#005E87", "rgba(44, 79, 121, 0.80)"] : undefined
                }
              />
              <Typography variant="h3" component="h2">
                {title}
              </Typography>
              <Square
                value={average}
                unit={unit}
                title={"میانگین"}
                background={
                  isDark
                    ? "radial-gradient(143.37% 143.37% at 10.4% -3.47%, #434544 0%, rgba(67, 69, 68, 0.00) 100%)"
                    : "radial-gradient(143.37% 143.37% at 10.4% -3.47%, #E3E3E3 0%, rgba(144, 144, 144, 0.00) 100%)"
                }
              />
            </Box>
          )
        )}
>>>>>>> remotes/origin/develop
      </Box>
    </Box>
  );
};

export default AllSituationCard;
