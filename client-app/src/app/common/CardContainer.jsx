import { Box, styled } from "@mui/material";

const CardContainer = styled(Box)(({ theme }) => ({
  borderRadius: "0.75rem",
  background:
    theme.palette.mode === "dark"
      ? "#1A1A1A"
      : "#FFF",
}));

export default CardContainer;
