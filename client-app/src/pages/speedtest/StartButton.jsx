import { Button, Typography, useMediaQuery } from "@mui/material";
import React from "react";

const StartButton = () => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Button
      sx={{
        boxShadow: `
            inset 0 0 20px #9DB8C8,  /* inner shadow */
            0px 4px 59px 0px rgba(0, 163, 255, 0.22)  /* outer shadow */
        `,
        borderRadius: "50%",
        width: isMdScreen ? "25vmin" : "55vmin",
        height: isMdScreen ? "25vmin" : "55vmin",
      }}
    >
      <Typography color="#000" fontSize="1.75rem" fontFamily="PeydaRegular">
        شروع
      </Typography>
    </Button>
  );
};

export default StartButton;
