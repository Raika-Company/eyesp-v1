import styled from "@emotion/styled";
import { Box } from "@mui/material";
import React from "react";

const CustomBox = styled(Box)(() => ({
  width: "60em",
  height: "20em",
  border: "2px solid #E0E0E0",
  borderRadius: "2em",
  margin: " 0 auto",
}));

function DlandUlCharts() {
  return (
    <>
      <CustomBox></CustomBox>
    </>
  );
}

export default DlandUlCharts;
