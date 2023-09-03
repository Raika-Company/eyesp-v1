import {
  Box,
  Typography,
  Switch,
  alpha,
  colors,
  useMediaQuery,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

import { styled } from "@mui/material/styles";

import arrowBack from "./../../app/assets/image/arrowBack.svg";

const label = { inputProps: { "aria-label": "Color switch demo" } };

const PinkSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: colors.pink[600],
    "&:hover": {
      backgroundColor: alpha(
        colors.pink[600],
        theme.palette.action.hoverOpacity
      ),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: colors.pink[600],
  },
}));

const data = [
  {
    name: "Page A",
    irancell: 4000,
    ping: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    irancell: 3000,
    ping: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    irancell: 2000,
    ping: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    irancell: 2780,
    ping: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    irancell: 1890,
    ping: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    irancell: 2390,
    ping: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    irancell: 3490,
    ping: 4300,
    amt: 2100,
  },
];

const DetailTest = () => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [showPingLine, setShowPingLine] = useState(true);
  const [irancellLineVisible, setIrancellLineVisible] = useState(true);

  const handleIspToggle = (isp) => {
    if (isp === "ایرانسل") {
      setIrancellLineVisible((prevVisible) => !prevVisible);
    }
    setIspSwitches((prev) => ({ ...prev, [isp]: !prev[isp] }));
  };
  const [ispSwitches, setIspSwitches] = useState({
    ایرانسل: true, // Default "ایرانسل" to true
    "همراه اول": false,
    رایتل: false,
    مخابرات: false,
    شاتل: false,
  });

  // Event handler to toggle the switch state for ISP providers

  const ISPProviderSwitch = ({ name, color, checked }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: isSmScreen ? "13px" : "18px" }}>
        {name}
      </Typography>
      {color === "pink" ? (
        <PinkSwitch
          {...label}
          checked={checked}
          onChange={() => handleIspToggle(name)}
        />
      ) : (
        <Switch
          {...label}
          color={color}
          checked={checked}
          onChange={() => handleIspToggle(name)}
        />
      )}
    </Box>
  );

  const cities = [
    "فارس",
    "تهران",
    "اصفهان",
    "مشهد",
    "اهواز",
    "تبریز",
    "مازندران",
    "سمنان",
    "خوزستان",
    "گیلان",
  ];

  const [citySwitches, setCitySwitches] = useState(
    cities.reduce((acc, city) => {
      acc[city] = city === "تهران"; // Default "تهران" to true, others to false
      return acc;
    }, {})
  );

  // Event handler to toggle the switch state
  const handleToggle = (city) => {
    setCitySwitches((prev) => ({ ...prev, [city]: !prev[city] }));
  };

  function MobileToggleSwitch() {
    return (
      <Box
        sx={{
          marginRight: "1rem",
          width: "80%",
          height: "100%",
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "center",
          justifyContent: "end",
        }}
      >
        <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: isSmScreen ? "11px" : isMdScreen ? "13px" : "",
              }}
            >
              میانگین عملکرد
            </Typography>
            <Switch {...label} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: isSmScreen ? "11px" : isMdScreen ? "13px" : "",
              }}
            >
              میانگین عملکرد
            </Typography>
            <Switch {...label} />
          </Box>
        </Box>
        <Box sx={{ width: "50%", display: "flex", flexDirection: "column" }}>
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: isSmScreen ? "11px" : isMdScreen ? "13px" : "",
              }}
            >
              میانگین عملکرد
            </Typography>
            <Switch {...label} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: isSmScreen ? "11px" : isMdScreen ? "13px" : "",
              }}
            >
              میانگین عملکرد
            </Typography>
            <Switch {...label} />
          </Box>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: isMdScreen ? "13px" : isXsScreen ? "10px" : "",
            }}
          >
            میانگین عملکرد
          </Typography>
          <Switch {...label} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: isMdScreen ? "13px" : isXsScreen ? "10px" : "",
            }}
          >
            میانگین پینگ
          </Typography>
          <Switch
            {...label}
            checked={showPingLine}
            onChange={() => setShowPingLine((prev) => !prev)}
          />{" "}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: isMdScreen ? "13px" : isXsScreen ? "10px" : "",
            }}
          >
            میانگین سرعت
          </Typography>
          <Switch {...label} />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: isMdScreen ? "13px" : isXsScreen ? "10px" : "",
            }}
          >
            میانگین پکت لاس
          </Typography>
          <Switch {...label} />
        </Box> */}
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Box
          sx={{
            width: "10vw",
            display: isSmScreen ? "none" : "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            backgroundColor: "#E8E8E8",
            gap: "15px",
          }}
        >
          <Box sx={{ marginTop: "2rem" }}>
            <Typography
              variant="h7"
              sx={{
                borderBottom: "1px solid gray",
                fontSize: isMdScreen ? "10px" : isSmScreen ? "4px" : "",
              }}
            >
              لیست استان ها
            </Typography>
          </Box>
          {cities.map((city) => (
            <Box
              key={city}
              sx={{
                display: "flex",
                flexDirection: isMdScreen
                  ? "column"
                  : isXsScreen
                  ? "column"
                  : "row-reverse",
                justifyContent: "space-between",
                width: "60%",
                alignItems: isXsScreen
                  ? "center"
                  : isMdScreen
                  ? "center"
                  : "normal",
              }}
            >
              <Typography
                sx={{
                  marginTop: "3px",
                  fontSize: isMdScreen ? "10px" : isXsScreen ? "8px" : "",
                }}
              >
                {city}
              </Typography>
              <Switch
                {...label}
                checked={citySwitches[city] || false} // Use the state to determine if it's checked
                onChange={() => handleToggle(city)}
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: isSmScreen ? "100vw" : "90vw",
            height: "100dvh",
            paddingTop: "2rem",
            gap: "2rem",
          }}
        >
          {" "}
          <Box
            sx={{
              width: "93%",
              height: "7%",
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: isSmScreen ? "80%" : "70%",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "star",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: isSmScreen ? "16px" : isMdScreen ? "20px" : "30px",
                }}
              >
                {" "}
                هایISP میانگین عملکرد{" "}
              </Typography>

              <Typography
                sx={{
                  fontSize: isSmScreen ? "18px" : isMdScreen ? "20px" : "h3",
                  color: "#126AED",
                  marginRight: "1rem",
                }}
                variant="h3"
              >
                استان فارس
              </Typography>
            </Box>
            <img
              style={{ width: isSmScreen ? "5vw" : "2vw" }}
              src={arrowBack}
              alt="arrowBack"
            />
          </Box>
          <Box
            sx={{
              width: "93%",
              height: "48%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              border: "2px solid #E0E0E0",
              borderRadius: "2em",
              backgroundColor: "#E8E8E8",
            }}
          >
            <Box
              sx={{
                width: "102%",
                height: "10%",
                marginTop: "2rem",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "end",
              }}
            >
              {isSmScreen ? (
                <MobileToggleSwitch />
              ) : (
                <Box
                  sx={{
                    marginRight: isMdScreen
                      ? "11rem"
                      : isXsScreen
                      ? "1rem"
                      : "5rem",
                    width: "80%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    justifyContent: "end",
                    gap: isMdScreen ? "1px" : isXsScreen ? "1px" : "60px",
                    flexWrap: isMdScreen
                      ? "wrap"
                      : isXsScreen
                      ? "none"
                      : "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isMdScreen
                          ? "13px"
                          : isXsScreen
                          ? "10px"
                          : "",
                      }}
                    >
                      میانگین عملکرد
                    </Typography>
                    <Switch {...label} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isMdScreen
                          ? "13px"
                          : isXsScreen
                          ? "10px"
                          : "",
                      }}
                    >
                      میانگین پینگ
                    </Typography>
                    <Switch
                      {...label}
                      checked={showPingLine}
                      onChange={() => setShowPingLine((prev) => !prev)}
                    />{" "}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isMdScreen
                          ? "13px"
                          : isXsScreen
                          ? "10px"
                          : "",
                      }}
                    >
                      میانگین سرعت
                    </Typography>
                    <Switch {...label} />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row-reverse",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: isMdScreen
                          ? "13px"
                          : isXsScreen
                          ? "10px"
                          : "",
                      }}
                    >
                      میانگین پکت لاس
                    </Typography>
                    <Switch {...label} />
                  </Box>
                </Box>
              )}

              <Box sx={{ width: "20%" }}></Box>
            </Box>
            <Box
              sx={{
                width: "102%",
                height: "10%",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  marginRight: isSmScreen ? "3rem" : "5rem",
                  marginTop: "2rem",
                  color: "#126AED",
                  fontSize: isSmScreen ? "16px" : "20px",
                }}
              >
                98%
              </Typography>
            </Box>
            <Box
              sx={{
                width: "99%",
                height: "80%",
                alignItems: "center",
                marginTop: "1rem",
              }}
            >
              {" "}
              {/* <Line responsive="true" options={options} data={data} /> */}
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {/* Conditionally render the ping line */}
                  {showPingLine && (
                    <Line
                      type="monotone"
                      dataKey="ping"
                      stroke="#126AED"
                      activeDot={{ r: 8 }}
                    />
                  )}
                  {irancellLineVisible && (
                    <Line
                      type="monotone"
                      dataKey="irancell"
                      stroke="#82ca9d"
                      activeDot={{ r: 8 }}
                    />
                  )}{" "}
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Box>
          <Box
            sx={{
              width: "93%",
              height: "35%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              alignItems: "center",
              border: "2px solid #E0E0E0",
              borderRadius: "2em",
              backgroundColor: "#E8E8E8",
            }}
          >
            <Box
              sx={{
                width: isSmScreen ? "52%" : "30%",
                height: "20%",
                marginTop: isSmScreen ? "1rem" : "2rem",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              {" "}
              <Typography>ارایه دهنده های اینترنت</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: isSmScreen ? "center" : "space-evenly",
                width: "100%",
                height: isSmScreen ? "34%" : "20%",
                flexWrap: isSmScreen ? "wrap" : "none",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch
                  name="ایرانسل"
                  color="success"
                  checked={ispSwitches["ایرانسل"]}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch name="همراه اول" color="secondary" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch name="رایتل" color="warning" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch name="مخابرات" color="success" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch name="شاتل" color="pink" />
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: isSmScreen ? "center" : "space-evenly",
                width: "100%",
                height: isSmScreen ? "34%" : "20%",
                flexWrap: isSmScreen ? "wrap" : "none",
              }}
            >
              {" "}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch
                  name="ایرانسل"
                  color="success"
                  checked={ispSwitches["ایرانسل"]}
                />{" "}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch name="همراه اول" color="secondary" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch name="رایتل" color="warning" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch name="مخابرات" color="success" />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch name="شاتل" color="pink" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailTest;
