import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import NewLogo from "../../app/common/NewLogo";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import {
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import chartData from "../../../public/data/myISPChartData.json";
import { useEffect, useState } from "react";
import xAxis from "../../app/assets/image/xAxis.svg";
import yAxis from "../../app/assets/image/yAxis.svg";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const FormControlItems = ["انتخاب اپراتور", "سالیانه", "1400", "استان"];
const data = [
  ["ایرانسل", "همراه اول", "رایتل", "شاتل", "آسیاتک", "مخابرات"],
  ["سالیانه", "ماهیانه", "هفتگی", "روزانه", "ساعتی"],
  ["1402", "1401", "1400", "1399", "1398", "1397"],
  ["بندرعباس", "شیراز", "مشهد", "اصفهان", "مازندران", "تهران"],
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NewOperatorPerformance = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonClick = (index) => {
    setSelectedButton(index);
  };

  const theme = useTheme();
  const bgColor = theme.palette.mode === "light" ? "#f7f9fc" : "#2a2c2f";
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName((prevPersonName) => {
      const newPersonName = [...prevPersonName];
      newPersonName[index] =
        typeof value === "string" ? value.split(",") : value;
      return newPersonName;
    });
  };

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
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Box
            sx={{
              width: 200,
            }}
          >
            <Typography fontSize="1.5rem" fontWeight={700}>
              نمودار عملکرد اپراتور
            </Typography>
          </Box>
          <Box>
            {data.map((group, index) => (
              <FormControl
                key={FormControlItems[index]}
                value={FormControlItems[index]}
                sx={{
                  m: "0.4rem",
                  width: 150,
                  borderRadius: "25px",
                  position: "relative",
                }}
              >
                <Select
                  sx={{
                    borderRadius: "25px",
                    display: "flex",
                    justifyContent: "space-between",
                    height: "38px",
                  }}
                  multiple
                  displayEmpty
                  value={personName[index] || []}
                  onChange={(event) => handleChange(event, index)}
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <span>{FormControlItems[index]}</span>;
                    }
                    return selected.join(", ");
                  }}
                  MenuProps={MenuProps}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled>
                    <span>{FormControlItems[index]}</span>
                  </MenuItem>
                  {group.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, personName[index] || [], theme)}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          </Box>
          <Box
            sx={{
              bgcolor: "#F4F4F4",
              borderRadius: "25px",
              p: "0.3rem",
              width: "230px",
              boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.10) inset",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {["مقایسه", "مشاهده تکی"].map((text, index) => (
              <Button
                key={text}
                sx={{
                  width: index === 0 ? "95px" : "125px",
                  borderRadius: "25px",
                  fontSize: "1rem",
                  color: selectedButton === index ? "white" : "#989898",
                  backgroundColor:
                    selectedButton === index ? "#259FDA" : "transparent",
                }}
                onClick={() => handleButtonClick(index)}
              >
                {text}
              </Button>
            ))}
          </Box>
        </Box>
        <Grid container>
          <Grid xs={12} md={6} padding="2rem">
            <Box display="flex">
              <Box>
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
                              <stop
                                offset="1"
                                stopColor="#008EDD"
                                stopOpacity="0"
                              />
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
          <Grid xs={12} md={6} padding="2rem">
            <Box display="flex">
              <Box>
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
                              <stop
                                offset="1"
                                stopColor="#008EDD"
                                stopOpacity="0"
                              />
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
          <Grid xs={12} md={6} padding="2rem">
            <Box display="flex">
              <Box>
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
                              <stop
                                offset="1"
                                stopColor="#008EDD"
                                stopOpacity="0"
                              />
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
          <Grid xs={12} md={6} padding="2rem">
            <Box display="flex">
              <Box>
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
                              <stop
                                offset="1"
                                stopColor="#008EDD"
                                stopOpacity="0"
                              />
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
        </Grid>
      </Box>
    </Container>
  );
};

export default NewOperatorPerformance;
