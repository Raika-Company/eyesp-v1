import { Box, Typography, Switch, alpha, colors } from "@mui/material";
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
  const [showPingLine, setShowPingLine] = useState(true);

  const [ispSwitches, setIspSwitches] = useState({
    ایرانسل: true, // Default "ایرانسل" to true
    "همراه اول": false,
    رایتل: false,
    مخابرات: false,
    شاتل: false,
  });

  // Event handler to toggle the switch state for ISP providers
  const handleIspToggle = (isp) => {
    setIspSwitches((prev) => ({ ...prev, [isp]: !prev[isp] }));
  };

  const ISPProviderSwitch = ({ name, color, checked }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
      }}
    >
      <Typography>{name}</Typography>
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            backgroundColor: "#E8E8E8",
            gap: "15px",
          }}
        >
          <Box sx={{ marginTop: "2rem" }}>
            <Typography variant="h7" sx={{ borderBottom: "1px solid gray" }}>
              لیست استان ها
            </Typography>
          </Box>
          {cities.map((city) => (
            <Box
              key={city}
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-between",
                width: "60%",
              }}
            >
              <Typography sx={{ marginTop: "3px" }}>{city}</Typography>
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
            width: "90vw",
            height: "100dvh",
            paddingTop: "4rem",
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
                width: "30%",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "star",
                alignItems: "center",
              }}
            >
              <Typography variant="h6"> هایISP میانگین عملکرد </Typography>

              <Typography sx={{ color: "#126AED" }} variant="h3">
                استان فارس
              </Typography>
            </Box>
            <img style={{ width: "2vw" }} src={arrowBack} alt="arrowBack" />
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
              <Box
                sx={{
                  marginRight: "5rem",
                  width: "80%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  justifyContent: "end",
                  gap: "60px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                >
                  <Typography>میانگین عملکرد</Typography>
                  <Switch {...label} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                >
                  <Typography>میانگین پینگ</Typography>
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
                  <Typography>میانگین سرعت</Typography>
                  <Switch {...label} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                >
                  <Typography>میانگین پکت لاس</Typography>
                  <Switch {...label} />
                </Box>
              </Box>
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
                  marginRight: "5rem",
                  marginTop: "2rem",
                  color: "#126AED",
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
                  <Line type="monotone" dataKey="irancell" stroke="#82ca9d" />
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
                width: "30%",
                height: "20%",
                marginTop: "2rem",
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
                justifyContent: "space-evenly",
                width: "100%",
                height: "20%",
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
                justifyContent: "space-evenly",
                width: "100%",
                height: "20%",
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
                <ISPProviderSwitch name="ایرانسل" />
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
