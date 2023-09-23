import { Box, Container, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import NewLogo from "../../app/common/NewLogo";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import xAxis from "../../app/assets/image/xAxis.svg";
import yAxis from "../../app/assets/image/yAxis.svg";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import SwitchBtn from "../../app/common/SwitchBtn";
import "./OperatorPerformance.css"

const titlesChart = ["میانگین عملکرد", "پاکت لاس", "میانگین سرعت", "پینگ"];
function GridItem({ rendered, title, data }) {
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
                  <AreaChart width="100%" height="100%" data={data}>
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
const FormControlItems = ["انتخاب اپراتورها", "سالیانه", "سال", "استان"];
const data = [
  ["ایرانسل", "همراه اول", "رایتل", "شاتل"],
  ["سالیانه", "ماهیانه", "هفتگی"],
  ["1402", "1401", "1400"],
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

function generateRandomData() {
  // Generate random data for the chart
  const data = [];
  for (let i = 1; i <= 12; i++) {
    data.push({
      month: `${i} ماه`,
      value: Math.floor(Math.random() * 100), // Adjust the range as needed
    });
  }
  return data;
}
const OperatorPerformance = () => {
  const theme = useTheme();
  const [formControlItems, setFormControlItems] = useState("");
  const [ispData, setIspData] = useState([]); // state to store the data from JSON
  const [currentChartData, setCurrentChartData] = useState({});
  const [randomChartData1, setRandomChartData1] = useState([]);
  const [randomChartData2, setRandomChartData2] = useState([]);
  const [randomChartData3, setRandomChartData3] = useState([]);
  const [randomChartData4, setRandomChartData4] = useState([]);
  const [rendered, setRendered] = useState(false);

  const handleChange = (event) => {
    setFormControlItems(event.target.value);
    const selectedISPData = ispData.find(
      (item) => item.id === event.target.value
    );
    if (selectedISPData) {
      setCurrentChartData(selectedISPData);
      setRandomChartData1(generateRandomData());
      setRandomChartData2(generateRandomData());
      setRandomChartData3(generateRandomData());
      setRandomChartData4(generateRandomData());
    }
  };

  useEffect(() => {
    axios
      .get("/data/chartData.json")
      .then((response) => {
        const data = response.data;
        setIspData(data);
        const defaultISPData = data.find((item) => item.id === "ایرانسل"); // find "ایرانسل" data
        if (defaultISPData) {
          setCurrentChartData(defaultISPData); // set "ایرانسل" data as default chart data

          setRandomChartData1(generateRandomData());
          setRandomChartData2(generateRandomData());
          setRandomChartData3(generateRandomData());
          setRandomChartData4(generateRandomData());
        }
      })
      .catch((error) => {
        console.log("خطا در بارگذاری اطلاعات", error);
      });
  }, []);
  useEffect(() => {
    setRendered(true);
  }, []);
  return (
    <>
      <Box
        sx={{
          mt: "1rem",
          mb: "2rem",
          p: "2rem",
          borderRadius: "25px",
          boxShadow: "0 4px 40px 0 rgba(0, 0, 0, 0.20)",
          backgroundImage:
            "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)",
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
                  sx={{
                    borderRadius: "25px",
                  }}
                  onChange={handleChange}
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
        <Grid container>
          {titlesChart.map((title, index) => (
            <GridItem
              key={index}
              rendered={rendered}
              title={title}
              data={
                // Assign each chart a different randomChartData
                index === 0
                  ? randomChartData1
                  : index === 1
                  ? randomChartData2
                  : index === 2
                  ? randomChartData3
                  : randomChartData4
              }
            />
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default OperatorPerformance;
