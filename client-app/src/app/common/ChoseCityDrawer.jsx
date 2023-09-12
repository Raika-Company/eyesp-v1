import React, { useState } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";

import { Link, useMediaQuery, Switch, Typography } from "@mui/material";

export default function SwipeableTemporaryDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isXsScreen = useMediaQuery((theme) => theme.breakpoints.down("xs"));

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setIsOpen(open);
  };
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
  const handleToggle = (city) => {
    setCitySwitches((prevState) => {
      const newVisibility = { ...prevState };
      Object.keys(newVisibility).forEach((c) => {
        newVisibility[c] = false;
      });
      newVisibility[city] = true;
      return newVisibility;
    });
  };

  const label = { inputProps: { "aria-label": "Color switch demo" } };

  const getCurrentCity = () => {
    for (const city in citySwitches) {
      if (citySwitches[city]) return `استان ${city}`;
    }
    return "استان فارس";
  };

  const list = (
    <Box
      sx={{
        width: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {cities.map((city) => (
        <Box
          key={city}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginRight: "2rem",
            width: "75%",
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
              fontSize: "16px",
              fontWeight: "bold",
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
  );

  return (
    <div>
      <Link
        onClick={toggleDrawer(true)}
        sx={{
          fontSize: isSmScreen ? "18px" : isMdScreen ? "20px" : "h3",
          marginRight: "10px",
          color: "#126AED",
        }}
        variant="h3"
      >
        {getCurrentCity()}
      </Link>
      <SwipeableDrawer
        anchor="right"
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list}
      </SwipeableDrawer>
    </div>
  );
}
