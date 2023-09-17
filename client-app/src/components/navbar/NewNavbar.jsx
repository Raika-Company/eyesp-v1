import { Card, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

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
  return (
    <Box
      sx={{
        width: "130px",
        height: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "transparent",
      }}
    >
      <Card
        sx={{
          width: "60px",
          height: "500px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
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
          <IconButton>
            <MenuIcon
              sx={{
                cursor: "pointer",
              }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "55px",
            height: "140px",
            borderRadius: "25px",
            bgcolor: "#f4f6f9",
            color: "#676767",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <HomeIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
          </IconButton>
          <IconButton>
            <SpeedIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
          </IconButton>
        </Box>
        <Box
          sx={{
            width: "55px",
            height: "250px",
            borderRadius: "25px",
            bgcolor: "#f4f6f9",
            color: "#676767",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton>
            <HistoryIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
          </IconButton>
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
          <IconButton>
            <InfoOutlinedIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
          </IconButton>
          <IconButton>
            <SignalCellularAltOutlinedIcon
              sx={{ width: "35px", height: "35px", cursor: "pointer" }}
            />
          </IconButton>
        </Box>
      </Card>
    </Box>
  );
};

export default NewNavbar;
