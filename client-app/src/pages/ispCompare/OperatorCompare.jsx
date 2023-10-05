import {Box, Grid, Typography, useTheme} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import {AreaChart, Area, Tooltip, ResponsiveContainer} from "recharts";
import {useEffect, useState} from "react";
import xAxisLight from "../../app/assets/image/time-compare-light.svg";
import xAxisDark from "../../app/assets/image/time-compare-dark.svg";
import YAxisLine from "./YAxisLine";
import axios from "axios";
import SwitchBtn from "../../app/common/SwitchBtn";
import {ContainedSelect} from "../../app/common/ContainedSelect";
import CardContainer from "../../app/common/CardContainer";

const titlesChart = [
  {
    title: "میانگین عملکرد",
    unit: "Mb/s",
  },
  {
    title: "پاکت لاس",
    unit: "%",
  },
  {
    title: "میانگین سرعت",
    unit: "Mb/s",
  },
  {
    title: "پینگ",
    unit: "Ms",
  },
];
function GridItem({theme, rendered, title, data, unit}) {
  return (
    <Grid xs={12} md={6} padding="2rem">
      <Box display="flex" position="relative">
        <Box>
          <Typography color="text.main" variant="h4" gutterBottom>
            {title}
          </Typography>
          <Box
            borderRadius="3rem"
            padding="1rem"
            sx={{
              background:
                theme.palette.mode === "dark"
                  ? "radial-gradient(646.45% 156.82% at 1.67% -6.71%, rgba(103, 154, 202, 0.23) 0.31%, rgba(104, 137, 151, 0.00) 100%)"
                  : "radial-gradient(646.45% 156.82% at 1.67% -6.71%, #E2F7FF 0.31%, rgba(188, 203, 209, 0.00) 100%)",
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
          <img
            src={theme.palette.mode === "light" ? xAxisLight : xAxisDark}
            alt="xAxis"
            style={{width: "100%"}}
          />
        </Box>
        <YAxisLine
          max={Math.max(...data.map((line) => line.value))}
          unit={unit}
        />
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
const OperatorCompare = () => {
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
      <CardContainer
        sx={{
          mt: "1rem",
          mb: "2rem",
          p: "2rem",
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
          <Typography color="text.textBlack" variant="h1">
            نمودار عملکرد اپراتور
          </Typography>
          <Box>
            {FormControlItems.map((items, index) => (
              <FormControl
                key={index}
                sx={{
                  m: "0.4rem",
                  width: 170,
                  borderRadius: "25px",
                }}
                size="small"
              >
                <ContainedSelect
                  labelId={`demo-select-small-label-${index}`}
                  id={`demo-select-small-${index}`}
                  label={items}
                  onChange={handleChange}
                  displayEmpty
                >
                  <MenuItem disabled>
                    <span style={{color: "#676767"}}>{items}</span>
                  </MenuItem>
                  {data[index].map((menuItem, menuItemIndex) => (
                    <MenuItem
                      sx={{color: "text.main"}}
                      key={menuItemIndex}
                      value={menuItem}
                    >
                      {menuItem}
                    </MenuItem>
                  ))}
                </ContainedSelect>
              </FormControl>
            ))}
          </Box>
          <SwitchBtn textOn="مقایسه" textOff="مشاهده تکی" />
        </Box>
        <Grid container>
          {titlesChart.map((line, index) => (
            <GridItem
              key={index}
              theme={theme}
              rendered={rendered}
              title={line.title}
              unit={line.unit}
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
      </CardContainer>
    </>
  );
};

export default OperatorCompare;
