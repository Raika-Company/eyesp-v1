import {Button} from "@mui/material";
import WestIcon from "@mui/icons-material/West";
import {Link} from "react-router-dom";

const ViewDetailsButton = ({target, sx}) => {
  return (
    <Button
      component={Link}
      to={target}
      fontSize="1rem"
      variant="text.main"
      sx={{color: "#008EDD", fontFamily: "PeydaRegular", ...sx}}
      endIcon={<WestIcon sx={{marginRight: "1rem"}} />}
    >
      مشاهده جزئیات
    </Button>
  );
};

export default ViewDetailsButton;
