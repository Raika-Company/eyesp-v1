import {
  Box,
  Stack,
  Typography,
  MenuItem,
  useTheme,
  Button,
  Menu,
} from "@mui/material";
import {useEffect, useState} from "react";
import CardContainer from "../../app/common/CardContainer";
import CardInformation from "../../app/common/CardInformation";
import {ContainedSelect} from "../../app/common/ContainedSelect";
import CircleChart from "../../app/common/CircleChart";
import RatingComponent from "../../app/common/Rating";
import {Treemap, ResponsiveContainer} from "recharts";
import CompareTable from "../dashboard/newDashboard/components/CompareTable";
import {GridItem} from "../../app/common/Charts";
import provinces from "../../../public/data/provinces.json";
import ISPList from "../../../public/data/RowISPData.json";
import DownArrow from "../../app/assets/image/down.svg";

let averageMockData = [
  {
    id: 10,
    value: 34,
    unit: "mb/s",
    title: "سرعت دانلود",
  },
  {
    id: 20,
    value: 26,
    unit: "mb/s",
    title: "سرعت آپلود",
  },
  {
    id: 30,
    value: 45,
    unit: "ms",
    title: "پینگ",
  },
  {
    id: 40,
    value: 11,
    unit: "%",
    title: "پکت لاس",
  },
];

const averageTimeStamp = [
  {
    id: 1,
    value: 1,
    title: "حال حاضر",
  },
  {
    id: 2,
    value: 7,
    title: "هفته گذشته",
  },
  {
    id: 3,
    value: 30,
    title: "ماه گذشته",
  },
  {
    id: 4,
    value: 90,
    title: "سه ماه گذشته",
  },
];

const dataForChart = [
  {name: "A1", value: 30},
  {name: "A2", value: 30},
  {name: "B1", value: 80},
  {name: "B2", value: 90},
  {name: "B3", value: 10},
];

const ISPs = [
  {
    id: 1,
    value: "irancell",
    title: "ایرانسل",
  },
  {
    id: 2,
    value: "mci",
    title: "همراه اول",
  },
  {
    id: 1,
    value: "raytel",
    title: "رایتل",
  },
  {
    id: 1,
    value: "shatel",
    title: "شاتل",
  },
];

const titlesChart = [
  {
    title: "سرعت دانلود",
    unit: "Mb/s",
  },
  {
    title: " سرعت اپلود",
    unit: "%",
  },
  {
    title: " پینگ",
    unit: "Mb/s",
  },
  {
    title: "پکت لاس",
    unit: "Ms",
  },
];
const chartColors = [
  {stroke: "#008EDD", gradientStart: "#0091E3", gradientEnd: "#008EDD"},
  {stroke: "#FFD700", gradientStart: "#FFD740", gradientEnd: "#FFD700"},
  {stroke: "#FF0000", gradientStart: "#FF4040", gradientEnd: "#FF0000"},
  {stroke: "#008000", gradientStart: "#00A000", gradientEnd: "#008000"},
];

