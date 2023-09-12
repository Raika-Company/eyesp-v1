import React from "react";
import {
  Box,
  Typography,
  Switch,
  alpha,
  colors,
  useMediaQuery,
  Card,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import "./detail.css";
const label = { inputProps: { "aria-label": "Color switch demo" } };

const OperatorsDetail = ({ visibility, setVisibility, cityVisibility }) => {
  const activeCityCount = Object.values(cityVisibility).filter(Boolean).length;

  const handleIspToggle = (isp) => {
    setVisibility((prev) => ({ ...prev, [isp]: !prev[isp] }));
  };
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const PurpleSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: colors.purple[600],
      "&:hover": {
        backgroundColor: alpha(
          colors.purple[600],
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: colors.purple[600],
    },
  }));
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

  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: colors.green[600],
      "&:hover": {
        backgroundColor: alpha(
          colors.green[600],
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: colors.green[600],
    },
  }));

  const OrangeSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: colors.orange[600],
      "&:hover": {
        backgroundColor: alpha(
          colors.orange[600],
          theme.palette.action.hoverOpacity
        ),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: colors.orange[600],
    },
  }));

  const ISPProviderSwitch = ({ name, color, checked, disabled }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row-reverse",
        alignItems: "center",
      }}
    >
      <Typography variant="h6">{name}</Typography>
      {color === "pink" ? (
        <PinkSwitch
          {...label}
          checked={checked}
          onChange={() => handleIspToggle(name)}
          disabled={disabled}
        />
      ) : color === "purple" ? (
        <PurpleSwitch
          {...label}
          checked={checked}
          onChange={() => handleIspToggle(name)}
          disabled={disabled}
        />
      ) : color === "success" ? (
        <GreenSwitch
          {...label}
          checked={checked}
          onChange={() => handleIspToggle(name)}
          disabled={disabled}
        />
      ) : color === "warning" ? (
        <OrangeSwitch
          {...label}
          checked={checked}
          onChange={() => handleIspToggle(name)}
          disabled={disabled}
        />
      ) : (
        <Switch
          {...label}
          color={color}
          checked={checked}
          onChange={() => handleIspToggle(name)}
          disabled={disabled}
        />
      )}
    </Box>
  );

  function MobileOperatorsDetail() {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: isSmScreen ? "center" : "space-evenly",
            width: "100%",
            height: isSmScreen ? "34%" : "20%",
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
              checked={visibility.ایرانسل}
              onChange={() => handleIspToggle("ایرانسل")}
              disabled={activeCityCount >= 2}
            />{" "}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch
              name="مخابرات"
              checked={visibility.مخابرات}
              onChange={() => handleIspToggle("مخابرات")}
              disabled={activeCityCount >= 2}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch
              name="شاتل"
              color="pink"
              checked={visibility.شاتل}
              onChange={() => handleIspToggle("شاتل")}
              disabled={activeCityCount >= 2}
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: isSmScreen ? "center" : "space-evenly",
            width: "100%",
            height: isSmScreen ? "34%" : "20%",
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
              name="همراه_اول"
              color="warning"
              checked={visibility.همراه_اول}
              onChange={() => handleIspToggle("همراه_اول")}
              disabled={activeCityCount >= 2}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row-reverse",
              alignItems: "center",
            }}
          >
            <ISPProviderSwitch
              name="رایتل"
              color="purple"
              checked={visibility.رایتل}
              onChange={() => handleIspToggle("رایتل")}
              disabled={activeCityCount >= 2}
            />
          </Box>
        </Box>
      </>
    );
  }
  return (
    <>
      <Card
        sx={{
          width: "93%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          alignItems: "center",
          border: "2px solid #E0E0E0",
          borderRadius: "2em",
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
          <Typography variant="h4" color="textColor.main">
            ارایه دهنده های اینترنت
          </Typography>
        </Box>
        {isSmScreen ? (
          <MobileOperatorsDetail />
        ) : (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row-reverse",
                justifyContent: "space-evenly",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  marginY: "2rem",
                }}
              >
                <ISPProviderSwitch
                  name="ایرانسل"
                  color="success"
                  checked={visibility.ایرانسل}
                  onChange={() => handleIspToggle("ایرانسل")}
                  disabled={activeCityCount >= 2}

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
                <ISPProviderSwitch
                  name="همراه_اول"
                  color="warning"
                  checked={visibility.همراه_اول}
                  onChange={() => handleIspToggle("همراه_اول")}
                  disabled={activeCityCount >= 2}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch
                  name="رایتل"
                  color="purple"
                  checked={visibility.رایتل}
                  onChange={() => handleIspToggle("رایتل")}
                  disabled={activeCityCount >= 2}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch
                  name="مخابرات"
                  checked={visibility.مخابرات}
                  onChange={() => handleIspToggle("مخابرات")}
                  disabled={activeCityCount >= 2}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                }}
              >
                <ISPProviderSwitch
                  name="شاتل"
                  color="pink"
                  checked={visibility.شاتل}
                  onChange={() => handleIspToggle("شاتل")}
                  disabled={activeCityCount >= 2}
                />{" "}
              </Box>
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

export default OperatorsDetail;
