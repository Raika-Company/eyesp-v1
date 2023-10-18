import { Box, Typography, useTheme } from "@mui/material";

const Square = ({ value, unit, title, background, color }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: background,
        paddingY: ".5rem",
        paddingX: "2rem",
        borderRadius: "1.5rem",
        maxWidth: "100px",
        color: color,
      }}
    >
      <Typography variant="h1">
        {value}
        {unit ? (
          <span
            style={{
              fontWeight: "400",
              fontSize: ".8rem",
            }}
          >
            {unit}
          </span>
        ) : null}
      </Typography>
      <Typography variant="body2">{title}</Typography>
    </Box>
  );
};

export default Square;
