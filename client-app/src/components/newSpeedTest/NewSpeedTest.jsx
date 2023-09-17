import React from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import NewLogo from "../../app/common/NewLogo";
import clock from "../../app/assets/image/clock.svg";
import { styled } from "@mui/material/styles";

const TRANSPARENT_BLUE = "rgba(54, 129, 241, 0.8)";

const NewSpeedTest = () => {
  const AnimatedButton = styled(Button)(({ theme }) => ({
    position: "relative",
    overflow: "visible",
    "&::after": {
      content: '""',
      position: "absolute",
      top: "-5px",
      left: "-5px",
      right: "-5px",
      bottom: "-5px",
      borderRadius: "50%",
      border: `6px solid ${TRANSPARENT_BLUE}`,
      animation: "ringAnimation 3s infinite",
      transform: "scale(1)",
      opacity: 0.6,
    },
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
  }));
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
            height: "60%",
            width: "100%",
            borderRadius: "2rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "10%",
              width: "85%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4.5em",
              alignItems: "center",
            }}
          >
            <Typography>تست سرعت</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "16%",
              }}
            >
              {" "}
              <img src={clock} alt="clock" />
              <Typography>تست های گذشته</Typography>
            </Box>
          </Box>
          <Box
            sx={{
              height: "60%",
              width: "60%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "126%",
                }}
              >
                <Typography>ادرس IP:</Typography>
                <Typography>129.86.45.122</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "126%",
                }}
              >
                <Typography>سرور:</Typography>
                <Typography>ایرانسل-تهران</Typography>
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
                  borderColor: "transparent",
                  borderWidth: "6px",
                  borderStyle: "solid",
                  border: "3px solid rgba(54, 129, 241, 0.8)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  boxShadow:
                    "inset 0 0 0 4px transparent, 0 0 0 4px transparent",
                  fontSize: "4rem",
                  fontWeight: "400",
                  lineHeight: "normal",
                  fontStyle: "normal",
                  paddingTop: "2rem",
                }}
                variant="outlined"
              >
                شروع
              </AnimatedButton>
            </Box>
            <Box>nnnnn</Box>
          </Box>
          {/* <Box
            sx={{
              position: "absolute",
              backgroundColor: "red",
              height: "20%",
              width: "70%",
              borderRadius: "2rem",
              float: "center",
            }}
          ></Box> */}
        </Box>
      </Box>
    </Container>
  );
};

export default NewSpeedTest;
