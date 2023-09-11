import { Box, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import download from "../../app/assets/image/download.svg";
import upload from "../../app/assets/image/upload.svg";
import ping from "../../app/assets/image/ping.svg";

function ResultTestHistory() {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const getTypographyStyles = () => ({
    // fontSize: isSmScreen ? "10px" : isMdScreen ? "14px" : "18px",
  });

  const getWidthStyles = () => {
    if (isSmScreen) return "58%";
    if (isMdScreen) return "96%";
    return "97%";
  };

  const getTransformStyles = (small, medium) => {
    if (isSmScreen) return small;
    if (isMdScreen) return medium;
    return "none";
  };

  const elements = Array(20)
    .fill()
    .map((_, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          width: getWidthStyles(),
          marginLeft: isSmScreen ? "7em" : "0",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingBottom: "2em",
          transform: "translateX(24px)",
          marginRight: "30px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            ...getTypographyStyles(),
            transform: getTransformStyles("translateX(-26px)"),
          }}
        >
          1403/12/27
        </Typography>
        <Typography
          variant="h6"
          sx={{
            ...getTypographyStyles(),
            transform: getTransformStyles("translateX(-33px)"),
          }}
        >
          ایرانسل - تهران
        </Typography>
        <Typography
          variant="h6"
          sx={{
            ...getTypographyStyles(),
            transform: getTransformStyles("translateX(-62px)", "none"),
            color: "#EF676B",
          }}
        >
          42Mbps
        </Typography>
        <Typography
          variant="h6"
          sx={{
            ...getTypographyStyles(),
            transform: getTransformStyles("translateX(-93px)", "none"),
            color: "#126AED",
          }}
        >
          62Mbps
        </Typography>
        <Typography
          variant="h6"
          sx={{
            ...getTypographyStyles(),
            transform: getTransformStyles("translateX(-125px)", "none"),
            color: "#DB7F12",
          }}
        >
          35ms
        </Typography>
      </Box>
    ));

  return (
    <>
      <Box
        sx={{
          width: isSmScreen ? "90vw" : isMdScreen ? "90vw" : "70vw",
          height: "60vdh",
          border: "2px solid #E0E0E0",
          borderRadius: "2em",
          // marginLeft: isSmScreen ? "1em" : isMdScreen ? "1em" : "10em",
          // marginTop: "2em",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "24px",
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
              flexDirection: isSmScreen ? "column" : "row-reverse",
              justifyContent: "center",
              gap: isSmScreen ? "0px" : "10px",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                marginLeft: isSmScreen ? "0px" : "1em",
                color: "textColor.light",
              }}
            >
              پینگ
            </Typography>
            <img
              style={{
                marginBottom: isSmScreen ? "5px" : "2em",
                // marginRight: isSmScreen ? "0" : "1em",
                width: isSmScreen ? "1em" : isMdScreen ? "1.5em" : "2em",
                transform: isSmScreen ? "translate(4px)" : "translate(12px)",
              }}
              src={ping}
              alt="ping"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmScreen ? "column" : "row-reverse",
              justifyContent: "center",
              transform: isSmScreen ? "translateX(0px)" : "translateX(-40px)",
              gap: isSmScreen ? "0px" : "10px",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "textColor.light",
              }}
            >
              دانلود
            </Typography>
            <img
              style={{
                marginBottom: isSmScreen ? "5px" : "2em",
                // marginRight: isSmScreen ? "0" : "1em",
                width: isSmScreen ? "1em" : isMdScreen ? "1.5em" : "2em",
              }}
              src={download}
              alt="download"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: isSmScreen ? "column" : "row-reverse",
              justifyContent: "center",
              gap: isSmScreen ? "0px" : "10px",
              transform: isSmScreen
                ? ""
                : isMdScreen
                ? "translateX(-41px)"
                : "translateX(-60px)",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "textColor.light",
              }}
            >
              آپلود
            </Typography>
            <img
              style={{
                marginBottom: isSmScreen ? "5px" : "2em",
                // marginRight: isSmScreen ? "0" : "1em",
                width: isSmScreen ? "1em" : isMdScreen ? "1.5em" : "2em",
              }}
              src={upload}
              alt="upload"
            />
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "textColor.light",
                transform: isSmScreen
                  ? "translateX(0px)"
                  : isMdScreen
                  ? "transLateX(-17px)"
                  : "translateX(-35px)",
                marginRight: isSmScreen ? "0" : "41px",
              }}
            >
              اپراتور-سرور
            </Typography>
          </Box>{" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: "textColor.light",
                transform: isSmScreen
                  ? "transLateX(-12px)"
                  : "transLateX(-30px)",
              }}
            >
              تاریخ
            </Typography>
          </Box>{" "}
        </Box>
        <Box
          sx={{
            height: "30dvh",
            borderBottomLeftRadius: "2em",
            borderBottomRightRadius: "2em",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            overflowY: "scroll", // Enable the vertical scrollbar
            marginBottom: "2em",
            direction: "rtl",
          }}
        >
          {elements}
        </Box>
      </Box>
    </>
  );
}
export default ResultTestHistory;
