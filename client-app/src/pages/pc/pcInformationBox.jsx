import { Box, Button, Typography } from "@mui/material";
import React from "react";

/**
 * A React component for displaying information with an optional button.
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title or label for the information.
 * @param {string} props.value - The information value to be displayed.
 * @param {string} props.iconSrc - The source URL for the icon representing the information type.
 * @param {string} props.altText - The alternative text for the icon.
 * @param {string} props.buttonLabel - The label for an optional button.
 * @returns {JSX.Element} - The rendered InformationBox component.
 */

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
