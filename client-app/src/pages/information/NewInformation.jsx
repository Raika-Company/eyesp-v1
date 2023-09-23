/**
 * Custom Information component for the application.
 * @module NewInformation
 * @description This component displays new information with definitions.
 */
// React core and hooks
import React, { useState, useEffect } from "react";

import axios from "axios";
import { Box, Container, Typography, useMediaQuery } from "@mui/material";

/**
 * A hook from Material-UI to access the current theme.
 * @function useTheme
 * @returns {Object} The current theme object.
 */
import { useTheme } from "@mui/material/styles";

// Local components
// Importing custom LoadingSpinner component for modular structure
import LoadingSpinner from "../../app/common/LoadingSpinner";

import styles from "./NewInformation.module.css";
// Assets
// Importing images used in the Result component
import informationLogo from "../../../public/icon-information.png";
import FilterListIcon from "@mui/icons-material/FilterList";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import NewLogo from "../../app/common/NewLogo";
/**
 * React component for displaying new information with definitions.
 * @function NewInformation
 * @returns {React.Element} The rendered React component.
 */
const NewInformation = () => {
  const theme = useTheme();
  const bgColor = theme.palette.mode === "light" ? "#f7f9fc" : "#2a2c2f";
  const [definitionsData, setDefinitionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  /**
   * Fetch definitions data from the server.
   * @async
   * @function
   * @returns {Promise<void>} A promise that resolves when the data is fetched.
   */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/data/definitions.json");
        setDefinitionsData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // Importing custom LoadingSpinner component for modular structure
  if (loading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <Box
      my="1rem"
      overflow="hidden"
      sx={{
        height: "auto",
        padding: isSmScreen ? "0.7rem" : "3rem",
        borderRadius: "1.2rem",
        border: "1.468px solid rgba(0, 0, 0, 0.10)",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
        backgroundColor: bgColor,
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component="h2"
          gutterBottom
          sx={{
            fontSize: isSmScreen ? "1.7rem" : "2rem",
            pt: "1rem",
          }}
        >
          مفاهیم
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: isSmScreen ? 160 : 200,
              borderRadius: "25px",
            }}
          >
            <InputBase
              sx={{ mr: 1, flex: 1 }}
              placeholder="جست و جو"
              inputProps={{ "aria-label": "جست و جو" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <IconButton sx={{ p: "10px" }} aria-label="FilterListIcon">
            <FilterListIcon />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            overflowX: "hidden",
            width: isLgScreen ? "100%" : "60%",
            p: isSmScreen ? "0.5rem" : "1rem",
            direction: "ltr",
          }}
          className={isMdScreen ? "" : styles.ScrollBar}
        >
          {definitionsData.map((definition) => (
            <DefinitionTerm title={definition.title} key={definition.title}>
              {definition.definition}
            </DefinitionTerm>
          ))}
        </Box>
        <Box sx={{ mx: "auto", display: isLgScreen ? "none" : "flex" }}>
          <img
            src={informationLogo}
            alt="information-logo"
            style={{ opacity: "0.2" }}
          />
        </Box>
      </Box>
    </Box>
  );
};
/**
 * React component for rendering a definition term.
 * @function DefinitionTerm
 * @param {Object} props - The component's props.
 * @param {string} props.title - The title of the definition.
 * @param {React.Node} props.children - The content of the definition.
 * @returns {React.Element} The rendered React component.
 */
const DefinitionTerm = ({ title, children }) => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Typography
      component="p"
      gutterBottom
      sx={{
        borderBottom: isSmScreen ? "1px solid #E2E4E7" : "none",
        display: "flex",
        justifyContent: "space-between",
        fontSize: "1.1rem",
        backgroundColor: isSmScreen
          ? "transparent"
          : theme.palette.mode === "dark"
          ? "rgba(0, 0, 0, 0.8)"
          : "rgba(255, 255, 255, 0.8)",
        borderRadius: isSmScreen ? "" : "32px",
        py: "1em",
        boxShadow: isSmScreen ? "" : "0px 0px 15px 0px rgba(0, 0, 0, 0.20)",
        direction: "rtl",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 1)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography
        sx={{
          width: isSmScreen ? "100px" : "27%",
          mr: isSmScreen ? "0" : "1rem",
        }}
        component="span"
        fontFamily="PeydaBold"
      >
        {title}
      </Typography>
      <Typography sx={{ width: isSmScreen ? "207px" : "100%" }}>
        {children}
      </Typography>
    </Typography>
  );
};

export default NewInformation;
