import { useState } from "react";
import { Box, Typography, Switch, useMediaQuery, Card } from "@mui/material";
import ChartDetail from "./ChartDetail";
import OperatorsDetail from "./OperatorsDetail";
import ArrowBack from "../../app/common/ArrowBack";
import ChoseCityDrawer from "../../app/common/ChoseCityDrawer";

const DetailTest = () => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const [selectedCity, setSelectedCity] = useState("فارس");

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

  const [cityVisibility, setCityVisibility] = useState(
    cities.reduce((acc, city) => {
      acc[city] = city === "فارس";
      return acc;
    }, {})
  );

  const handleToggleCity = (city) => {
    setCityVisibility((prevState) => ({
      ...prevState,
      [city]: !prevState[city],
    }));
  };

  return (
    <>
      <Box
        sx={{ direction: "ltr", display: "flex", flexDirection: "row-reverse" }}
      >
        <Card
          sx={{
            width: "10vw",
            display: isSmScreen ? "none" : "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <Box sx={{ marginTop: "2rem" }}>
            <Typography
              variant="subtitle2"
              color="textColor.light"
              sx={{ borderBottom: "1px solid", borderColor: "border.main" }}
            >
              لیست استان ها
            </Typography>
          </Box>
          {cities.map((city) => (
            <Box
              key={city}
              sx={{
                color: "textColor.dark",
                display: "flex",
                flexDirection:
                  isMdScreen || isXsScreen ? "column" : "row-reverse",
                justifyContent: "space-between",
                width: "60%",
                alignItems: isXsScreen || isMdScreen ? "center" : "normal",
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
                checked={cityVisibility[city] || false}
                onChange={() => handleToggleCity(city)}
                inputProps={{ "aria-label": "Color switch demo" }}
              />
            </Box>
          ))}
        </Card>
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
              <Typography variant="h2" sx={{ color: "textColor.main" }}>
                هایISP میانگین عملکرد
              </Typography>
              {isSmScreen ? (
                <ChoseCityDrawer />
              ) : (
                <Typography variant="h1" sx={{ color: "info.main" }}>
                  استان {selectedCity}
                </Typography>
              )}
            </Box>
            <ArrowBack />
          </Box>
          <ChartDetail
            visibility={ispVisibility}
            cityVisibility={cityVisibility}
          />
          <OperatorsDetail
            visibility={ispVisibility}
            setVisibility={setIspVisibility}
            cityVisibility={cityVisibility}
          />
        </Box>
      </Box>
    </>
  );
};

export default DetailTest;
