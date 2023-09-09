import { Box, Typography, Switch, useMediaQuery } from "@mui/material";
import { useState } from "react";
import ChartDetail from "./ChartDetail";
import OperatorsDetail from "./OperatorsDetail";
import ArrowBack from "../../app/common/ArrowBack";
import ChoseCityDrawer from "../../app/common/ChoseCityDrawer";
const label = { inputProps: { "aria-label": "Color switch demo" } };
const DetailTest = () => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [ispVisibility, setIspVisibility] = useState({
    ایرانسل: true,
    همراه_اول: false,
    رایتل: false,
    شاتل: false,
    مخابرات: false,
  });

  const cities = [
    "فارس",
    "تهران",
    "اصفهان",
    "مشهد",
    "اهواز",
    "تبریز",
    "مازندران",
    "سمنان",
    "خوزستان",
    "گیلان",
  ];

  const [citySwitches, setCitySwitches] = useState(
    cities.reduce((acc, city) => {
      acc[city] = city === "فارس";
      return acc;
    }, {})
  );

  // Event handler to toggle the switch state
  const handleToggle = (city) => {
    setCitySwitches((prev) => ({ ...prev, [city]: !prev[city] }));
  };

  return (
    <>
      <Box
        sx={{
          direction: "ltr",
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Box
          sx={{
            width: "10vw",
            display: isSmScreen ? "none" : "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            backgroundColor: "#E8E8E8",
            gap: "15px",
          }}
        >
          <Box sx={{ marginTop: "2rem" }}>
            <Typography
              variant="h7"
              sx={{
                borderBottom: "1px solid gray",
                fontSize: isMdScreen ? "10px" : isSmScreen ? "4px" : "",
              }}
            >
              لیست استان ها
            </Typography>
          </Box>
          {cities.map((city) => (
            <Box
              key={city}
              sx={{
                display: "flex",
                flexDirection: isMdScreen
                  ? "column"
                  : isXsScreen
                  ? "column"
                  : "row-reverse",
                justifyContent: "space-between",
                width: "60%",
                alignItems: isXsScreen
                  ? "center"
                  : isMdScreen
                  ? "center"
                  : "normal",
              }}
            >
              <Typography
                sx={{
                  marginTop: "3px",
                  fontSize: isMdScreen ? "10px" : isXsScreen ? "8px" : "",
                }}
              >
                {city}
              </Typography>
              <Switch
                {...label}
                checked={citySwitches[city] || false}
                onChange={() => handleToggle(city)}
              />
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: isSmScreen ? "100vw" : "90vw",
            height: "100dvh",
            paddingTop: "2rem",
            gap: "2rem",
          }}
        >
          {" "}
          <Box
            sx={{
              width: "93%",
              height: isSmScreen ? "2%" : "7%",
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: isSmScreen ? "80%" : "70%",
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "star",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: isSmScreen ? "16px" : isMdScreen ? "20px" : "30px",
                }}
              >
                {" "}
                هایISP میانگین عملکرد{" "}
              </Typography>

              {isSmScreen ? (
                <ChoseCityDrawer />
              ) : (
                <Box>
                  {" "}
                  <Typography
                    sx={{
                      fontSize: isSmScreen
                        ? "18px"
                        : isMdScreen
                        ? "20px"
                        : "h3",
                      color: "#126AED",
                    }}
                    variant="h3"
                  >
                    استان فارس
                  </Typography>
                </Box>
              )}
            </Box>
            <Box>
              {" "}
              <ArrowBack />
            </Box>
          </Box>
          <ChartDetail visibility={ispVisibility} />
          <OperatorsDetail
            visibility={ispVisibility}
            setVisibility={setIspVisibility}
          />
        </Box>
      </Box>
    </>
  );
};

export default DetailTest;
