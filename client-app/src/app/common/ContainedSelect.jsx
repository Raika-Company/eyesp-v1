import { Select, styled } from "@mui/material";

const ContainedSelect = styled(Select)({
  borderRadius: "1.25rem",
  ".MuiSelect-icon": {
    right: "auto",
    left: "7px",
  },
});

export { ContainedSelect };
