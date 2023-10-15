import {Box, Stack, Typography, Button} from "@mui/material";
import {Link} from "react-router-dom";
import leftArrow from "../../../app/assets/image/leftArrow.svg";
import ConflictDetailsCard from "./ConflictDetailsCard";
import ViewDetailsButton from "../../../app/common/ViewDetailsButton";

const ConflictBox = ({title, data}) => {
  const keys = Object.keys(data);
  return (
    <Box
      sx={{
        background: "#1A1A1A",
        gridRowEnd:
          keys.length > 3
            ? `span ${Math.floor(keys.length / 2) + (keys.length % 2)}`
            : "span 1",
        gridColumnEnd: keys.length <= 3 ? `span ${keys.length}` : "",
        padding: ".5rem",
        borderRadius: "1rem",
        display: "flex",
        flexDirection: "column",
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
        <ViewDetailsButton
          sx={{
            fontSize: ".8rem !important",
            paddingLeft: "0",
          }}
          target={"#"}
        />
      </Stack>
      <Box
        sx={{
          alignSelf: "center",
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
