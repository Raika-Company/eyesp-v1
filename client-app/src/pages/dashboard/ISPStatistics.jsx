// React core imports
import React from "react";

// MUI (Material-UI) core and component imports
import { Box, Typography, Button, Grid } from "@mui/material";
import WestIcon from "@mui/icons-material/West";

// Local component imports
import StatisticBox from "../../app/common/StatisticBox";
import CardContainer from "../../app/common/CardContainer";
import ViewDetailsButton from "../../app/common/ViewDetailsButton";

const ISPStatistics = ({mpCardContainers}) => {
  return (
    <CardContainer
      sx={{
        flex: 1,
        paddingX: mpCardContainers,
        paddingY: "1.75rem",
        alignSelf: "flex-start",
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Typography
          color="#2C2C2C"
          fontSize="1.5rem"
          fontFamily="PeydaSemiBold"
        >
          آمار ISP های کشور
        </Typography>
        <ViewDetailsButton target="/operator-performance" />
      </Box>
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <StatisticBox
            background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #BDE7FF 0%, rgba(205, 224, 235, 0.00) 100%)"
            title="تعداد"
            unit=""
            value="112"
          />
        </Grid>
        <Grid xs={6} item>
          <StatisticBox
            background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #C1E0B9 0%, rgba(205, 224, 235, 0.00) 100%)"
            title="میانگین سرعت"
            unit="(mb/s)"
            value="21"
          />
        </Grid>
        <Grid xs={6} item>
          <StatisticBox
            background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #C1E0B9 0%, rgba(205, 224, 235, 0.00) 100%)"
            title="میانگین پینگ"
            unit="ms"
            value="43"
          />
        </Grid>
        <Grid xs={6} item>
          <StatisticBox
            background="radial-gradient(467.22% 181.99% at -1.81% 6.72%, #FFCCA8 0%, rgba(205, 224, 235, 0.00) 100%)"
            title="میانگین درصد عملکرد"
            unit="%"
            value="58"
          />
        </Grid>
      </Grid>
    </CardContainer>
  );
};

export default ISPStatistics;
