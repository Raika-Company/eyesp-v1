import React, { memo } from "react";
import { styled, keyframes, IconButton, Box, Typography } from "@mui/material";
import WestIcon from "@mui/icons-material/West";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const RowBox = styled(Box)(({ theme, delay, gradient }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "1.34375rem",
  background: gradient,
  paddingX: "0.94rem",
  paddingY: "0.5rem",
  opacity: delay ? 0 : 1,
  animation: delay ? `${fadeInAnimation} 0.4s forwards ${delay}s` : "none",
  "& > *": {
    flex: 1,
    textAlign: "center",
    fontSize: "1.25rem",
    fontFamily: "PeydaLight",
    color: "#676767"
  },
}));

const gradients = [
  "linear-gradient(180deg, #BDFEAE 0%, #F2EFA5 0.01%, #F9F7EA 100%)",
  "linear-gradient(180deg, #DADADA 0%, #E1E1E1 0.01%, #F6F6F6 100%)",
  "linear-gradient(180deg, #D49A63 0%, #F1CBB0 0.01%, #F8F8F8 100%)",
  "linear-gradient(180deg, #D0E3ED 0%, #D0E2EC 0.01%, #EEF4F9 100%)",
];

const ISPTable = ({ ISPdata }) => {
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        boxShadow: 0,
        marginBottom: "1rem",
        overflow: "hidden",
        maxWidth: "700px",
      }}
    >
      <RowBox>
        <Typography>رتبه</Typography>
        <Typography>نام</Typography>
        <Typography>% اختلال</Typography>
        <Typography>(ms) پینگ</Typography>
        <Typography>(mb/s) سرعت</Typography>
        <Typography>جزئیات</Typography>
      </RowBox>

      {ISPdata.map((Items, index) => (
        <RowBox
          key={Items.rank}
          delay={index * 0.2}
          gradient={gradients[index % gradients.length]}
          marginTop="1rem"
        >
          <Typography>{Items.rank}</Typography>
          <Typography>{Items.ISPname}</Typography>
          <Typography sx={{ color: "primary" }}>{Items.disturbance}</Typography>
          <Typography>{Items.pings}</Typography>
          <Typography>{Items.speed}</Typography>
          <IconButton aria-label={`more info about ${Items.ISPname}`}>
            <WestIcon />
          </IconButton>
        </RowBox>
      ))}
    </Box>
  );
};

export default memo(ISPTable);