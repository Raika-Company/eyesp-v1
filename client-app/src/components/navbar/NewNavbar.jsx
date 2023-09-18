import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";

import CompanyLogo from "../../app/assets/image/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SpeedIcon from "@mui/icons-material/Speed";
import HistoryIcon from "@mui/icons-material/History";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";
import { useLocation, useNavigate } from "react-router-dom";

const pages = [
  [("صفحه اصلی", "/")],
  ["تست سرعت", "/admin"],
  ["تست های گذشته", "/"],
  ["اپراتورمن", "/"],
  ["اطلاعات شبکه من", "/"],
  ["گزارش ها", "/"],
];

const NewNavbar = () => {
  const [isTypographyVisible, setIsTypographyVisible] = useState(false);

  const [value, setValue] = React.useState("");
  const history = useNavigate();
  const location = useLocation();
  const navigateTo = (path) => {
    history(path);
  };

  const [opennav, setOpenNav] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);

  const [ishomeopen, setIsHomeOpen] = useState(false);
  const [isspeedtest, setIsSpeedTest] = useState(false);
  const [ishistorytest, setIsHistoryTest] = useState(false);
  const [ismyoperator, setIsMyOperator] = useState(false);
  const [isresult, setIsResult] = useState(false);
  const [isinformation, setIsInformation] = useState(false);

  const toggleHomeOpen = () => {
    setIsHomeOpen(!ishomeopen);
    navigateTo("/new");
  };
  const toggleSpeedTest = () => {
    setIsSpeedTest(!isspeedtest);
    navigateTo("/new");
  };
  const toggleHistoryTest = () => {
    setIsHistoryTest(!ishistorytest);
    navigateTo("/test-history");
  };
  const toggleMyOperator = () => {
    setIsMyOperator(!ismyoperator);
    navigateTo("/ISP-performance");
  };
  const toggleResult = () => {
    setIsResult(!isresult);
    navigateTo("/result");
  };
  const toggleInformation = () => {
    setIsInformation(!isinformation);
    navigateTo("/information");
  };

  const toggleOpenMenu = () => {
    setOpenNav(!opennav);
    setHistoryOpen(!historyOpen);
  };

  useEffect(() => {
    if (opennav) {
      setTimeout(() => {
        setIsTypographyVisible(true);
      }, 80);
    } else if (historyOpen) {
      setTimeout(() => {
        setIsTypographyVisible(true);
      }, 80);
    } else {
      setIsTypographyVisible(false);
    }
  }, [opennav, historyOpen]);

  return (
    <Box
      sx={{
        width: "55px",
        pt: "2rem",
        mr: "2rem",
      }}
    >
      <Box
        sx={{
          mb: "1.5rem",
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          bgcolor: "#f4f6f9",
          color: "#676767",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          ":hover": {
            bgcolor: "primary.light",
            color: "white",
            border: "none",
          },
        }}
      >
        <IconButton onClick={toggleOpenMenu}>
          <MenuIcon
            sx={{
              cursor: "pointer",
              width: "24px",
              height: "24px",
            }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: opennav || historyOpen ? "180px" : "60px",
          height: "500px",
        }}
      >
        <Box
          sx={{
            mb: "1.5rem",
            px: opennav ? "6px" : "",
            width: opennav ? "165px" : "52px",
            height: "120px",
            borderRadius: "25px",
            bgcolor: "#f4f6f9",
            color: "#676767",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: opennav ? "flex-start" : "center",
            alignItems: "center",
            transition: "all 0.4s ease-in",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <IconButton onClick={toggleHomeOpen}>
              <HomeIcon
                sx={{
                  width: "24px",
                  height: "24px",
                  cursor: "pointer",
                  color:
                    location.pathname === "/admin"
                      ? "info.main"
                      : "textColor.dark" ||
                        location.pathname === "/admin/:provinceName"
                      ? "info.main"
                      : "textColor.dark",
                }}
              />
            </IconButton>
            {opennav && (
              <Typography
                component="span"
                variant="h6"
                sx={{
                  visibility: isTypographyVisible ? "visible" : "hidden",
                  opacity: isTypographyVisible ? 1 : 0,
                  transition: "visibility 0s linear 0.3s, opacity 0.3s",
                }}
              >
                صفحه اصلی
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <IconButton onClick={toggleSpeedTest}>
              <SpeedIcon
                sx={{ width: "24px", height: "24px", cursor: "pointer" }}
              />
            </IconButton>
            {opennav && (
              <Typography
                component="span"
                variant="h6"
                sx={{
                  visibility: isTypographyVisible ? "visible" : "hidden",
                  opacity: isTypographyVisible ? 1 : 0,
                  transition: "visibility 0s linear 0.3s, opacity 0.3s",
                }}
              >
                تست سرعت
              </Typography>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            width: historyOpen ? "170px" : "52px",
            px: historyOpen ? "6px" : "",
            height: "250px",
            borderRadius: "25px",
            bgcolor: "#f4f6f9",
            color: "#676767",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: historyOpen ? "flex-start" : "center",
            alignItems: "center",
            transition: "all 0.4s ease-in",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <IconButton onClick={toggleHistoryTest}>
              <HistoryIcon
                sx={{ width: "24px", height: "24px", cursor: "pointer" }}
              />
            </IconButton>
            {historyOpen && (
              <Typography
                component="span"
                variant="h6"
                sx={{
                  visibility: isTypographyVisible ? "visible" : "hidden",
                  opacity: isTypographyVisible ? 1 : 0,
                  transition: "visibility 0s linear 0.3s, opacity 0.3s",
                }}
              >
                تست های گذشته
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              onClick={toggleMyOperator}
              style={{
                cursor: "pointer",
                userSelect: "none",
                width: "24px",
                height: "24px",
                objectFit: "cover",
                marginRight: historyOpen ? "0.48rem" : "0",
              }}
              src={CompanyLogo}
              alt="Company-logo"
            />
            {historyOpen && (
              <Typography
                component="span"
                variant="h6"
                sx={{
                  mr: historyOpen ? "0.6rem" : "",
                  visibility: isTypographyVisible ? "visible" : "hidden",
                  opacity: isTypographyVisible ? 1 : 0,
                  transition: "visibility 0s linear 0.3s, opacity 0.3s",
                }}
              >
                اپراتور من
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <IconButton onClick={toggleResult}>
              <InfoOutlinedIcon
                sx={{ width: "24px", height: "24px", cursor: "pointer" }}
              />
            </IconButton>
            {historyOpen && (
              <Typography
                component="span"
                variant="h6"
                sx={{
                  visibility: isTypographyVisible ? "visible" : "hidden",
                  opacity: isTypographyVisible ? 1 : 0,
                  transition: "visibility 0s linear 0.3s, opacity 0.3s",
                }}
              >
                اطلاعات شبکه من
              </Typography>
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <IconButton onClick={toggleInformation}>
              <SignalCellularAltOutlinedIcon
                sx={{ width: "24px", height: "24px", cursor: "pointer" }}
              />
            </IconButton>
            {historyOpen && (
              <Typography
                component="span"
                variant="h6"
                sx={{
                  visibility: isTypographyVisible ? "visible" : "hidden",
                  opacity: isTypographyVisible ? 1 : 0,
                  transition: "visibility 0s linear 0.3s, opacity 0.3s",
                }}
              >
                گزارش ها
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NewNavbar;
