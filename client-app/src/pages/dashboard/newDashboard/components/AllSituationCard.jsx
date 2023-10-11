import {Box, Button, Stack, Typography, grid2Classes} from "@mui/material";
import leftArrow from "../../../../app/assets/image/leftArrow.svg";
import {Link} from "react-router-dom";
import CircleChart from "./CircleChart";
import Square from "./Square";

const detailsData = [
  {
    id: 1,
    percentage: 59,
    title: "سرعت دانلود",
    average: 24,
    unit: "mb/s",
    gradient: ["#960000", "rgba(157, 0, 0, 0.40)"],
  },
  {
    id: 2,
    percentage: 65,
    title: "سرعت آپلود",
    average: 21,
    unit: "mb/s",
    gradient: ["#005E87", "rgba(44, 79, 121, 0.80)"],
  },
  {
    id: 3,
    percentage: 43,
    title: "پینگ",
    average: 24,
    unit: "ms",
    gradient: ["#960000", "rgba(157, 0, 0, 0.40)"],
  },
  {
    id: 4,
    percentage: 42,
    title: "پکت لاس",
    average: 14,
    unit: "%",
    gradient: ["#960000", "rgba(157, 0, 0, 0.40)"],
  },
];

const AllSituationCard = () => {
  return (
    <Box
      sx={{
        boxShadow: "0px 0px 30px 0px rgba(255, 255, 255, 0.20)",
        borderRadius: "1rem",
        maxWidth: "50%",
        paddingY: "1rem",
        paddingX: "2rem",
        display: "flex",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography
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
        <Button
          variant="text.main"
          component={Link}
          to=""
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          مشاهده جزئیات
          <img src={leftArrow} alt="leftArrow" />
        </Button>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
        }}
      >
        {detailsData.map(({id, percentage, title, average, unit, gradient}) => (
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
            <Typography>{title}</Typography>
            <Square
              value={average}
              unit={unit}
              title={"میانگین"}
              background="radial-gradient(143.37% 143.37% at 10.4% -3.47%, #434544 0%, rgba(67, 69, 68, 0.00) 100%)"
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AllSituationCard;
