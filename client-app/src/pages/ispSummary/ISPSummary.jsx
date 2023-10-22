import {
  Box,
  Stack,
  Typography,
  MenuItem,
  useTheme,
  Button,
  Menu,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import {useEffect, useState} from "react";
import CardContainer from "../../app/common/CardContainer";
import CardInformation from "../../app/common/CardInformation";
import {ContainedSelect} from "../../app/common/ContainedSelect";
import CircleChart from "../../app/common/CircleChart";
import RatingComponent from "../../app/common/Rating";
import {
  Treemap,
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Area,
} from "recharts";
import CompareTable from "../dashboard/newDashboard/components/CompareTable";
import Charts from "../../app/common/Charts";
import provinces from "../../../public/data/provinces.json";
import ISPList from "../../../public/data/RowISPData.json";
import DownArrow from "../../app/assets/image/down.svg";
import provincesCoords from "../../../public/data/provincesCoords.json";
import services from "../../app/api/index";

import NewCardContainer from "../../app/common/NewCardContainer";
import {useLocation} from "react-router-dom";
import YAxisLine from "../../app/common/YAxisLine";
import xAxisLight from "../../app/assets/image/time-compare-light.svg";
import xAxisDark from "../../app/assets/image/time-compare-dark.svg";
let averageMockData = [
  {
    id: 10,
    unit: "mb/s",
    title: "سرعت دانلود",
    name: "download",
  },
  {
    id: 20,
    unit: "mb/s",
    title: "سرعت آپلود",
    name: "upload",
  },
  {
    id: 30,
    unit: "ms",
    title: "پینگ",
    name: "ping",
  },
  {
    id: 40,
    unit: "%",
    title: "پکت لاس",
    name: "packet_loss",
  },
];

const averageTimeStamp = [
  {
    id: 1,
    value: "now",
    title: "حال حاضر",
  },
  {
    id: 2,
    value: "",
    title: "سه ساعت پیش",
  },
  {
    id: 3,
    value: "today",
    title: "امروز",
  },
  {
    id: 4,
    value: "yesterday",
    title: "دیروز",
  },
  {
    id: 5,
    value: "week",
    title: "هفته گذشته",
  },
  {
    id: 6,
    value: "month",
    title: "ماه گذشته",
  },
  {
    id: 6,
    value: "year",
    title: "سال گذشته",
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
    unit: "%",
  },
  {
    title: " سرعت اپلود",
    unit: "Mb/s",
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

export function GridItem({
  theme,
  rendered,
  title,
  data,
  unit,
  color,
  background,
  selectValue,
  handleChangeDailyPercent,
}) {
  const {pathname} = useLocation();
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <NewCardContainer
      sx={{
        boxShadow: pathname === "/isp-summary" && "none",
        background: background,
        display: "flex",
        paddingInline: "3%",
        paddingBottom: "2.25rem",
        paddingTop: "1.5rem",
        borderRadius: ".75rem",
        flexBasis: "100%",
      }}
    >
      <Box display="flex" position="relative" width="92%">
        <Box sx={{width: "100%"}}>
          <Box sx={{display: "flex", height: isSmScreen ? "12.9%" : "19%"}}>
            <Typography
              color="text.main"
              variant="h1"
              component="h2"
              gutterBottom
              ml="1rem"
            >
              {title}
            </Typography>
            {title === "سرعت دانلود" && pathname === "/my-isp" && (
              <FormControl
                sx={{width: "25%", marginLeft: "3rem", height: "60px"}}
              >
                <ContainedSelect
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectValue}
                  label="سال"
                  onChange={handleChangeDailyPercent}
                  displayEmpty
                >
                  <MenuItem value="در حال حاضر">درحال حاضر</MenuItem>
                  <MenuItem value="هفتگی">هفتگی</MenuItem>
                  <MenuItem value="ماهانه">ماهانه</MenuItem>
                  <MenuItem value="سالانه">سالانه</MenuItem>
                </ContainedSelect>
              </FormControl>
            )}
          </Box>
          <Box
            borderRadius="3rem"
            paddingRight="3%"
            width="100%"
            height="250px"
          >
            {rendered && (
              <Box>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart width="100%" height="100%" data={data}>
                    <Tooltip />
                    <CartesianGrid
                      vertical={false}
                      stroke={
                        theme.palette.mode === "dark" ? "#2e2e2e" : "#E9E9E9"
                      }
                    />
                    <defs>
                      <filter
                        id="glow"
                        x="-70%"
                        y="-70%"
                        width="200%"
                        height="200%"
                      >
                        <feOffset
                          result="offOut"
                          in="SourceGraphic"
                          dx="0"
                          dy="0"
                        />
                        <feGaussianBlur
                          result="blurOut"
                          in="offOut"
                          stdDeviation="5"
                        />
                        <feBlend
                          in="SourceGraphic"
                          in2="blurOut"
                          mode="normal"
                        />
                      </filter>
                    </defs>
                    <Area
                      type="linear"
                      dataKey="value"
                      stroke={color && color.stroke}
                      fill={`url(#gradientChart${color && color.stroke})`}
                      strokeWidth={4}
                      filter="url(#glow)"
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
          max={Math.max(...data?.map((line) => line.value))}
          unit={unit}
        />
      </Box>
    </NewCardContainer>
  );
}

const ISPSummary = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [currentChartData, setCurrentChartData] = useState(generateRandomData);
  const handleShowInfo = () => {
    setCurrentChartData(generateRandomData());
  };

  const [province, setProvince] = useState("تهران");
  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const [selectedISP, setSelectedISP] = useState("irancell");
  const [dataForTreeChar, setDataForTreeChart] = useState(dataForChart);
  const handleISPChange = (event) => {
    setSelectedISP(event.target.value);
  };

  const [averageTime, setAverageTime] = useState("");
  const [averageTimeData, setAverageTimeDate] = useState(null);
  const handleTimeStampChange = (event) => {
    setAverageTime(event.target.value);
  };
  useEffect(() => {
    services.dashboard.getInternetState(averageTime).then((response) => {
      setAverageTimeDate(response.data.data);
    });
  }, [averageTime]);

  const [operator, setOperator] = useState("ایرانسل");
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
            color: value > 0 ? "text.number" : "text.number",
          }}
        >
          {value > 0 ? value + "+" : value}
        </Typography>
      </Stack>
    );
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" marginBottom="1.19rem">
        <Typography variant="h1" component="h3" color="text.secondary">
          وضعیت اپراتور ها
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" gap="1.25rem">
        <Box
          display="flex"
          flexDirection="column"
          gap="1rem"
          sx={{
            height: "78vh",
            overflow: "scroll",
            "::-webkit-scrollbar": {
              width: "0",
            },
          }}
        >
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
                variant="h1"
                component="h2"
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
              variant="h1"
              component="h2"
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
              {averageMockData.map((average, index) => (
                <Stack key={average.id} alignItems="center">
                  <CircleChart
                    id={average.id}
                    finalPercentage={
                      averageTimeData?.[average.name].percentage || 0
                    }
                    unit={average.unit}
                    variant="h1"
                    bgColor={isDark ? "none" : "#313131"}
                    textColor={isDark ? "none" : "white"}
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
            height: "78vh",
            overflow: "scroll",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            "::-webkit-scrollbar": {
              width: "0",
            },
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
              variant="h1"
              component="h2"
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
                <MenuItem
                  onClick={handleClick}
                  sx={{
                    display: "flex",
                    gap: ".5rem",
                    background: isDark ? "#404040" : "#40404040",
                    borderRadius: ".5rem",
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
              <CircleChart
                variant="h2"
                bgColor={isDark ? "none" : "#313131"}
                textColor={isDark ? "none" : "white"}
                size={100}
                id={"this_is"}
                finalPercentage={26}
              />
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
        <Box
          sx={{
            height: "76.5vh",
            overflow: "scroll",
            overflowX: "hidden",
            position: "relative",
            "::-webkit-scrollbar": {
              width: "0",
            },
          }}
        >
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
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                borderRadius: "1rem",
                backdropFilter: "blur(5px)",
                zIndex: "10",
                gap: "1rem",
                position: "sticky",
                top: "0",
                left: "0",
                right: "0",
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
                disabled={!operator && !province}
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
            <Charts
              province={Object.keys(provincesCoords).find(
                (key) => provincesCoords[key].name === province
              )}
              isp={
                ISPList.find((isp) => isp.ISPname === operator).ISPEnglishName
              }
              maxWidth="33rem"
            />
          </CardContainer>
        </Box>
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
