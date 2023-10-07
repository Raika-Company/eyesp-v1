import { Select, styled } from "@mui/material";

const ContainedSelect = styled(Select)({
  borderRadius: "1.25rem",
  border: "1px solid #DDD",
  ".MuiSelect-icon": {
    right: "auto",
    left: "7px",
  },
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
  "&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    border: 0,
  },
  ".css-1xklhfu-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1xklhfu-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.css-1xklhfu-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input ":
    {
      paddingRight: "10px",
    },
});

export { ContainedSelect };
