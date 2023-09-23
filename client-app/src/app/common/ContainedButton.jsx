import { Button, styled } from "@mui/material";

const ContainedButton = styled(Button)(({ theme }) => ({
  boxShadow: "none",
  borderRadius: "1.3125rem",
  paddingInline: "2em",
  color: "white",
  borderColor: "#FF8A35",
  border: "2px solid transparent", // Initially setting the border color to transparent
}));

const OutlinedButton = styled(Button)({
  boxShadow: "none",
  borderRadius: "1.3125rem",
});

export { ContainedButton, OutlinedButton };
