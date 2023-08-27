import { Box } from "@mui/material";
import React from "react";
import download from "../../app/assets/image/download.svg";
import upload from "../../app/assets/image/upload.svg";
import ping from "../../app/assets/image/ping.svg";

function ResultTestHistory() {
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
              style={{ marginBottom: "2em", marginRight: "1em" }}
              src={ping}
              alt="ping"
            />

            <p>پینگ</p>
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

            <p>دانلود</p>
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

            <p>آپلود</p>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <p>اپراتور-سرور</p>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <p>تاریخ</p>
          </Box>{" "}
        </Box>
      </Box>
    </>
  );
}

export default ResultTestHistory;
