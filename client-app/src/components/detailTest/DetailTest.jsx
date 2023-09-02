import React from "react";
import { Box, Typography, Switch, alpha, colors } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import faker from "faker";
import arrowBack from "./../../app/assets/image/arrowBack.svg";

// Register chart components outside of the component render method
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
      align: "start",
    },
  },
  width: "100%",
  height: "100%",
};

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

const ISPProviderSwitch = ({ name, color }) => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row-reverse",
      alignItems: "center",
    }}
  >
    <Typography>{name}</Typography>
    {color === "pink" ? (
      <PinkSwitch {...label} defaultChecked />
    ) : (
      <Switch {...label} defaultChecked color={color} />
    )}
  </Box>
);

const DetailTest = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "دانلود",
        data: labels.map(() => faker.random.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "آپلود",
        data: labels.map(() => faker.random.number({ min: -1000, max: 1000 })),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
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
            gap: "5px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>شیراز</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>اصفهان</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>یزد</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>خراسان جنوبی</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>خراسان شمالی</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>مازندران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>سمنان</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>خوزستان</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>گیلان</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تبریز</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>کهکیلویه</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>کرج</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "start",
            }}
          >
            <Typography sx={{ marginTop: "3px" }}>تهران</Typography>
            <Switch {...label} defaultChecked />
          </Box>
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
              height: "40%",
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
                width: "100%",
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
                  <Switch {...label} defaultChecked />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                >
                  <Typography>میانگین پینگ</Typography>
                  <Switch {...label} defaultChecked />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                >
                  <Typography>میانگین سرعت</Typography>
                  <Switch {...label} defaultChecked />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                  }}
                >
                  <Typography>میانگین پکت لاس</Typography>
                  <Switch {...label} defaultChecked />
                </Box>
              </Box>
              <Box sx={{ width: "20%" }}></Box>
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "10%",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Typography sx={{ marginRight: "5rem" }}>98%</Typography>
            </Box>
            <Box
              sx={{
                marginLeft: "3rem",
                width: "95%",
                height: "80%",
                alignItems: "center",
              }}
            >
              {" "}
              <Line responsive="true" options={options} data={data} />
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
