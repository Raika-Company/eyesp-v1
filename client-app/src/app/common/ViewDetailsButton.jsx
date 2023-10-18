import { Button, useTheme } from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import { Link } from "react-router-dom";

const ViewDetailsButton = ({ target, sx }) => {
  const theme = useTheme();

  return (
    <Button
      component={Link}
      to={target}
      fontSize="1rem"
      variant="text.main"
      sx={{
        color: theme.palette.mode === "dark" ? "#85CCF4" : "#0C6087",
        fontFamily: "YekanBakh",
        ...sx,
      }}
      endIcon={<WestIcon sx={{ marginRight: "1rem" }} />}
    >
      مشاهده جزئیات
    </Button>
  );
};

export default ViewDetailsButton;
