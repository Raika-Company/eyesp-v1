// React core imports
import React, { useState, useEffect } from "react";

// MUI (Material-UI) core and component imports
import {
  Box,
  Container,
  useMediaQuery,
} from "@mui/material";

// Local component and utility imports
import NewLogo from "../../app/common/NewLogo";

// Assets and data imports
import { useNavigate } from "react-router-dom";
import SendReport from "../../app/common/SendReport";

//Custom hooks imports
import useDynamicMP from "../../app/hooks/useDynamicMP";
import CustomSnackbar from "../../app/common/CustomeSnackbar";
import InternetStatusCard from "./InternetStatusCard";
import ISPStatistics from "./ISPStatistics";
import ISPCompareTable from "./ISPCompareTable";


const dashboard = () => {
  const navigate = useNavigate();
  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const [province, setProvince] = useState("");
  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;

    setProvince(selectedProvince);

    navigate(`/dashboard/${selectedProvince}`, {
      state: {
        provinceName: selectedProvince,
      },
    });
  };

  const [disturbance, setDisturbance] = useState(false);
  const handleDisturbanceClick = () => {
    setDisturbance(true);
  };
  const handleDisturbanceClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDisturbance(false);
  };

  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ minHeight: "100dvh" }}>
        <NewLogo />
        <InternetStatusCard
          handleClickOpenDialog={handleClickOpenDialog}
          handleDisturbanceClick={handleDisturbanceClick}
          province={province}
          handleProvinceChange={handleProvinceChange}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: isMdScreen ? "row" : "column-reverse",
            marginTop: mpCardContainers,
            gap: mpCardContainers,
            marginBottom: "2rem",
          }}
        >
          <ISPStatistics mpCardContainers={mpCardContainers}/>
          <ISPCompareTable mpCardContainers={mpCardContainers}/>
        </Box>
      </Container>
      <CustomSnackbar
        open={disturbance}
        message="گزارش شما با موفقیت ارسال شد."
        severity="info"
        handleClose={handleDisturbanceClose}
      />
      <SendReport
        openDialog={openDialog}
        handleCloseDialog={handleCloseDialog}
      />
    </>
  );
};

export default dashboard;