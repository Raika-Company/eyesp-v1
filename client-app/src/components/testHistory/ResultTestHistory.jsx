import { Box } from "@mui/material";
import React from "react";
import download from "../../app/assets/image/download.svg";
import upload from "../../app/assets/image/upload.svg";
import ping from "../../app/assets/image/ping.svg";
import "./ResultTestHistory.css";

function ResultTestHistory() {
  const elements = Array(20)
    .fill()
    .map((_, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-around",
          paddingBottom: "2em",
        }}
      >
        <typography>1403/12/27</typography>
        <typography>ایرانسل - تهران</typography>
        <typography style={{ transform: "translateX(-9px)", color: "#EF676B" }}>
          42Mbps
        </typography>
        <typography
          style={{ transform: "translateX(-63px)", color: "#126AED" }}
        >
          62Mbps
        </typography>
        <typography
          style={{
            marginLeft: "11em",
            transform: "translateX(-132px)",
            color: "#DB7F12",
          }}
        >
          35ms
        </typography>
      </Box>
    ));
  return (
    <>
      <Box
        sx={{
          width: "60em",
          height: "20em",
          border: "2px solid #E0E0E0",
          borderRadius: "2em",
          margin: " 3em auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: "1em",
            borderBottom: "2px solid #E0E0E0",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <img
              style={{
                marginBottom: "2em",
                marginRight: "10px",
                transform: "translate(12px)",
              }}
              src={ping}
              alt="ping"
            />

            <typography style={{ marginLeft: "1em" }}>پینگ</typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <img
              style={{ marginBottom: "2em", marginRight: "1em" }}
              src={download}
              alt="ping"
            />

            <typography>دانلود</typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <img
              style={{ marginBottom: "2em", marginRight: "1em" }}
              src={upload}
              alt="ping"
            />

            <typography>آپلود</typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <typography>اپراتور-سرور</typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <typography>تاریخ</typography>
          </Box>{" "}
        </Box>
        <Box
          sx={{
            height: "70%",
            borderBottomLeftRadius: "2em",
            borderBottomRightRadius: "2em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            marginTop: "1em",
            overflowY: "scroll", // Add a scroll bar for overflow content
            scrollbarColor: "blue",
          }}
          className="custom-scrollbar"
        >
          {elements}
        </Box>
      </Box>
    </>
  );
}

export default ResultTestHistory;
