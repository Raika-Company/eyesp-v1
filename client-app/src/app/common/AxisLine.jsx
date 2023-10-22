import {Box, Typography, useTheme} from "@mui/material";

const AxisLine = ({max, unit, height, direction, xAxisValues}) => {
  const valueLength = xAxisValues && xAxisValues.length;
  const theme = useTheme();
  const valueOfEachRow = Math.ceil(max / 3);

  const values = [0];
  for (let i = 1; i <= 3; i++) {
    values.push(Math.floor(Math.min(i * valueOfEachRow, max)));
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
        position: "absolute",
        left: direction === "Y" ? "-105%" : "",
        top: direction === "Y" ? "-1rem" : "95%",
        width: "100%",
        height: "100%",
      }}
    >
      <Typography>{unit}</Typography>
      <Box
        sx={{
          display: "flex",
          gap: ".5rem",
          height: "100%",
        }}
      >
        <div
          style={{
            width: direction === "Y" ? ".3rem" : "100%",
            height: direction === "Y" ? "100%" : ".3rem",
            background: theme.palette.mode === "dark" ? "#C9C9C9" : "#aaaa",
            borderRadius: ".5rem",
          }}
        ></div>

        <Box
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            right: direction === "Y" && "1rem",
            top: direction === "X" && "1rem",
            flexDirection: direction === "Y" ? "column-reverse" : "row-reverse",
            justifyContent: "space-between",
          }}
        >
          {direction === "Y" &&
            values.map((value, index) => (
              <Typography
                key={index}
                color={theme.palette.mode === "dark" ? "#fffa" : "#777"}
                whiteSpace="nowrap"
              >
                {value}
              </Typography>
            ))}

          {direction === "X" &&
            xAxisValues.map((value, index) => {
              if (valueLength > 8 && index % 4 !== 0) return;
              return (
                <Typography
                  key={index}
                  color={theme.palette.mode === "dark" ? "#fffa" : "#777"}
                >
                  {value.length > 10 ? value.slice(9) : value}
                </Typography>
              );
            })}
        </Box>
      </Box>
    </Box>
  );
};

export default AxisLine;
