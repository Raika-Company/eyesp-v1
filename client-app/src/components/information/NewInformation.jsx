/**
 * Custom Information component for the application.
 * @module NewInformation
 * @description This component displays new information with definitions.
 */
// React core and hooks
import React, { useState, useEffect } from "react";

import axios from "axios";
import { Box, Container, TextField, Typography } from "@mui/material";

/**
 * A hook from Material-UI to access the current theme.
 * @function useTheme
 * @returns {Object} The current theme object.
 */
import { useTheme } from "@mui/material/styles";

// Local components
// Importing custom LoadingSpinner component for modular structure
import LoadingSpinner from "../../app/common/LoadingSpinner";

// Assets
// Importing images used in the Result component
import informationLogo from "../../../public/icon-information.png";
import styles from "./NewInformation.module.css";
import FilterListIcon from "@mui/icons-material/FilterList";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import NewLogo from "../../app/common/NewLogo";
/**
 * React component for displaying new information with definitions.
 * @function NewInformation
 * @returns {React.Element} The rendered React component.
 */

const NewInformation = () => {
  //State and variable declarations here

  const theme = useTheme();
  const bgColor = theme.palette.mode === "light" ? "#f7f9fc" : "#2a2c2f";
  const [definitionsData, setDefinitionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <Container maxWidth="lg" sx={{ height: "calc(100dvh - 2.5rem)" }}>
      <NewLogo />
      <Box
        my="1rem"
        overflow="hidden"
        sx={{
          height: "auto",
          padding: "3rem",
          borderRadius: "1.2rem",
          border: "1.468px solid rgba(0, 0, 0, 0.10)",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          backgroundColor: bgColor,
        }}
      >
        <Box
          sx={{
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
              fontSize: "2rem",
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
                width: 200,
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
          <Box sx={{ overflowX: "hidden"}} className={styles.ScrollBar}>
            {definitionsData.map((definition) => (
              <DefinitionTerm title={definition.title} key={definition.title}>
                {definition.definition}
              </DefinitionTerm>
            ))}
          </Box>
          <Box sx={{ mx: "auto" }}>
            <img
              src={informationLogo}
              alt="information-logo"
              style={{ opacity: "0.2" }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
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

  return (
    <Typography
      component="p"
      gutterBottom
      sx={{
        fontSize: "1.1rem",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
        borderRadius: "32px",
        padding: "1em",
        boxShadow: "0px 0px 15px 0px rgba(0, 0, 0, 0.20)",
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
        component="span"
        fontFamily="PeydaBold"
        sx={{
          marginRight: "0.5em",
          marginLeft: "0.4em",
        }}
      >
        {title}
      </Typography>
      {children}
    </Typography>
  );
};

export default NewInformation;
