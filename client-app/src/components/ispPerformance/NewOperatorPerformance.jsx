import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import NewLogo from "../../app/common/NewLogo";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import chartData from "../../../public/data/ispPerformanceChart.json";
import { useEffect, useState } from "react";
import xAxis from "../../app/assets/image/xAxis.svg";
import yAxis from "../../app/assets/image/yAxis.svg";
import SwitchBtn from "../../app/common/SwitchBtn";
import axios from "axios";

import InputLabel from "@mui/material/InputLabel";

const titlesChart = ["میانگین عملکرد", "پاکت لاس", "میانگین سرعت", "پینگ"];

function GridItem({ rendered, title }) {
  return (
    <Grid xs={12} md={6} padding="2rem">
      <Box display="flex">
        <Box>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Box
            borderRadius="3rem"
            padding="1rem"
            sx={{
              backgroundImage:
                "radial-gradient(646.45% 156.82% at 1.67% -6.71%, #E2F7FF 0.31%, rgba(188, 203, 209, 0.00) 100%)",
            }}
            width="100%"
            height="250px"
          >
            {rendered && (
              <Box>
                <ResponsiveContainer width="100%" height={150}>
                  <AreaChart width="100%" height="100%" data={chartData}>
                    <Tooltip />
                    <defs>
                      <linearGradient
                        id="gradientChart"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0.333333"
                          stopColor="#0091E3"
                          stopOpacity="0.167089"
                        />
                        <stop offset="1" stopColor="#008EDD" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#008EDD"
                      fill="url(#gradientChart)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            )}
          </Box>
          <img src={xAxis} alt="xAxis" style={{ width: "100%" }} />
        </Box>
        <img src={yAxis} alt="yAxis" style={{ height: "250px" }} />
      </Box>
    </Grid>
  );
}

const FormControlItems = ["انتخاب اپراتور", "سالیانه", "سال", "استان"];
const data = [
  ["ایرانسل", "همراه اول", "رایتل", "شاتل", "آسیاتک", "مخابرات"],
  ["سالیانه", "ماهیانه", "هفتگی", "روزانه", "ساعتی"],
  ["1402", "1401", "1400", "1399", "1398", "1397"],
  [
    "بندرعباس",
    "شیراز",
    "مشهد",
    "اصفهان",
    "مازندران",
    "تهران",
    "اهواز",
    "سمنان",
    "خوزستان",
    "گیلان",
  ],
];

const NewOperatorPerformance = () => {
  const [formControlItems, setFormControlItems] = React.useState("");
  const handleChange = (event) => {
    setFormControlItems(event.target.value);
  };

  useEffect(() => {
    axios
      .get("/data/myISPChartData.json")
      .then((response) => {
        const data = response.data;
      })
      .catch((error) => {
        console.log("خطا در بارگذاری اطلاعات", error);
      });
  }, []);

  const theme = useTheme();
  const bgColor = theme.palette.mode === "light" ? "#f7f9fc" : "#2a2c2f";
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    setRendered(true);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ height: "100dvh" }}>
      <NewLogo />
      <Box
        sx={{
          mt: "1rem",
          p: "2rem",
          borderRadius: "25px",
          boxShadow: "0 4px 40px 0 rgba(0, 0, 0, 0.20)",
          backgroundColor: bgColor,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Typography fontSize="1.5rem" fontWeight={700}>
            نمودار عملکرد اپراتور
          </Typography>
          <Box>
            {FormControlItems.map((items, index) => (
              <FormControl
                sx={{
                  m: "0.4rem",
                  width: 150,
                  borderRadius: "25px",
                }}
                size="small"
              >
                <InputLabel id={`demo-select-small-label-${index}`}>
                  {items}
                </InputLabel>
                <Select
                  labelId={`demo-select-small-label-${index}`}
                  id={`demo-select-small-${index}`}
                  label={items}
                  onChange={handleChange}
                  sx={{
                    borderRadius: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "38px",
                  }}
                >
                  <MenuItem disabled>
                    <span>{items}</span>
                  </MenuItem>
                  {data[index].map((menuItem, menuItemIndex) => (
                    <MenuItem key={menuItemIndex} value={menuItem}>
                      {menuItem}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>
          <SwitchBtn textOn="مقایسه" textOff="مشاهده تکی" />
        </Box>
        <Grid sx={{ mt: "2rem" }} container>
          {titlesChart.map((title, index) => (
            <GridItem key={index} rendered={rendered} title={title} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default NewOperatorPerformance;
