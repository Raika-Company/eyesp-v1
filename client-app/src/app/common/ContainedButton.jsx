import { Button, styled } from "@mui/material";

const ContainedButton = styled(({ bgColor, txtColor, txtHover, ...other }) => <Button {...other} />)(
  ({ bgColor, txtColor, txtHover }) => ({
    boxShadow: "none",
    borderRadius: "1.3125rem",
    paddingInline: "2em",
    backgroundColor: bgColor,
    borderColor: bgColor,
    color: txtColor,
    border: "2px solid transparent",
    "&:hover": {
      backgroundColor: "transparent",
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
