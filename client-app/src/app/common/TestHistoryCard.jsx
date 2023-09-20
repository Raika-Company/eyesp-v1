import React from "react";
import { Box, Link, Typography } from "@mui/material";
import upload from "../../app/assets/image/uploadIcon.svg";
import download from "../../app/assets/image/downloadIcon.svg";
import clockIcon from "../../app/assets/image/clockIcon.svg";
import leftArrow from "../../app/assets/image/leftArrow.svg";

const TestHistoryCard = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          width: "15rem",
          height: "18rem",
          backgroundColor: "white",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)",
          borderRadius: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginTop: "1.5em",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: " 10px",
              marginRight: " 1em",
              width: "80%",
              height: "11%",
              alignItems: "center",
            }}
          >
            <Typography variant="h7">تاریخ:</Typography>
            <Typography variant="h6" sx={{ color: "#676767" }}>
              23 مهر 1401
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: " 10px",
              marginRight: " 1em",
              width: "80%",
              height: "11%",
              alignItems: "center",
            }}
          >
            <Typography variant="h7">زمان:</Typography>
            <Typography variant="h6" sx={{ color: "#676767" }}>
              16:23:54{" "}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: " 10px",
              marginRight: " 1em",
              width: "80%",
              height: "11%",
              alignItems: "center",
            }}
          >
            <Typography variant="h7">مدت زمان تست:</Typography>
            <Typography variant="h6" sx={{ color: "#676767" }}>
              00:14{" "}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: " 10px",
              marginRight: " 1em",
              width: "80%",
              height: "11%",
              alignItems: "center",
            }}
          >
            <Typography variant="h7">نوع تست:</Typography>
            <Typography variant="h6" sx={{ color: "#676767" }}>
              دقیق{" "}
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: " 10px",
              marginRight: " 1em",
              width: "80%",
              height: "11%",
              alignItems: "center",
            }}
          >
            <Typography variant="h7">سرور:</Typography>
            <Typography variant="h6" sx={{ color: "#676767" }}>
              ایرانسل غرب{" "}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "start",
              width: "85%",
              height: "40%",
              alignItems: "center",
              backgroundColor: "#DFEEFF",
              margin: " 0 auto",
              borderRadius: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                height: "35%",
                width: "94%",
                alignItems: "center",
              }}
            >
              {" "}
              <img src={download} alt="download" />
              <img src={upload} alt="upload" />{" "}
              <img src={clockIcon} alt="clockIcon" />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                height: "20%",
                width: "90%",
                alignItems: "center",
              }}
            >
              {" "}
              <Typography sx={{ color: "#3E6389" }} variant="h7">
                23.8
              </Typography>
              <Typography sx={{ color: "#3E6389" }} variant="h7">
                23.8
              </Typography>
              <Typography sx={{ color: "#3E6389" }} variant="h7">
                23.8
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                // height: "20%",
                width: "90%",
                alignItems: "center",
              }}
            >
              {" "}
              <Typography sx={{ color: "#3E6389", fontSize: "12px" }}>
                mb/s{" "}
              </Typography>
              <Typography sx={{ color: "#3E6389", fontSize: "12px" }}>
                mb/s{" "}
              </Typography>
              <Typography sx={{ color: "#3E6389", fontSize: "12px" }}>
                ( m/s ){" "}
              </Typography>
            </Box>
            {/* <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                height: "20%",
                width: "100%",
                alignItems: "center",
                gap: "5px",
              }}
            >
              {" "}
              <Link sx={{ color: "#3E6389", fontSize: "12px" }}>
                مشاهده جزئیات{" "}
              </Link>
              <img src={leftArrow} alt="leftArrow" />
            </Box> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default TestHistoryCard;
