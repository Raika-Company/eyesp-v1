import { Button, styled } from "@mui/material";

const ContainedButton = styled(Button)(
  ({ theme, bgColor, bgHover, txtHover }) => ({
    boxShadow: "none",
    borderRadius: "1.3125rem",
    paddingInline: "2em",
    backgroundColor: bgColor,
    borderColor: bgColor,
    border: "2px solid transparent",
    "&:hover": {
      backgroundColor: bgHover,
      color: txtHover,
      borderColor: bgColor,
      boxShadow: "none",
    },
  })
);

const OutlinedButton = styled(Button)({
  boxShadow: "none",
  borderRadius: "1.3125rem",
});

export { ContainedButton, OutlinedButton };
