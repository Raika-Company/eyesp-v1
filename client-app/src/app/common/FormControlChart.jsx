import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import leftArrow from "../../app/assets/image/leftArrow.svg";
import data from "../../../public/data/myISPChartData.json";
import { ContainedSelect } from "./ContainedSelect";

const FormControlChart = () => {
  const FormControlItems = ["سرعت دانلود", "سال"];
  const dataChart = [
    ["سرعت آپلود", "سرعت دانلود", "پینگ", "درصد عملکرد"],
    ["1402", "1401", "1400"],
  ];
  const [age, setAge] = useState("1400");
  const [chartData, setChartData] = useState(data[0].data);
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));

  const handleChange = (event) => {
    const selectedYear = event.target.value;
    setAge(selectedYear);

    const yearData = data.find((d) => d.id === selectedYear.toString());
    if (yearData) {
      setChartData(yearData.data);
    }
  };

  return (
    <Box
      sx={{
        display: isLgScreen ? "flex" : "none",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        variant="h1"
        color="text.textBlack"
        gutterBottom
        sx={{
          mt: isLgScreen ? "0.9rem" : "0",
        }}
        fontFamily="PeydaSemibold"
      >
        نمودار عملکرد اپراتور
      </Typography>
      <Button
        sx={{ color: "primary.main" }}
        variant="button"
        component={Link}
        to="/operator-compare"
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
            <ContainedSelect
              labelId={`demo-select-small-label-${index}`}
              id={`demo-select-small-${index}`}
              label={items}
              displayEmpty
              sx={{
                borderRadius: "25px",
              }}
              onChange={handleChange}
            >
              <MenuItem disabled>
                <span>{items}</span>
              </MenuItem>
              {dataChart[index].map((menuItem, menuItemIndex) => (
                <MenuItem key={menuItemIndex} value={menuItem}>
                  {menuItem}
                </MenuItem>
              ))}
            </ContainedSelect>
          </FormControl>
        ))}
      </Box>
    </Box>
  );
};

export default FormControlChart;
