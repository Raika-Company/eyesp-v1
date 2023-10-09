import {Typography} from "@mui/material";
import {useNavigate} from "react-router-dom"; // Import useNavigate
import Logo from "../layouts/Logo";
import CardContainer from "./CardContainer";

const NewLogo = ({openNav}) => {
  const navigate = useNavigate();

  const handleBoxClick = () => {
    navigate("/");
  };

  return (
    <CardContainer
      onClick={handleBoxClick}
      sx={{
        width: "12.5625rem",
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        paddingY: "0.75rem",
        marginTop: "2.5rem",
        marginLeft: "1rem",
        cursor: "pointer",
      }}
    >
      <Typography variant="logo">EYESP.LIVE</Typography>

      <Logo />
    </CardContainer>
  );
};

export default NewLogo;
