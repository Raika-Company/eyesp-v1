import { Box, Button, Typography } from "@mui/material";
import React from "react";

const PcInformationBox = ({ title, value, iconSrc, altText, buttonLabel }) => {
  return (
    <Box display="flex" alignItems="center" flexDirection="row" gap={2}>
      <Box
        sx={{
          border: "1px solid #FFF",
          borderRadius: "50%",
          p: "1rem",
          height: "55px",
          width: "55px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <img height="30px" src={iconSrc} alt={altText} />
      </Box>
      <Box>
        <Typography sx={{ color: "#FFF" }} variant="h1">
          {title}
        </Typography>
        <Typography sx={{ color: "#8d8d8d" }} variant="h6">
          {value}
        </Typography>
        {buttonLabel ? (
          <Button sx={{ color: "#D81303" }}>{buttonLabel}</Button>
        ) : null}
      </Box>
    </Box>
  );
};

export default PcInformationBox;
