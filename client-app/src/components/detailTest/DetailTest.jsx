import { Box, Typography } from "@mui/material";
import React from "react";
import arrowBack from "./../../app/assets/image/arrowBack.svg";
import Switch from "@mui/material/Switch";
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

const DetailTest = () => {
  const label = { inputProps: { "aria-label": "Switch demo" } };
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
        // labels: {
        //   padding: {
        //     bottom: 10, // Add paddingBottom to legend labels
        //   },
        // },
      },
    },
    width: "100%",
    height: "100%",
  };

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
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          width: "87vw",
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
                <Switch {...label} />
              </Box>
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
                <Typography>میانگین عملکرد</Typography>
                <Switch {...label} />
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
              width: "10%",
              height: "20%",
              marginTop: "2rem",
              display: "flex",
              flexDirection: "row",
              justifyContent: "end",
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
              <Typography>میانگین عملکرد</Typography>
              <Switch {...label} />
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
              <Typography>میانگین عملکرد</Typography>
              <Switch {...label} />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default DetailTest;
