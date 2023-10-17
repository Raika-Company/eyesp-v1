import {Typography, useTheme} from "@mui/material";
import {useNavigate} from "react-router-dom"; // Import useNavigate
import Logo from "../layouts/Logo";
import CardContainer from "./CardContainer";

const NewLogo = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

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
        background: isDark ? "#262626cc" : "#DADADA",
        border: isDark ? "1.5px solid #DEDEDE" : "1px solid #A0A0A0",
        borderRadius: "2rem",
        alignItems: "center",
        paddingY: "0.75rem",
        marginTop: "2.5rem",
        cursor: "pointer",
      }}
    >
      <Typography variant="logo">EYESP.LIVE</Typography>

      <Logo />
    </CardContainer>
  );
};

export default NewLogo;
