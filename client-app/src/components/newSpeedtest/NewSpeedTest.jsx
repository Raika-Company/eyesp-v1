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
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              marginTop: "4.5em",
              alignItems: "center",
            }}
          >
            <Typography variant="h2">تست سرعت</Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                width: "16%",
              }}
            >
              {" "}
              <img src={clock} alt="clock" />
              <Typography variant="h3">تست های گذشته</Typography>
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
            <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "126%",
                }}
              >
                <Typography variant="h3">ادرس IP:</Typography>
                <Typography variant="h7">129.86.45.122</Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "126%",
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
                  boxShadow: "inset  0px 0px 15px black", // Updated the color to #3686B4

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
