import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";

/**
 * An array of provinces' names.
 * @type {string[]}
 */
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

/**
 * The ProvinceNavbar component provides a UI to select a province from a list.
 *
 * @param {Object} props
 * @param {function(string): void} props.onProvinceSelected - A callback function called when a province is selected.
 *
 * @returns {JSX.Element} Rendered ProvinceNavbar component.
 */
const ProvinceNavbar = ({ onProvinceSelected }) => {
  const [boxHeight, setBoxHeight] = useState("100dvh");
  const [selectedProvince, setSelectedProvince] = useState("تهران");

  useEffect(() => {
    const DashboardNavbarElement = document.querySelector(".dashboard-navbar");
    if (DashboardNavbarElement) {
      const navbarHeight = DashboardNavbarElement.offsetHeight;
      setBoxHeight(`calc(100dvh - ${navbarHeight}px)`);
    } else {
      setBoxHeight("100dvh");
    }
  }, []);

  /**
   * Handles the change event for the province selection.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event from the radio input.
   */
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

export default memo(ProvinceNavbar);