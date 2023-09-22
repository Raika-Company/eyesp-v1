import { Card, styled } from "@mui/material";


const CardContainer = styled(Card)({
  borderRadius: "2rem",
  backdropFilter: "blur(35px)",
  background: "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)",
  boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.20)"
});

export default CardContainer;