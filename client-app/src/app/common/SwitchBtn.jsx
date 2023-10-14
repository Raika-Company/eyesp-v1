import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import React from "react";
/**
 * SwitchBtn Component.
 *
 * This component is a styled switch button that allows users to toggle
 * between two states. It adjusts its style based on the current theme mode.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.textOn - The text to display when the switch is "on".
 * @param {string} props.textOff - The text to display when the switch is "off".
 * @param {Function} props.onChange - Callback to be called when the switch state changes.
 * @returns {JSX.Element} The rendered SwitchBtn component.
 */
const SwitchBtn = ({ textOn, textOff, onChange }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 12,
        position: "relative",
      }}
    >
      <Box
        component="label"
        sx={{
          "& > label.btn-color-mode-switch-inner": {
            m: 0,
            width: "21.375rem",
            height: "3.8125rem",
            borderRadius: "0.75rem",
            background: theme.palette.mode === "dark" ? "#262626" : "#F0F4F3",
            overflow: "hidden",
            position: "relative",
            transition: "all 0.3s ease",
            display: "block",
            "&:before": {
              content: "attr(data-on)",
              position: "absolute",
              fontSize: "1.5rem",
              top: "0.8rem",
              right: "1.3rem",
              cursor: "pointer",
              color: "#00a4ff",
            },
            "&:after": {
              content: "attr(data-off)",
              width: "135px",
              height: "40.5px",
              color: theme.palette.mode === "dark" ? "#fff" : "#4E4E4E",
              fontSize: "1.5rem",
              borderRadius: "0.75rem",
              position: "absolute",
              left: "0.5rem",
              top: "0.3rem",
              textAlign: "center",
              transition: "all 0.3s ease",
              p: "9px 0",
              cursor: "pointer",
            },
          },
          "& > .alert": {
            display: "none",
            border: "none",
            color: "#fff",
          },
          '& input[type="checkbox"]': {
            width: "50px",
            height: "25px",
            opacity: 0,
            position: "absolute",
            top: 0,
            zIndex: 1,
            m: 0,
          },
          '& input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:':
            {
              color: "#4e4e4e",
            },
          '& input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:before':
            {
              color: theme.palette.mode === "dark" ? "#fff" : "#4E4E4E",
            },
          '& input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:after':
            {
              color: "#00a4ff",
            },
        }}
      >
        <input
          type="checkbox"
          name="color_mode"
          onChange={onChange}
          id="color_mode"
          value="1"
        />
        <Box
          component="label"
          htmlFor="color_mode"
          data-on={textOn}
          data-off={textOff}
          className="btn-color-mode-switch-inner"
        />
        <div
          style={{
            position: "absolute",
            background: theme.palette.mode === "dark" ? "#fff" : "#4E4E4E",
            width: "0.0625rem",
            height: "2.0625rem",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </Box>
    </Box>
  );
};

export default SwitchBtn;
