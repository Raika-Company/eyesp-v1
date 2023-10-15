/**
 * Custom Information component for the application.
 * @module Information
 * @description This component displays new information with definitions.
 */
// React core and hooks
import React, { useState, useEffect } from "react";

import axios from "axios";
import {
  Box,
  Container,
  Typography,
  useMediaQuery,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import moreInformation from "../../app/assets/image/moreInformation.svg";
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
import FilterListIcon from "@mui/icons-material/FilterList";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

/**
 * React component for displaying new information with definitions.
 * @function Information
 * @returns {React.Element} The rendered React component.
 */
const Information = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const theme = useTheme();
  const [definitionsData, setDefinitionsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isLgScreen = useMediaQuery((theme) => theme.breakpoints.down("lg"));
  const [selectedDefinition, setSelectedDefinition] = useState(null);

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

  const filteredDefinitions = definitionsData.filter((definition) =>
    definition.title.includes(searchQuery)
  );

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
      display="flex"
      sx={{
        padding: isSmScreen ? "0.7rem" : "2rem",
        backgroundColor: "transparent",
        gap: "0.56rem",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        sx={{ flexBasis: isMdScreen ? "100%" : "50%" }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: "1rem",
          }}
        >
          <Typography
            component="h2"
            gutterBottom
            variant="h1"
            color="text.textBlack"
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
                borderRadius: "1rem",
                border: "1px solid #676767",
              }}
            >
              <InputBase
                sx={{ mr: 1, flex: 1 }}
                placeholder="جست و جو"
                inputProps={{ "aria-label": "جست و جو" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            {/* <IconButton sx={{ p: "10px" }} aria-label="FilterListIcon">
              <FilterListIcon />
            </IconButton> */}
          </Box>
        </Box>{" "}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            maxHeight: "69dvh",
            overflowY: "scroll",
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Box
            sx={{
              overflowX: "hidden",
              width: isLgScreen ? "100%" : "100%",
              // p: isSmScreen ? "0.5rem" : "1rem",
              paddingBlock: "1rem",
              paddingInline: "1rem",
              direction: "ltr",
              display: "flex",
              flexDirection: "column",
              gap: ".1rem",
            }}
          >
            {filteredDefinitions.map((definition) => (
              <DefinitionTerm
                title={definition.title}
                key={definition.title}
                onClick={() => setSelectedDefinition(definition)}
              >
                {definition.definition}
              </DefinitionTerm>
            ))}
          </Box>
        </Box>
      </Box>
      <Box
        height="68dvh"
        mt="4rem"
        display="flex"
        borderRadius=".75rem"
        sx={{
          flexBasis: isMdScreen ? "100%" : "50%",
          border: "1px solid white",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          paddingInline={isMdScreen ? "23px" : "150px"}
          m="auto"
          gap={2}
        >
          <Typography>
            {selectedDefinition
              ? selectedDefinition.title
              : definitionsData[0].title}
          </Typography>
          <Typography align="justify">
            {selectedDefinition
              ? selectedDefinition.moreInformation
              : definitionsData[0].moreInformation}
          </Typography>
          <Button
            sx={{ marginTop: "3rem", gap: "0.5rem" }}
            variant="text.main"
            component="a"
            href={`https://fa.wikipedia.org/wiki/${
              selectedDefinition
                ? encodeURIComponent(selectedDefinition.title)
                : encodeURIComponent(definitionsData[0].title)
            }`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={moreInformation} alt="moreInformation" />
            اطلاعات بیشتر
          </Button>
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
const DefinitionTerm = ({ title, children, onClick }) => {
  const theme = useTheme();
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  return (
    <Typography
      component="p"
      gutterBottom
      onClick={onClick}
      sx={{
        borderBottom: isSmScreen ? "1px solid #E2E4E7" : "none",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: isSmScreen
          ? "transparent"
          : theme.palette.mode === "dark"
          ? "transparent"
          : "rgba(255, 255, 255, 0.8)",
        borderRadius: "0.75rem",
        border: theme.palette.mode === "dark" ? "1px solid #FFF" : "none",
        py: "1em",
        px: "1em",
        boxShadow: isSmScreen ? "" : "0px 0px 15px 0px rgba(0, 0, 0, 0.20)",
        direction: "rtl",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "light"
              ? "rgba(255, 255, 255, 1)"
              : "transparent",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transform: "scale(1.04)",
        },
      }}
    >
      <Typography
        variant="h4"
        color="text.textBlack"
        sx={{
          width: isSmScreen ? "100px" : "27%",
          mr: isSmScreen ? "0" : "1rem",
        }}
        component="span"
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color="text.textBlack"
        sx={{ width: isSmScreen ? "207px" : "100%" }}
      >
        {children}
      </Typography>
    </Typography>
  );
};

export default Information;
