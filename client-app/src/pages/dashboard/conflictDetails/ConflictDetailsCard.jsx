import {Box, Stack, Typography, Button, useTheme} from "@mui/material";
import {Link} from "react-router-dom";
import leftArrow from "../../../app/assets/image/leftArrow.svg";

const ConflictDetailsCard = ({title, data = []}) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        background: theme.palette.mode === "dark" ? "#2626262" : "#F6F6F6",
        transition: "background .25s",
        borderRadius: "1rem",
        padding: ".5rem",
        maxWidth: "12rem",
        gridRowEnd: data.length > 3 ? `span ${Math.ceil(data.length / 3)}` : "",
        display: "flex",
        flexDirection: "column",
        minWidth: "12rem",
        gap: "1rem",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          color={theme.palette.mode === "light" && "#0C6087"}
          fontWeight="700"
        >
          {title}
        </Typography>

        <Button
          variant="text.main"
          component={Link}
          to="/dashboard/conflict-details"
          sx={{
            textDecoration: "underline",
            marginRight: "auto",
            paddingLeft: "0",
          }}
        >
          <img src={leftArrow} alt="leftArrow" />
        </Button>
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: ".5rem",
          color: theme.palette.mode === "light" && "#434544",
        }}
      >
        {data.map((isp, idx) => (
          <>
            <Typography whiteSpace="nowrap" fontSize=".8rem !important">
              {isp}
            </Typography>
            {idx < data.length - 1 && (idx + 1) % 3 !== 0 && (
              <Typography color="#434544">|</Typography>
            )}
          </>
        ))}
      </Box>
    </Box>
  );
};

export default ConflictDetailsCard;
