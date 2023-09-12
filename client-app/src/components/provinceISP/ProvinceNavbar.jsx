import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Typography,
  Card,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
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

const ProvinceNavbar = ({ onProvinceSelected }) => {
  const [boxHeight, setBoxHeight] = useState("100dvh");
  const [selectedProvince, setSelectedProvince] = useState("");

  useEffect(() => {
    const DashboardNavbarElement = document.querySelector(".dashboard-navbar");
    if (DashboardNavbarElement) {
      const navbarHeight = DashboardNavbarElement.offsetHeight;
      setBoxHeight(`calc(100dvh - ${navbarHeight}px)`);
    } else {
      setBoxHeight("100dvh");
    }
  }, []);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    onProvinceSelected(event.target.value);
  };

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
        <RadioGroup value={selectedProvince} onChange={handleProvinceChange}>
          {provinces.map((province, index) => (
            <FormControlLabel
              key={index}
              value={province}
              control={<Radio />}
              label={province}
            />
          ))}
        </RadioGroup>
      </Box>
    </Card>
  );
};

export default ProvinceNavbar;
