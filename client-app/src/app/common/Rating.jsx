import {useState} from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

const RatingComponent = () => {
  const [value, setValue] = useState(2); // Default value for the rating

  return (
    <Box
      sx={{
        marginTop: ".5rem",
        maxWidth: 200,
        textAlign: "center",
      }}
    >
      <Rating
        sx={{
          direction: "rtl",
          flexDirection: "row-reverse",
          position: "relative",
        }}
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        emptyIcon={<StarIcon style={{opacity: 0.55}} fontSize="inherit" />}
      />
    </Box>
  );
};

export default RatingComponent;
