import React, { useState, useCallback } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DoneReport from "../../app/common/DoneReport";
// Lazy load the components
const NewLogo = React.lazy(() => import("../../app/common/NewLogo"));
const SendErrorReport = React.lazy(() =>
  import("../../app/common/SendErrorReport")
);
const CustomSnackbar = React.lazy(() =>
  import("../../app/common/CustomSnackbar")
);
const InternetStatusCard = React.lazy(() => import("./InternetStatusCard"));
const ISPStatistics = React.lazy(() => import("./ISPStatistics"));
const ISPCompareTable = React.lazy(() => import("./ISPCompareTable"));

import useDynamicMP from "../../app/hooks/useDynamicMP";
import LoadingSpinner from "../../app/common/LoadingSpinner";
import DisorderReport from "../../app/common/DisorderReport";

/**
 * Dashboard component displays the main user interface of the application.
 * It shows status, statistics, and comparison data related to internet service providers.
 *
 * @component
 * @example
 * return (
 *   <Dashboard />
 * )
 */
const Dashboard = () => {
  const navigate = useNavigate();
  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const [province, setProvince] = useState("");
  const [disturbance, setDisturbance] = useState(false);
  const [openErrorDialog, setOpenErrorDialog] = useState(false);
  const [openDisorderDialog, setOpenDisorderDialog] = useState(false);
  const [openDoneReport, setOpenDoneReport] = useState(false);

  /**
   * Handles province selection and navigates to the specific province dashboard.
   * @param {Object} event - The event object
   */

  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;

    setProvince(selectedProvince);

    navigate(`/dashboard/${selectedProvince}`, {
      state: {
        provinceName: selectedProvince,
        provinceQuality: Math.floor(Math.random() * 50) + 50,
      },
    });
  };
  /**
   * Sets disturbance state to true.
   */
  const handleDisturbanceClick = useCallback(() => setDisturbance(true), []);

  /**
   * Closes the disturbance snackbar.
   * @param {Object} event - The event object
   * @param {string} reason - The reason for the close event
   */
  const handleDisturbanceClose = useCallback((event, reason) => {
    if (reason !== "clickaway") {
      setDisturbance(false);
    }
  }, []);

  /**
   * Opens the report dialog.
   */
  const handleClickOpenErrorDialog = useCallback(
    () => setOpenErrorDialog(true),
    []
  );
  const handleClickOpenDisorderDialog = useCallback(
    () => setOpenDisorderDialog(true),
    []
  );

  /**
   * Closes the report dialog.
   */
  const handleCloseDialog = useCallback(() => setOpenErrorDialog(false), []);
  const handleCloseDisorderDialog = useCallback(
    () => setOpenDisorderDialog(false),
    []
  );

  return (
    <>
      <InternetStatusCard
        openErrorDialog={handleClickOpenErrorDialog}
        openDisorderDialog={handleClickOpenDisorderDialog}
        handleDisturbanceClick={handleDisturbanceClick}
        province={province}
        handleProvinceChange={handleProvinceChange}
        qualityPercentage={78}
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
        <ISPStatistics mpCardContainers={mpCardContainers} />
        <ISPCompareTable mpCardContainers={mpCardContainers} />
      </Box>
      <CustomSnackbar
        open={disturbance}
        message="گزارش شما با موفقیت ارسال شد."
        severity="info"
        handleClose={handleDisturbanceClose}
      />
      <DisorderReport
        openDialog={openDisorderDialog}
        handleCloseDialog={handleCloseDisorderDialog}
        handleDoneReportOpen={() => setOpenDoneReport(true)}
      />

      <SendErrorReport
        openErrorDialog={openErrorDialog}
        handleCloseErrorDialog={handleCloseDialog}
        handleDoneReportOpen={() => setOpenDoneReport(true)}
      />
      <DoneReport
        openDialog={openDoneReport}
        handleCloseDialog={() => {
          setOpenDoneReport(false);
          setOpenErrorDialog(true);
        }}
      />
    </>
  );
};

export default Dashboard;
