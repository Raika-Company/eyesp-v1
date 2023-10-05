import { Box } from "@mui/material";
import React from "react";
import "./SwitchBtnMobile.css";

const SwitchBtnMobile = ({ textOn, textOff }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <label className="switch btn-color-mode-switch">
        <input type="checkbox" name="color_mode_mobile" id="color_mode_mobile" value="1" />
        <label
          htmlFor="color_mode_mobile"
          data-on={textOn}
          data-off={textOff}
          className="btn-color-mode-switch-inner-mobile"
        ></label>
      </label>
    </Box>
  );
};

export default SwitchBtnMobile;
