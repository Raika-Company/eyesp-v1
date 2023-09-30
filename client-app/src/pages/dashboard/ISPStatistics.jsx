import React from "react";
import { Box, Typography, Grid, useTheme } from "@mui/material";
import StatisticBox from "../../app/common/StatisticBox";
import CardContainer from "../../app/common/CardContainer";
import ViewDetailsButton from "../../app/common/ViewDetailsButton";

/**
 * Constant data for ISP statistics.
 * @typedef {Object} StatisticData
 * @property {string} background - CSS for the background.
 * @property {string} title - Title of the statistic.
 * @property {string} unit - Unit for the value.
 * @property {string} value - Statistic value.
 */
const STATISTICS_LIGHT = [
  {
    background:
      "radial-gradient(467.22% 181.99% at -1.81% 6.72%, #BDE7FF 0%, rgba(205, 224, 235, 0.00) 100%)",
    title: "تعداد",
    unit: "",
    value: "112",
  },
  {
    background:
      "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #44593E 0%, #253644 100%)",
    title: "میانگین سرعت",
    unit: "(mb/s)",
    value: "21",
  },
  {
    background:
      "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #44593E 0%, #253644 100%)",
    title: "میانگین پینگ",
    unit: "ms",
    value: "43",
  },
  {
    background:
      "radial-gradient(467.22% 181.99% at -1.81% 6.72%, #FFCCA8 0%, rgba(205, 224, 235, 0.00) 100%)",
    title: "میانگین درصد عملکرد",
    unit: "%",
    value: "58",
  },
];

const STATISTICS_DARK = [
  {
    background:
      "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #236286 0%, #253644 100%)",
    title: "تعداد",
    unit: "",
    value: "112",
  },
  {
    background:
      "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #44593E 0%, #253644 100%)",
    title: "میانگین سرعت",
    unit: "(mb/s)",
    value: "21",
  },
  {
    background:
      "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #44593E 0%, #253644 100%)",
    title: "میانگین پینگ",
    unit: "ms",
    value: "43",
  },
  {
    background:
      "radial-gradient(417.59% 139.12% at -1.81% 6.72%, #59553E 0%, #253644 100%)",
    title: "میانگین درصد عملکرد",
    unit: "%",
    value: "58",
  },
];

/**
 * Constant data for ISP statistics.
 * @typedef {Object} StatisticData
 * @property {string} background - CSS for the background.
 * @property {string} title - Title of the statistic.
 * @property {string} unit - Unit for the value.
 * @property {string} value - Statistic value.
 */
const ISPStatistics = ({ mpCardContainers }) => {
  const theme = useTheme()
  const isDarkMode = theme.palette.mode === 'dark'
  const STATISTICS = isDarkMode ? STATISTICS_DARK : STATISTICS_LIGHT
  return (
  <CardContainer
    sx={{
      flex: 1,
      paddingX: mpCardContainers,
      paddingY: "1.75rem",
      alignSelf: "flex-start",
    }}
  >
    <Box display="flex" justifyContent="space-between" marginBottom="1.8rem">
      <Typography variant="h1" color="text.textBlack">
        آمار ISP ها
      </Typography>
      <ViewDetailsButton target="/operator-compare" />
    </Box>
    <Grid container spacing={4}>
      {STATISTICS.map((stat, index) => (
        <Grid key={index} xs={6} item>
          <StatisticBox {...stat} />
        </Grid>
      ))}
    </Grid>
  </CardContainer>
  )
};

export default ISPStatistics;
