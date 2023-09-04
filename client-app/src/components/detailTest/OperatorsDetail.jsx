import React from "react";
import {
  Box,
  Typography,
  Switch,
  alpha,
  colors,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const label = { inputProps: { "aria-label": "Color switch demo" } };

const OperatorsDetail = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const PinkSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: colors.pink[600],
      "&:hover": {
        backgroundColor: alpha(
          colors.pink[600],
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: colors.pink[600],
    },
  }));

  const ISPProviderSwitch = ({ name, color, checked }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
      }}
    >
      <Typography sx={{ fontSize: isSmScreen ? "13px" : "18px" }}>
        {name}
      </Typography>
      {color === "pink" ? (
        <PinkSwitch
          {...label}
          checked={checked}
          onChange={() => handleIspToggle(name)}
        />
      ) : (
        <Switch
          {...label}
          color={color}
          checked={checked}
          onChange={() => handleIspToggle(name)}
        />
      )}
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          width: "93%",
          height: "35%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          border: "2px solid #E0E0E0",
          borderRadius: "2em",
          backgroundColor: "#E8E8E8",
        }}
      >
        <Box
          sx={{
            width: isSmScreen ? "52%" : "30%",
            height: "20%",
            marginTop: isSmScreen ? "1rem" : "2rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {" "}
          <Typography>ارایه دهنده های اینترنت</Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: isSmScreen ? "center" : "space-evenly",
            width: "100%",
            height: isSmScreen ? "34%" : "20%",
            flexWrap: isSmScreen ? "wrap" : "none",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch
              name="ایرانسل"
              color="success"
              //   checked={ispSwitches["ایرانسل"]}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch name="همراه اول" color="secondary" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch name="رایتل" color="warning" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch name="مخابرات" color="success" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch name="شاتل" color="pink" />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: isSmScreen ? "center" : "space-evenly",
            width: "100%",
            height: isSmScreen ? "34%" : "20%",
            flexWrap: isSmScreen ? "wrap" : "none",
          }}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch
              name="ایرانسل"
              color="success"
              //   checked={ispSwitches["ایرانسل"]}
            />{" "}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch name="همراه اول" color="secondary" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch name="رایتل" color="warning" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch name="مخابرات" color="success" />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch name="شاتل" color="pink" />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default OperatorsDetail;
