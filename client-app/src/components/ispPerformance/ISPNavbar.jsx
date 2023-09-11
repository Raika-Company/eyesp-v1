import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Box,
  Typography,
  Card,
  Divider,
  Switch,
} from "@mui/material";

const provinces = [
  "اصفهان",
  "البرز",
  "تهران",
  "خراسان رضوی",
  "خوزستان",
  "فارس",
  "قزوین",
  "قم",
  "کرمان",
  "مازندران",
  "همدان",
  "یزد",
];

const ISPNavbar = () => {
  const [boxHeight, setBoxHeight] = useState("100dvh");
  useEffect(() => {
    const DashboardNavbarElement = document.querySelector(".dashboard-navbar");
    if (DashboardNavbarElement) {
      const navbarHeight = DashboardNavbarElement.offsetHeight;
      setBoxHeight(`calc(100dvh - ${navbarHeight}px)`);
    } else {
      setBoxHeight("100dvh");
    }
  }, []);
  return (
    <Card
      sx={{
        width: "max(15rem, 15vw)",
        height: boxHeight,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
      }}
    >
      <Typography marginTop="2rem" gutterBottom textAlign="center">
        لیست استان ها
      </Typography>
      <Divider />
      <Box padding="1rem">
        {provinces.map((province, index) => (
          <Box key={index} display="flex" justifyContent="space-between">
            <Typography gutterBottom >
              {province}
            </Typography>
            <Switch />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default ISPNavbar;
