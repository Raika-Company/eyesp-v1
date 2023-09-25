import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import leftArrow from "../../app/assets/image/leftArrow.svg";
import data from "../../../public/data/myISPChartData.json";

const FormControlChart = () => {
  const [age, setAge] = useState("1400");
  const [chartData, setChartData] = useState(data[0].data);
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setAge(selectedYear);

    const yearData = data.find((d) => d.id === selectedYear.toString());
    if (yearData) {
      setChartData(yearData.data);
    }
  };
  const FormControlItems = ["سرعت دانلود", "سال"];
  const dataChart = [
    ["سالیانه", "ماهیانه", "هفتگی"],
    ["1402", "1401", "1400"],
  ];

  return (
    <Box sx={{ display: isSmScreen ? "flex" : "none", flexWrap: "wrap" }}>
      <Typography
        sx={{
          fontSize: isSmScreen ? "1.4rem" : "1.5rem",
          mt: isSmScreen ? "0.4rem" : "",
        }}
        fontFamily="PeydaSemibold"
        color="#2C2C2C"
        gutterBottom
      >
        نمودار عملکرد اپراتور
      </Typography>
      <Button
        sx={{ color: "#008EDD", fontSize: "1rem" }}
        variant="text"
        component={Link}
        to="/operator-performance"
      >
        سایر اپراتورها
        <img
          style={{ marginRight: "0.4rem" }}
          src={leftArrow}
          alt="leftArrow"
        />
      </Button>
      <Box sx={{ display: "flex", pt: "0.5rem" }}>
        {FormControlItems.map((items, index) => (
          <FormControl
            sx={{
              m: "0.4rem",
              width: 150,
              borderRadius: "25px",
            }}
            size="small"
          >
            <InputLabel id={`demo-select-small-label-${index}`}>
              {items}
            </InputLabel>
            <Select
              labelId={`demo-select-small-label-${index}`}
              id={`demo-select-small-${index}`}
              label={items}
              sx={{
                borderRadius: "25px",
              }}
              onChange={handleChange}
            >
              {dataChart[index].map((menuItem, menuItemIndex) => (
                <MenuItem key={menuItemIndex} value={menuItem}>
                  {menuItem}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        ))}
      </Box>
    </Box>
  );
};

export default FormControlChart;
