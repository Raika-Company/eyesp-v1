import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NewLogo from "../../app/common/NewLogo";
import clock from "../../app/assets/image/clock.svg";
import { styled } from "@mui/material/styles";
import "./NewSpeedTest.css";
import iLogo from "../../app/assets/image/iLogo.svg";
import leftArrow from "../../app/assets/image/leftArrow.svg";
import upload from "../../app/assets/image/uploadIcon.svg";
import download from "../../app/assets/image/downloadIcon.svg";
import clockIcon from "../../app/assets/image/clockIcon.svg";

const NewSpeedTest = () => {
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.down("md"));
  const isXS = useMediaQuery(theme.breakpoints.only("xs"));
  const AnimatedButton = styled(Button)(({ theme }) => ({
    position: "relative",
    overflow: "visible",
    border: "none",

    "@keyframes ringAnimation": {
      "0%": {
        transform: "scale(1)",
        opacity: 0.6,
      },
      "100%": {
        transform: "scale(1.3)",
        opacity: 0,
      },
    },
    "&:focus": {
      outline: "none", // remove the default browser focus outline
    },
    "&:hover": {
      border: "none", // you can add this if you don't want any border on hover
    },
  }));

  const MobileIP = () => {
    return (
      <>
        <Box
          sx={{
            height: "60%",
            width: isMD ? "88%" : "73%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: "20px",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                gap: "20px",
              }}
            >
              <Typography sx={{ color: "#676767" }} variant="h4">
                ادرس IP:
              </Typography>
              <Typography variant="h7">129.86.45.122</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ color: "#676767" }} variant="h3">
                سرور:
              </Typography>
              <Typography variant="h7">ایرانسل-تهران</Typography>
            </Box>
          </Box>
          <Box>
            {" "}
            <AnimatedButton
              // onClick={handleButtonClick}
              sx={{
                height: "clamp(10rem,10rem + 10vmin,16rem)",
                width: "clamp(10rem,10rem + 10vmin,16rem)",
                borderRadius: "50%",
                // borderWidth: "6px",
                // backgroundOrigin: "border-box",
                boxShadow: "inset  0px 0px 20px #9C9C9C", // Updated the color to #3686B4

                fontSize: "2rem",
                fontWeight: "400",
                lineHeight: "normal",
                fontStyle: "normal",
                color: "black",
              }}
              variant="outlined"
            >
              شروع
            </AnimatedButton>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "12px",
            }}
            className="btn-container"
          >
            <label className="switch btn-color-mode-switch">
              <input
                type="checkbox"
                name="color_mode"
                id="color_mode"
                value="1"
              />
              <label
                htmlFor="color_mode"
                data-on="تست فوری"
                data-off="تست دقیق"
                className="btn-color-mode-switch-inner"
              ></label>
            </label>
            <Box
              sx={{
                width: "96%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Typography variant="h7">نوع تست</Typography>
              <img src={iLogo} alt="iLogo" />
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h7">برای دریافت اطلاعات بر روی </Typography>
          <Typography variant="h7">دکمه شروع کلیک کنید </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "50%",
            marginTop: "1.5em",
            alignItems: "flex-start",
            width: "80%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <img src={clockIcon} alt="clockIcon" />
            <img
              style={{
                transform: "translateX(16px)",
              }}
              src={download}
              alt="clockIcon"
            />
            <img
              style={{
                transform: "translateX(16px)",
              }}
              src={upload}
              alt="clockIcon"
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography variant="body">پینگ</Typography>
            <Typography variant="body">سرعت دانلود</Typography>{" "}
            <Typography variant="body">سرعت اپلود</Typography>{" "}
          </Box>
          {/* <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <img src={clockIcon} alt="clockIcon" />

            <Typography variant="h6">پینگ:</Typography>
          </Box>{" "}
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <img src={download} alt="clockIcon" />
            <Typography variant="h6">سرعت دانلود:</Typography>{" "}
          </Box>{" "}
          <Box sx={{ display: "flex", justifyContent: "center", gap: "10px" }}>
            <img src={upload} alt="clockIcon" />
            <Typography variant="h6">سرعت اپلود:</Typography>{" "}
          </Box> */}
        </Box>{" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: "white",
            height: "20%",
          }}
        ></Box>{" "}
      </>
    );
  };
  return (
    <Container maxWidth="xl">
      <Box
        sx={{
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <NewLogo />
        <Box
          sx={{
            backgroundColor: "#ffffff",
            height: isXS ? "80%" : "72%",
            width: "100%",
            borderRadius: "2rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "2em",
            gap: isXS ? "33px" : isMD ? "33px" : "0px",
          }}
        >
          <Box
            sx={{
              height: "10%",
              width: isMD ? "88%" : "80%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1.5em",
              alignItems: "center",
            }}
          >
            <Typography variant={isMD ? "h4" : "h2"}>تست سرعت</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "10px",
                width: isXS ? "52%" : isMD ? "40%" : "41%",
              }}
            >
              {" "}
              <img src={clock} alt="clock" />
              <Typography variant={isXS ? "body1" : isMD ? "h4" : "h2"}>
                تست های گذشته
              </Typography>
            </Box>
          </Box>
          {isMD ? (
            <MobileIP />
          ) : (
            <>
              <Box
                sx={{
                  height: "60%",
                  width: isMD ? "88%" : "73%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h3">ادرس IP:</Typography>
                    <Typography variant="h7">129.86.45.122</Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="h3">سرور:</Typography>
                    <Typography variant="h7">ایرانسل-تهران</Typography>
                  </Box>
                </Box>
                <Box>
                  {" "}
                  <AnimatedButton
                    // onClick={handleButtonClick}
                    sx={{
                      height: "clamp(10rem,10rem + 10vmin,16rem)",
                      width: "clamp(10rem,10rem + 10vmin,16rem)",
                      borderRadius: "50%",
                      // borderWidth: "6px",
                      // backgroundOrigin: "border-box",
                      boxShadow: "inset  0px 0px 20px #9C9C9C", // Updated the color to #3686B4

                      fontSize: "2rem",
                      fontWeight: "400",
                      lineHeight: "normal",
                      fontStyle: "normal",
                      color: "black",
                    }}
                    variant="outlined"
                  >
                    شروع
                  </AnimatedButton>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "12px",
                  }}
                  className="btn-container"
                >
                  <label className="switch btn-color-mode-switch">
                    <input
                      type="checkbox"
                      name="color_mode"
                      id="color_mode"
                      value="1"
                    />
                    <label
                      htmlFor="color_mode"
                      data-on="تست فوری"
                      data-off="تست دقیق"
                      className="btn-color-mode-switch-inner"
                    ></label>
                  </label>
                  <Box
                    sx={{
                      width: "96%",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography variant="h7">نوع تست</Typography>
                    <img src={iLogo} alt="iLogo" />
                  </Box>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "start",
                  position: "absolute",
                  backgroundColor: "white",
                  height: "30%",
                  width: "70%",
                  borderRadius: "2rem",
                  bottom: "-80px",
                  boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.5)",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    height: "40%",
                    marginTop: "1.5em",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <img src={clockIcon} alt="clockIcon" />

                    <Typography variant="h6">پینگ:</Typography>
                  </Box>{" "}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <img src={download} alt="clockIcon" />
                    <Typography variant="h6">سرعت دانلود:</Typography>{" "}
                  </Box>{" "}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    <img src={upload} alt="clockIcon" />
                    <Typography variant="h6">سرعت اپلود:</Typography>{" "}
                  </Box>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    backgroundColor: "white",
                    height: "20%",
                  }}
                >
                  <Typography variant="h7">
                    برای دریافت اطلاعات بر روی دکمه شروع کلیک کنید.
                  </Typography>
                </Box>{" "}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "end",
                    alignItems: "center",
                    width: "95%",
                    height: "10%",
                    gap: "5px",
                  }}
                >
                  <Link variant="h7">مشاهده جزئیات </Link>
                  <img src={leftArrow} alt="leftArrow" />
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
};

export default NewSpeedTest;
