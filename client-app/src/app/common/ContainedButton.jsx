import { Button, styled } from "@mui/material";

const ContainedButton = styled(Button)({
  boxShadow: "none",
  borderRadius: "1.3125rem",
  paddingInline: "2em",
  color: "white",
});

const OutlinedButton = styled(Button)({
  boxShadow: "none",
  borderRadius: "1.3125rem",
});

export { ContainedButton, OutlinedButton };
