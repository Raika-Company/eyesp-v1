import { Typography, useTheme, Box, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import CardContainer from "./CardContainer";
import AILogo from "../../app/assets/image/AiLogo.svg";

const AIButton = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <CardContainer
      component={Link}
      to="https://chat.eyesp.live"
      sx={{
        width: "12.5625rem",
        display: "flex",
        justifyContent: "space-evenly",
        background: "#00A3FF",
        borderRadius: "2rem",
        alignItems: "center",
        marginTop: "2.5rem",
        cursor: "pointer",
        zIndex: "2",
        boxShadow: "0 0 15px rgba(255,255,255,0.8)", // white box shadow
        textDecoration: "none",
        animation: "ringing 2s infinite", // Add this line for the animation
        "@keyframes ringing": {
          // Define the keyframes for ringing
          "0%, 100%": {
            transform: "scale(1.04)",
          },
          "50%": {
            transform: "scale(0.96)",
          },
          "100%": {
            transform: "scale(1.04)",
          },
        },
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="start"
        alignItems="center"
        color="white"
        // mt={0.3}
        height="50px"
      >
        {" "}
        <Typography variant="AI">EYESP AI</Typography>{" "}
        <Typography variant="h5" sx={{ transform: "translateY(-10px)" }}>
          هوش مصنوعی{" "}
        </Typography>
      </Box>

      <img src={AILogo} alt="AILogo" />
    </CardContainer>
  );
};

export default AIButton;
