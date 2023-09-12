import React, { memo, useEffect, useState } from "react";
import {
  Box,
  Card,
  Pagination,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";

// Components
import ProvinceNavbar from "./ProvinceNavbar";
import ArrowBack from "../../app/common/ArrowBack";
import ProvinceTable from "./../dashboard/province/ProvinceTable";
import LoadingSpinner from "../../app/common/LoadingSpinner";

/** Number of rows per page for pagination */
const ROWS_PER_PAGE = 8;

const footerStyles = {
  marginTop: "2rem",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "space-between",
  alignItems: "center",
};

const dateNavStyles = {
  color: "textColor.dark",
  display: "flex",
  alignItems: "center",
};

/**
 * Main component to display ISP details for a province
 * @returns {JSX.Element} Rendered ProvinceISP component
 */
const ProvinceISP = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "./../src/app/data/provinceISPsDetails.json"
        );
        setProvinces(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [page, setPage] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState("تهران");
  const rows = getProvinceRows(selectedProvince);

  /**
   * Main component to display ISP details for a province
   * @returns {JSX.Element} Rendered ProvinceISP component
   */
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <Typography>Error: {error.message}</Typography>;
  }
  return (
    <Box display="flex">
      <ProvinceNavbar onProvinceSelected={setSelectedProvince} />
      <MainContent />
    </Box>
  );

  /**
   * Retrieve rows for a given province name
   * @param {string|null} provinceName Name of the province
   * @returns {Array} Rows related to the provided province
   */
  function getProvinceRows(provinceName) {
    const matchedProvince = provinces.find((p) => p.name === provinceName);
    return matchedProvince ? matchedProvince.rows : [];
  }

  /**
   * Render the main content
   * @returns {JSX.Element} Rendered main content
   */
  function MainContent() {
    return (
      <Box width="100%" padding="max(1rem, 2.5vw)">
        <Header />
        <ProvinceDetails />
      </Box>
    );
  }

  /**
   * Render the main content
   * @returns {JSX.Element} Rendered main content
   */
  function Header() {
    return (
      <Box display="flex" justifyContent="space-between">
        <Typography gutterBottom>
          میانگین عملکرد ISPهای{" "}
          <Typography component="span" variant="h1" color="primary.main">
            استان {selectedProvince}
          </Typography>
        </Typography>
        <ArrowBack />
      </Box>
    );
  }

  /**
   * Render the main content
   * @returns {JSX.Element} Rendered main content
   */
  function ProvinceDetails() {
    return (
      <Card sx={cardStyles(isSmScreen)}>
        <ProvinceTable rows={rows} page={page} ROWS_PER_PAGE={ROWS_PER_PAGE} />
        <Footer />
      </Card>
    );
  }

  /**
   * Render the main content
   * @returns {JSX.Element} Rendered main content
   */
  function Footer() {
    return (
      <Box sx={footerStyles}>
        <DateNavigation />
        <PaginationControls />
      </Box>
    );
  }

  /**
   * Render the main content
   * @returns {JSX.Element} Rendered main content
   */
  function DateNavigation() {
    return (
      <Typography variant="overline" sx={dateNavStyles}>
        پرش به تاریخ:
        <DateLabel />
      </Typography>
    );
  }

  /**
   * Render the main content
   * @returns {JSX.Element} Rendered main content
   */
  function DateLabel() {
    return (
      <Typography
        variant="overline"
        component="span"
        sx={dateLabelStyles(isSmScreen)}
      >
        1403/06/08
      </Typography>
    );
  }

  /**
   * Render the main content
   * @returns {JSX.Element} Rendered main content
   */
  function PaginationControls() {
    return (
      <Stack spacing={2} sx={{ direction: "ltr" }}>
        <Pagination
          count={Math.ceil(rows.length / ROWS_PER_PAGE)}
          defaultPage={1}
          page={page}
          onChange={(event, newPage) => setPage(newPage)}
          color="primary"
        />
      </Stack>
    );
  }

  /**
   * Styles for the province details card
   * @param {boolean} isSmScreen Flag indicating if it's a small screen or not
   * @returns {Object} Style object
   */
  function cardStyles(isSmScreen) {
    return {
      width: "100%",
      padding: "clamp(1rem, 2.5vw, 3rem)",
      marginBottom: isSmScreen ? "6rem" : "1.5rem",
    };
  }

  /**
   * Styles for the date label
   * @param {boolean} isSmScreen Flag indicating if it's a small screen or not
   * @returns {Object} Style object
   */
  function dateLabelStyles(isSmScreen) {
    return {
      textAlign: "center",
      userSelect: "none",
      color: "textColor.main",
      backgroundColor: "textColor.subTitle",
      marginRight: isSmScreen ? "2px" : "10px",
      padding: isSmScreen ? "6px 6px" : "6px 10px",
      borderRadius: "10px",
    };
  }
};

export default memo(ProvinceISP);
