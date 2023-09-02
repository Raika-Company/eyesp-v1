import React from "react";
import { Container, Typography, Box } from "@mui/material";
import iranMap from "./iran.png";
import Grid from "@mui/material/Grid";
import InfoBox from "./InfoBox";
import InfoWithPieChart from "./InfoWithPieChart";
import InfoLineChart from "./InfoLineChart";

const Dashboard = () => {
  return (
    <Container maxWidth="xl" sx={{ direction: "rtl" }}>
      <div
        style={{
          width: "95%",
          height: "40vh",
          background: "#E8E8E8",
          margin: "1em auto",
          borderRadius: "1.875rem",
          overflow: "visible",
        }}
      >
        <img
          src={iranMap}
          alt="iran map"
          style={{
            float: "left",
            maxWidth: "45%",
            marginTop: "20vh",
            marginInline: "2.5%",
          }}
        />
        <div
          style={{
            width: "50%",
            float: "left",
            padding: "2em",
            marginTop: "2em",
          }}
        >
          <Typography color="#EE0B0B" fontSize="2.45rem" fontWeight={700}>
            <span style={{ fontSize: "4rem" }}>4</span> اختلال یافت شده:
          </Typography>
          <Typography fontWeight="600" fontSize="1.5rem" color="#9B9B9B">
            ● اختلال در مازندران
          </Typography>
          <Typography fontWeight="600" fontSize="1.5rem" color="#9B9B9B">
            ● کندی سرعت
          </Typography>
          <Typography fontWeight="600" fontSize="1.5rem" color="#9B9B9B">
            ● اختلال در خراسان رضوی
          </Typography>
          <Typography fontWeight="600" fontSize="1.5rem" color="#9B9B9B">
            ● افزایش jitter
          </Typography>
          <Typography fontWeight="600" fontSize="1.5rem" color="#9B9B9B">
            ● اختلال در فارس
          </Typography>
          <Typography fontWeight="600" fontSize="1.5rem" color="#9B9B9B">
            ● کند شدن سرعت
          </Typography>
        </div>

        {/* Clear the float */}
        <div style={{ clear: "both" }}></div>
      </div>
      <Box marginTop="20dvh">
        <Typography
          fontSize="2rem"
          color="#9B9B9B"
          fontWeight={700}
          gutterBottom
        >
          وضعیت ISPهای{" "}
          <span style={{ color: "#126AED", fontSize: "2.5rem" }}>
            استان فارس
          </span>
        </Typography>
        <Box
          width="100%"
          marginY="1rem"
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          <InfoBox
            header="لورم ایپسوم"
            number="32"
            buttonText="لورم ایپسوم متن"
            color="#126AED"
          />
          <InfoBox
            header="تعداد ISP های تحت پوشش"
            number="42"
            buttonText="افزودن ISP جدید"
            color="#14A784"
          />
          <InfoWithPieChart color="#126AED" mainText="میانگین عملکرد ISP ها" />
        </Box>
        <Box display="flex">
          <Grid item xs={12} md={6}>
            <InfoLineChart color="#126AED" />
          </Grid>
          <Grid container item xs={12} md={6}>
            <Grid item xs={12}>
              <InfoWithPieChart
                color="#14A784"
                mainText="میانگین پینگ ISP ها"
              />
            </Grid>
            <Grid item xs={12}>
              <InfoWithPieChart
                color="#FF630B"
                mainText="میانگین سرعت ISP ها"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
