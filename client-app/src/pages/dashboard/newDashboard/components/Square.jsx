import {Box, Typography} from "@mui/material";

const Square = ({value, unit, title, background}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: background
          ? background
          : "radial-gradient(140.09% 140.09% at 18.63% 0%, #B40000 0%, rgba(180, 0, 0, 0.00) 100%)",
        paddingY: ".5rem",
        paddingX: "2rem",
        borderRadius: "1.5rem",
        maxWidth: "100px",
      }}
    >
      <Typography
        style={{
          fontSize: "2rem",
        }}
      >
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
      <Typography>{title}</Typography>
    </Box>
  );
};

export default Square;
