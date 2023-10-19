import {Box, Stack, Typography, useTheme} from "@mui/material";
import ConflictDetailsCard from "./ConflictDetailsCard";
import ViewDetailsButton from "../../../app/common/ViewDetailsButton";
import convertToPersian from "../../../app/utils/convertToPersian";

const ConflictBox = ({title, data}) => {
  const keys = Object.keys(data);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        background: isDark ? "#1A1A1A" : "#FFF",
        gridRowEnd:
          keys.length > 3 ? `span ${Math.floor(keys.length / 2)}` : "span 1",
        gridColumnEnd: keys.length <= 3 ? `span ${keys.length}` : "span 2",
        transition: "all .25s",
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
          {convertToPersian(title)}
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
          display: "grid",
          gridTemplateColumns:
            keys.length <= 3 ? `repeat(${keys.length}, 1fr)` : "repeat(2, 1fr)",
          gridAutoFlow: "dense",
          justifyItems: "center",
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
