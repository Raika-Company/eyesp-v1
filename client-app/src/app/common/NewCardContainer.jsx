import { Card, styled } from "@mui/material";

const NewCardContainer = styled(Card)(({ theme }) => ({
  borderRadius: ".75rem",
  backdropFilter: "blur(35px)",
  background:
    theme.palette.mode === "dark"
      ? "radial-gradient(214.28% 128.84% at 3.96% 11.02%, rgb(0 0 0 / 82%) 0%, rgb(0 0 0 / 92%) 48.53%, rgb(0 0 0 / 82%) 100%)"
      : "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)",
  boxShadow:
    theme.palette.mode === "light"
      ? "0px 4px 40px 0px rgba(0, 0, 0, 0.20)"
      : "0px 4px 40px 0px rgba(255, 255, 255, 0.10)",
  // border: theme.palette.mode === "light" ? "0" : "1px solid #676767",
}));

export default NewCardContainer;
