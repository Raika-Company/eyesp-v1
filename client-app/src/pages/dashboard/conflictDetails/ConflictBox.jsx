import {Box, Stack, Typography, Button} from "@mui/material";
import {Link} from "react-router-dom";
import leftArrow from "../../../app/assets/image/leftArrow.svg";
import ConflictDetailsCard from "./ConflictDetailsCard";

const ConflictBox = ({title, data}) => {
  const keys = Object.keys(data);
  return (
    <Box
      sx={{
        background: "#1A1A1A",
        padding: ".5rem",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
        gridColumnEnd: keys.length > 2 ? "span 2" : "",
        gap: "1rem",
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{
            fontSize: "1.1rem !important",
            fontWeight: "800",
          }}
        >
          {title}
        </Typography>
        <Button
          variant="text.main"
          component={Link}
          to="/dashboard/conflict-details"
          sx={{
            marginRight: "auto",
            color: "#85CCF4",
            fontSize: ".8rem !important",
          }}
        >
          مشاهده جزئیات
          <img src={leftArrow} alt="leftArrow" />
        </Button>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns:
            keys.length <= 3 ? `repeat(${keys.length}, 1fr)` : "repeat(2, 1fr)",
          gap: "1rem",
        }}
      >
        {keys.map((key) => (
          <ConflictDetailsCard title={key} data={data[key]} key={key} />
        ))}
      </Box>
    </Box>
  );
};

export default ConflictBox;
