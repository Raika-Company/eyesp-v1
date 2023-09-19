import { Box, Container, Typography, useTheme } from "@mui/material";
import React from "react";
import { useState } from "react";
import NewLogo from "../../app/common/NewLogo";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const FormControlItems = ["انتخاب اپراتور", "سالیانه", "1400", "استان"];
const data = [
  ["ایرانسل", "همراه اول", "رایتل", "شاتل", "آسیاتک", "مخابرات"],
  ["سالیانه", "ماهیانه", "هفتگی", "روزانه", "ساعتی"],
  ["1402", "1401", "1400", "1399", "1398", "1397"],
  ["بندرعباس", "شیراز", "مشهد", "اصفهان", "مازندران", "تهران"],
];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const NewOperatorPerformance = () => {
  const [alignment, setAlignment] = React.useState("مشاهده تکی");

  const handleChangeBtn = (event, newAlignment) => {
    setAlignment(newAlignment);
    setSelectedButton(newAlignment);
  };

  const theme = useTheme();
  const bgColor = theme.palette.mode === "light" ? "#f7f9fc" : "#2a2c2f";
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName((prevPersonName) => {
      const newPersonName = [...prevPersonName];
      newPersonName[index] =
        typeof value === "string" ? value.split(",") : value;
      return newPersonName;
    });
  };
  return (
    <Container maxWidth="lg">
      <NewLogo />
      <Box
        sx={{
          bgcolor: "darkgoldenrod",
          mt: "1rem",
          p: "2rem",
          borderRadius: "25px",
          boxShadow: "0 4px 40px 0 rgba(0, 0, 0, 0.20)",
          backgroundColor: bgColor,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 200,
          }}
        >
          <Typography fontSize="1.5rem" fontWeight={700}>
            نمودار عملکرد اپراتور
          </Typography>
        </Box>
        <Box>
          {data.map((group, index) => (
            <FormControl
              key={FormControlItems[index]}
              value={FormControlItems[index]}
              sx={{
                m: "0.4rem",
                width: 150,
                borderRadius: "25px",
                position: "relative",
              }}
            >
              <Select
                sx={{
                  borderRadius: "25px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                multiple
                displayEmpty
                value={personName[index] || []}
                onChange={(event) => handleChange(event, index)}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <span>{FormControlItems[index]}</span>;
                  }
                  return selected.join(", ");
                }}
                MenuProps={MenuProps}
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem disabled>
                  <span>{FormControlItems[index]}</span>
                </MenuItem>
                {group.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName[index] || [], theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </Box>
        <Box
          sx={{
            bgcolor: "#F4F4F4",
            borderRadius: "25px",
            width: "185px",
            boxShadow: "0px 0px 10px 1px rgba(0, 0, 0, 0.10) inset",
            p: "0.2rem",
          }}
        >
          <ToggleButtonGroup
            sx={{ border: "none", direction: "ltr" }}
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChangeBtn}
            aria-label="Platform"
          >
            <ToggleButton
              sx={{
                border: "none",
                color: "#989898",
                borderRadius: "25px",
                fontSize: "0.995rem",
                bgcolor: alignment === "مشاهده تکی" ? "yellow" : "white", // تنظیم پس زمینه باتن انتخاب شده
              }}
              value="مشاهده تکی"
            >
              مشاهده تکی
            </ToggleButton>
            <ToggleButton
              sx={{
                border: "none",
                borderRadius: "25px",
                fontSize: "0.995rem",
                color: "#989898",
                bgcolor: alignment === "مقایسه" ? "yellow" : "white", // تنظیم پس زمینه باتن انتخاب شده
              }}
              value="مقایسه"
            >
              مقایسه
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>
    </Container>
  );
};

export default NewOperatorPerformance;
