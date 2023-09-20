import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NewLogo from "../../app/common/NewLogo";
import TestHistoryCard from "../../app/common/TestHistoryCard";

import "./NewTestHistory.css";
import { Link } from "react-router-dom";
const NewTestHistory = () => {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down("md"));
  const isXS = useMediaQuery(theme.breakpoints.only("xs"));
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          overflow: "hidden",
        }}
      >
        <NewLogo />
        <Box
          borderbottomleftradius="2em"
          borderbottomrightradius="2em"
          mt={2}
          pb={2}
          sx={{
            height: "85%",
            width: "100%",
            backgroundColor: "#F7FAFD",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "2rem",
            gap: "3em",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <Box
            sx={{
              height: "10%",
              width: "88%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.5em",
              alignItems: "center",
            }}
          >
            <Typography variant={isXS ? "h5" : isMD ? "h3" : "h2"}>
              تست‌های گذشته
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: isXS ? "50%" : isMD ? "60%" : "36%",
                alignItems: "center",
              }}
            >
              {" "}
              <Button
                component={Link}
                to="/new/"
                sx={{
                  borderRadius: "2rem",
                  width: "40%",
                  backgroundColor: "#259FDA",
                  color: "#ffffff",
                }}
              >
                انجام تست
              </Button>
              <Typography variant={isXS ? "h5" : isMD ? "h4" : "h3"}>
                {" "}
                آدرس IP :{" "}
              </Typography>
              <Typography variant={isXS ? "h6" : isMD ? "h5" : "h4"}>
                {" "}
                192.168.0.129{" "}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
              height: "50%",
              width: "87%",
              borderRadius: "2rem",
            }}
          >
            <Typography variant={isXS ? "h5" : isMD ? "h4" : "h3"}>
              امروز
            </Typography>
            <Box gap={3} sx={{ display: "flex", justifyContent: "flex-start" }}>
              <TestHistoryCard />
              <TestHistoryCard />
              <TestHistoryCard />
              <TestHistoryCard />
              <TestHistoryCard />
            </Box>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "50%",
              width: "87%",
              gap: "1em",

              borderRadius: "2rem",
            }}
          >
            <Typography variant={isXS ? "h5" : isMD ? "h4" : "h3"}>
              هفته گذشته
            </Typography>
            <Box gap={3} sx={{ display: "flex", justifyContent: "flex-start" }}>
              <TestHistoryCard />
              <TestHistoryCard />
              <TestHistoryCard />
              <TestHistoryCard />
            </Box>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "50%",
              gap: "1em",
              width: "87%",

              borderRadius: "2rem",
            }}
          >
            <Typography variant={isXS ? "h5" : isMD ? "h4" : "h3"}>
              ماه گذشته
            </Typography>
            <Box
              gap={3}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <TestHistoryCard />
              <TestHistoryCard />
              <TestHistoryCard />
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default NewTestHistory;
