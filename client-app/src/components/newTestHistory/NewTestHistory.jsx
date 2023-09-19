import React from "react";
import { Box, Container, Typography, Button, Link } from "@mui/material";
import NewLogo from "../../app/common/NewLogo";
import TestHistoryCard from "../../app/common/TestHistoryCard";
import "./NewTestHistory.css";
const NewTestHistory = () => {
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
          sx={{
            height: "85%",
            width: "100%",
            backgroundColor: "#F7FAFD",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "2rem",
            gap: "3em",
            overflow: "auto",
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
            <Typography variant="h2">تست‌های گذشته</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "40%",
                alignItems: "center",
              }}
            >
              {" "}
              <Button
                sx={{
                  borderRadius: "2rem",
                  width: "40%",
                  backgroundColor: "#259FDA",
                  color: "#ffffff",
                }}
              >
                انجام تست
              </Button>
              <Typography variant="h3"> آدرس IP : </Typography>
              <Typography variant="h4"> 192.168.0.129 </Typography>
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
            <Typography variant="h5">امروز</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
            <Typography variant="h5">امروز</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
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
              gap: "1em",

              width: "87%",
              borderRadius: "2rem",
            }}
          >
            <Typography variant="h5">امروز</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <TestHistoryCard />
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
