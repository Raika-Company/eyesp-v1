import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

import CompanyLogo from "../../app/assets/image/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import SpeedIcon from "@mui/icons-material/Speed";
import HistoryIcon from "@mui/icons-material/History";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import SignalCellularAltOutlinedIcon from "@mui/icons-material/SignalCellularAltOutlined";

const pages = [
  ["صفحه اصلی", "/"],
  ["تست سرعت", "/admin"],
  ["تست های گذشته", "/"],
  ["اپراتورمن", "/"],
  ["اطلاعات شبکه من", "/"],
  ["گزارش ها", "/"],
];

const NewNavbar = () => {
  const [homeOpen, setHomeOpen] = useState(false);
  const [historyOpenOpen, setHistoryOpen] = useState(false);

  const toggleOpenMenu = () => {
    setHomeOpen(!homeOpen);
    setHistoryOpen(!historyOpenOpen);
  };

  return (
    <Box
      sx={{
        pt: "2.1rem",
        mr: "0.7rem",
      }}
    >
      <Box
        sx={{
          mr: "0.2rem",
          mb: "1rem",
          width: "55px",
          height: "55px",
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
            }}
          />
        </IconButton>
      </Box>
      <Box
        sx={{
          width: homeOpen || historyOpenOpen ? "180px" : "60px",
          height: "500px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: homeOpen ? "177px" : "55px",
            height: "140px",
            borderRadius: "25px",
            bgcolor: "#f4f6f9",
            color: "#676767",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <IconButton>
            <HomeIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
          </IconButton>
          {homeOpen && (
            <Typography component="span" variant="h6">
              صفحه اصلی
            </Typography>
          )}
          <IconButton>
            <SpeedIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
          </IconButton>
          {homeOpen && (
            <Typography component="span" variant="h6">
              تست سرعت
            </Typography>
          )}
        </Box>
        <Box
          sx={{
            width: historyOpenOpen ? "177px" : "55px",
            textAlign: historyOpenOpen ? "right" : "center",

            height: "250px",
            borderRadius: "25px",
            bgcolor: "#f4f6f9",
            color: "#676767",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton>
            <HistoryIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
            {historyOpenOpen && (
              <Typography component="span" variant="h6">
                تست های گذشته
              </Typography>
            )}
          </IconButton>
          <figure
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              marginRight: "0.5rem",
            }}
          >
            <img
              style={{
                cursor: "pointer",
                userSelect: "none",
                width: "30px",
                height: "30px",
              }}
              src={CompanyLogo}
              alt="Company-logo"
            />
            {historyOpenOpen && (
              <Typography component="span" variant="h6">
                اپراتور من
              </Typography>
            )}
          </figure>
          <IconButton>
            <InfoOutlinedIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
            {historyOpenOpen && (
              <Typography component="span" variant="h6">
                اطلاعات شبکه من
              </Typography>
            )}
          </IconButton>
          <IconButton>
            <SignalCellularAltOutlinedIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
            {historyOpenOpen && (
              <Typography component="span" variant="h6">
                گزارش ها
              </Typography>
            )}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default NewNavbar;