const mockDataForPastPerformance = [
  {
    id: 1,
    title: "در هفته گذشته",
    value: 2312,
  },
  {
    id: 2,
    title: "در ماه گذشته",
    value: 342,
  },
  {
    id: 3,
    title: "در سه ماه گذشته",
    value: 812,
  },
  {
    id: 4,
    title: "در سال گذشته",
    value: -25,
  },
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

const ISPSummary = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [currentChartData, setCurrentChartData] = useState(generateRandomData);
  const handleShowInfo = () => {
    setCurrentChartData(generateRandomData());
  };

  const [province, setProvince] = useState("");
  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const [selectedISP, setSelectedISP] = useState("irancell");
  const [dataForTreeChar, setDataForTreeChart] = useState(dataForChart);
  const handleISPChange = (event) => {
    setSelectedISP(event.target.value);
    setDataForTreeChart(
      dataForChart.map((prevData) => ({
        ...prevData,
        value: Math.floor(Math.random() * 100),
      }))
    );
  };

  const [averageTime, setAverageTime] = useState(1);
  const [averageTimeData, setAverageTimeDate] = useState(averageMockData);
  const handleTimeStampChange = (event) => {
    setAverageTimeDate(
      averageMockData.map((prevData) => ({
        ...prevData,
        value: Math.floor(Math.random() * 100),
      }))
    );
    setAverageTime(event.target.value);
  };

  const [operator, setOperator] = useState("");
  const handleISPChangeForCharts = (event) => {
    setOperator(event.target.value);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // It's for the recharts to make the background of itself adaptable to the theme.
  useEffect(() => {
    setTimeout(() => {
      const element = document.querySelector(
        ".recharts-layer.recharts-treemap-depth-0 > g > g > rect"
      );
      if (element)
        element.setAttribute("style", `fill: ${isDark ? "#262626" : "#fff"}`);
      console.log(element);
    }, 10);
  }, [isDark]);
  const PastData = ({title, value}) => {
    return (
      <Stack
        direction="row"
        gap="1rem"
        justifyContent="space-between"
        width="100%"
      >
        <Typography>{title}</Typography>
        <Typography
          sx={{
            color: value > 0 ? "#70FF00" : "#FE4543",
          }}
        >
          {value > 0 ? value + "+" : value}
        </Typography>
      </Stack>
    );
  };
  return (
    <Box
      sx={{
        marginBottom: "2rem",
      }}
    >
      <Box display="flex" justifyContent="space-between" marginBottom="1.19rem">
        <Typography variant="h1" component="h3" color="text.secondary">
          وضعیت اپراتور ها
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" gap="1.25rem">
        <Box display="flex" flexDirection="column" gap="1rem">
          <CardContainer
            display="flex"
            flexDirection="column"
            gap="2.62rem"
            paddingTop="0.88rem"
            paddingBottom="2.5rem"
            paddingX="0.75rem"
          >
            <div>
              <Typography
                textAlign="right"
                variant="h2"
                component="h4"
                marginBottom="0.88rem"
                marginRight="0.75rem"
              >
                وضعیت کلی
              </Typography>
              <CardInformation
                title="تعداد ISP های فعال"
                value={245}
                subTitle="در هفته گذشته"
                subValue={"3+"}
                color="text.number"
              />
            </div>
            <CardInformation
              title="تعداد کاربران فعال"
              value={8437215}
              subTitle="در هفته گذشته"
              subValue={"33145+"}
              color="text.number"
            />
            <CardInformation
              title="میزان رضایت کاربران"
              value={<RatingComponent readOnly />}
              subTitle="در هفته گذشته"
              subValue={"3+"}
              color="text.number"
            />
          </CardContainer>
          <CardContainer
            display="flex"
            flexDirection="column"
            paddingTop="0.88rem"
            paddingBottom="2.5rem"
            paddingX="0.75rem"
          >
            <Typography
              textAlign="right"
              variant="h2"
              component="h4"
              marginBottom="0.88rem"
              marginRight="0.75rem"
            >
              میانگین ها
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(2, auto)",
                rowGap: "1rem",
              }}
            >
              {averageTimeData.map((average, index) => (
                <Stack key={average.id} alignItems="center">
                  <CircleChart
                    id={average.id}
                    finalPercentage={average.value}
                    unit={average.unit}
                    gradientColors={
                      index % 2 === 0
                        ? ["#005E87", "rgba(44, 79, 121, 0.90)"]
                        : undefined
                    }
                  />
                  <Typography>{average.title}</Typography>
                </Stack>
              ))}
            </Box>

            <Stack
              marginTop="1rem"
              direction="row"
              justifyContent="center"
              gap="1rem"
              alignItems="center"
            >
              <Typography>زمان میانگین‌ها</Typography>
              <ContainedSelect
                labelId="change-province-label"
                id="change-province"
                label="زمان میانگین"
                value={averageTime}
                onChange={handleTimeStampChange}
                displayEmpty
                sx={{
                  paddingLeft: "2rem",
                  minWidth: "10rem",
                  height: "2.2rem",
                  background: isDark ? "#313131" : "#FFF",
                }}
              >
                {averageTimeStamp.map((time) => (
                  <MenuItem key={time.id} value={time.value}>
                    {time.title}
                  </MenuItem>
                ))}
              </ContainedSelect>
            </Stack>
          </CardContainer>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <CardContainer
            display="flex"
            flexDirection="column"
            gap="1rem"
            alignItems="center"
            paddingTop="0.88rem"
            paddingBottom="2.5rem"
            paddingX="0.75rem"
          >
            <Typography
              textAlign="right"
              alignSelf="flex-start"
              variant="h2"
              component="h4"
              marginBottom="0.88rem"
              marginRight="0.75rem"
            >
              سهم اپراتور‌ها
            </Typography>
            <Box
              sx={{
                position: "relative",
              }}
            >
              <ResponsiveContainer width={250} height={250}>
                <Treemap
                  width={200}
                  height={300}
                  data={dataForTreeChar}
                  aspectRatio={4 / 3}
                  dataKey="value"
                  content={<CustomizedContent />}
                />
              </ResponsiveContainer>
            </Box>
            <Stack
              marginTop="1rem"
              direction="row"
              justifyContent="center"
              gap="1rem"
              alignItems="center"
            >
              <Typography>انتخاب اپراتور‌ها</Typography>
              <ContainedSelect
                labelId="change-province-label"
                id="change-province"
                label="انتخاب اپراتور"
                value={selectedISP}
                onChange={handleISPChange}
                displayEmpty
                sx={{
                  paddingLeft: "2rem",
                  minWidth: "10rem",
                  height: "2.2rem",
                  background: isDark ? "#313131" : "#FFF",
                }}
              >
                {ISPs.map((isp) => (
                  <MenuItem key={isp.id} value={isp.value}>
                    {isp.title}
                  </MenuItem>
                ))}
              </ContainedSelect>
            </Stack>

            <Typography
              variant="h3"
              sx={{
                alignSelf: "flex-start",
                marginTop: ".5rem",
              }}
            >
              سهم اپراتور از کاربران
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              <Stack gap={1}>
                <Stack direction="row" gap={2} alignItems="center">
                  <Typography
                    sx={{
                      fontSize: "2rem !important",
                    }}
                  >
                    92495
                  </Typography>
                  <Typography>کاربر</Typography>
                </Stack>
                {/* <ContainedSelect
                  labelId="change-province-label"
                  id="change-province"
                  label="انتخاب اپراتور"
                  value={selectedISP}
                  onChange={handleISPChange}
                  displayEmpty
                  sx={{
                    paddingLeft: "2rem",
                    minWidth: "10rem",
                    height: "2.2rem",
                    background: isDark ? "#313131" : "#FFF",
                  }}
                >
                  {ISPs.map((isp) => (
                    <MenuItem key={isp.id} value={isp.value}>
                      {isp.title}
                    </MenuItem>
                  ))}
                </ContainedSelect> */}
                <MenuItem
                  onClick={handleClick}
                  sx={{
                    display: "flex",
                    gap: ".5rem",
                    background: isDark ? "#404040" : "#40404040",
                    borderRadius: ".5rem",
                    paddingRight: "0",
                  }}
                >
                  <img src={DownArrow} />
                  <PastData
                    value={mockDataForPastPerformance[0].value}
                    title={mockDataForPastPerformance[0].title}
                  />
                </MenuItem>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={!!anchorEl}
                  onClose={handleClose}
                >
                  {mockDataForPastPerformance.map((pastData) => (
                    <MenuItem key={pastData.id}>
                      <PastData value={pastData.value} title={pastData.title} />
                    </MenuItem>
                  ))}
                </Menu>
              </Stack>
              <CircleChart id={"this_is"} finalPercentage={26} unit={"%"} />
            </Box>
          </CardContainer>
          <Box display="flex" gap="1rem">
            <CompareTable
              title="رتبه بندی"
              showCount={3}
              shadow={false}
              detailsButton={false}
            />
          </Box>
        </Box>
        <CardContainer
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              alignSelf: "self-start",
              display: "flex",
              padding: "1rem",
              borderRadius: "1rem",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <ContainedSelect
              labelId="change-province-label"
              id="change-province"
              label="انتخاب استان"
              value={province}
              onChange={handleProvinceChange}
              displayEmpty
              sx={{
                paddingLeft: "2rem",
                minWidth: "10rem",
                height: "2.2rem",
                background: isDark ? "#313131" : "#FFF",
              }}
            >
              <MenuItem value="">انتخاب استان</MenuItem>
              {provinces.map((provinceItem) => (
                <MenuItem key={provinceItem.name} value={provinceItem.name}>
                  {provinceItem.name}
                </MenuItem>
              ))}
            </ContainedSelect>
            <ContainedSelect
              labelId="change-province-label"
              id="change-province"
              label="انتخاب اپراتور"
              value={operator}
              onChange={handleISPChangeForCharts}
              displayEmpty
              sx={{
                paddingLeft: "2rem",
                minWidth: "10rem",
                height: "2.2rem",
                background: isDark ? "#313131" : "#FFF",
              }}
            >
              <MenuItem value="">انتخاب اپراتور</MenuItem>
              {ISPList.map((isp) => (
                <MenuItem key={isp.ISPname} value={isp.ISPname}>
                  {isp.ISPname}
                </MenuItem>
              ))}
            </ContainedSelect>
            <Button
              variant="text.main"
              component={"button"}
              onClick={handleShowInfo}
              disabled={!operator || !province}
              sx={{
                borderRadius: "1rem",
                padding: "1rem",
                height: "2.2rem",
                background: "#0C6087",
                whiteSpace: "nowrap",
                color: "#FFF",
              }}
            >
              مشاهده وضعیت
            </Button>
          </Box>
          {titlesChart.map((line, index) => (
            <GridItem
              background={isDark ? "#1A1A1A" : "#FFF"}
              key={index}
              theme={theme}
              rendered={true}
              title={line.title}
              unit={line.unit}
              color={chartColors[index]}
              data={generateRandomData()}
            />
          ))}
        </CardContainer>
      </Box>
    </Box>
  );
};

const COLORS = [
  "#97C771",
  "#82ca9d",
  "#FF7A79",
  "#00C49F",
  "#B3B3B3",
  "#FF8042",
];
const CustomizedContent = (props) => {
  const {depth, x, y, width, height, index} = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={15}
        ry={15}
        style={{
          fill: depth <= 2 ? COLORS[Math.floor(index % 6)] : "none",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
    </g>
  );
};

export default ISPSummary;
