import React from "react";
import { Box } from "@mui/material";

/**
 * Generates styles for the NewSwitchBtn component.
 * @returns {Object} The styles object.
 */
const useStyles = () => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: 12,
  },
  switchLabel: {
    "& > label.btn-color-mode-switch-inner": {
      m: 0,
      width: "280px",
      height: "48px",
      borderRadius: "0.75rem",
      overflow: "hidden",
      position: "relative",
      transition: "all 0.3s ease",
      display: "block",
      "&:before": {
        content: "attr(data-on)",
        position: "absolute",
        fontSize: "1rem",
        fontWeight: 600,
        top: "0.8rem",
        right: "1.3rem",
        cursor: "pointer",
      },
      "&:after": {
        content: "attr(data-off)",
        width: "135px",
        height: "40.5px",
        bgcolor: "#0c6087",
        color: "#fff",
        fontSize: "1rem",
        borderRadius: "0.75rem",
        position: "absolute",
        left: "0.3rem",
        top: "0.24rem",
        textAlign: "center",
        transition: "all 0.3s ease",
        boxShadow: "0px 0px 6px -2px #111",
        p: "9px 0",
        cursor: "pointer",
      },
    },
    "& > .alert": {
      display: "none",
      bgcolor: "#ff9800",
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
    '& input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:after':
      {
        content: "attr(data-on)",
        left: "8.7rem",
        bgcolor: "#0c6087",
      },
    '& input[type="checkbox"]:checked + label.btn-color-mode-switch-inner:before':
      {
        content: "attr(data-off)",
        right: "auto",
        left: "1.2rem",
      },
  },
});

/**
 * A switch button component that toggles between two texts.
 *
 * @param {Object} props The component properties.
 * @param {string} props.textOn The text to display when the switch is on.
 * @param {string} props.textOff The text to display when the switch is off.
 * @param {Function} props.onChange The callback to be invoked when the switch state changes.
 * @returns {React.ReactNode} The NewSwitchBtn component.
 */
const NewSwitchBtn = ({ textOn, textOff, onChange }) => {
  const styles = useStyles();

  return (
    <Box sx={styles.container}>
      <Box component="label" sx={styles.switchLabel}>
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
      </Box>
    </Box>
  );
};

export default NewSwitchBtn;
