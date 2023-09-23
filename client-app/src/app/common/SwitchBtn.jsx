import { Box } from "@mui/material";
import React from "react";
import "./SwitchBtn.css";

const SwitchBtn = ({ textOn, textOff }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "12px",
      }}
      className="btn-container"
    >
      <label className="switch btn-color-mode-switch">
        <input type="checkbox" name="color_mode" id="color_mode" value="1" />
        <label
          htmlFor="color_mode"
          data-on={textOn}
          data-off={textOff}
          className="btn-color-mode-switch-inner"
        ></label>
      </label>
    </Box>
  );
};

export default SwitchBtn;
