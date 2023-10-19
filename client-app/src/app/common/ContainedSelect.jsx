import {Select, styled} from "@mui/material";

const ContainedSelect = styled(Select)({
  height:"60%",
  borderRadius: "1.25rem",
  border: "1px solid #DDD",
  paddingX: "0.8rem",
  paddingY: "0.4rem",
  paddingBottom: "0",
  ".MuiSelect-icon": {
    right: "auto",
    left: "7px",
  },
  ".MuiOutlinedInput-notchedOutline": {border: 0},
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  ".css-1t0qkoj-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1t0qkoj-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1t0qkoj-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input":
    {
      paddingRight: "0.5rem",
    },
});

export {ContainedSelect};
