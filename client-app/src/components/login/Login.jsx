import React from "react";
import { Button, TextField, Box, Grid, Card, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

import loginImage from "../../app/assets/image/speedtest.png";

const StyledRoot = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
});

const StyledLoginCard = styled(Card)({
  width: "90%",
  maxWidth: 800,
  padding: "24px",
  borderRadius: "12px", // Rounded corners
  boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)",
  overflow: "hidden",
  "@media (max-width: 600px)": {
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, 0.2)",
  },
});

const LoginImage = styled("img")({
  width: "100%",
  height: "auto",
});

const Login = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    // You can add authentication logic here, and upon success:
    navigate("/dashboard");
  };
  return (
    <StyledRoot>
      <StyledLoginCard>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="100%"
            >
              <LoginImage src={loginImage} alt="Login Illustration" />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              height="100%"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              gap={3}
            >
              <TextField label="نام کاربری" variant="outlined" fullWidth />
              <TextField
                label="رمز عبور"
                variant="outlined"
                type="password"
                fullWidth
              />
              <Button
                variant="oulined"
                sx={{
                  background:
                    "linear-gradient( 135deg, #81FFEF 10%, #F067B4 100%)",
                }}
                fullWidth
                onClick={handleLoginClick}
              >
                ورود
              </Button>
            </Box>
          </Grid>
        </Grid>
      </StyledLoginCard>
    </StyledRoot>
  );
};

export default Login;
