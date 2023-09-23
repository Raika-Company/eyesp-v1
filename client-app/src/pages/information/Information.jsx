/**
 * Information component displays definitions related to a specific topic. 
 * Each definition is presented with a term and its explanation.
 * @module Information
 */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import LoadingSpinner from "../../app/common/LoadingSpinner";

/**
 * Main component that wraps and presents the list of definitions.
 * It uses Material-UI's Box and Typography components to structure and style its content.
 * @function
 * @returns {JSX.Element} The rendered Information component.
 */

const Information = () => {
  const theme = useTheme();
  const bgColor = theme.palette.mode === "light" ? "#f7f9fc" : "#2a2c2f";

  const [definitionsData, setDefinitionsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/data/definitions.json');
                setDefinitionsData(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

  return (
    <Container maxWidth="lg">
      <Box
        marginY="max(2rem, 5vh)"
        sx={{
          borderRadius: "1.2rem",
          border: "1.468px solid rgba(0, 0, 0, 0.10)",
          padding: "1rem",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
          width: "100%",
          backgroundColor: bgColor,
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <Typography
          component="h2"
          gutterBottom
          sx={{
            fontSize: "2rem",
            marginBottom: "1.5rem",
            borderBottom: "2px solid #333",
            paddingBottom: "0.5rem",
          }}
        >
          تعاریف
        </Typography>

        {definitionsData.map((definition) => (
          <DefinitionTerm title={definition.title} key={definition.title}>
            {definition.definition}
          </DefinitionTerm>
        ))}
      </Box>
    </Container>
  );
};

/**
 * Represents a single definition term with its explanation. 
 * Uses the Material-UI's Typography component for displaying content.
 * @function
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The term/title for the definition.
 * @param {JSX.Element|string} props.children - The explanation of the term.
 * @returns {JSX.Element} The rendered DefinitionTerm component.
 */
const DefinitionTerm = ({ title, children }) => {
  const theme = useTheme();

  return (
    <Typography
      component="p"
      gutterBottom
      sx={{
        marginY: "0.75rem",
        fontSize: "1.1rem",
        backgroundColor:
          theme.palette.mode === "dark"
            ? "rgba(0, 0, 0, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
        borderRadius: "0.5rem",
        padding: "0.5em",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor:
            theme.palette.mode === "dark"
              ? "rgba(0, 0, 0, 1)"
              : "rgba(255, 255, 255, 1)",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          transform: "scale(1.05)",
        },
      }}
    >
      <Typography
        component="span"
        fontFamily="PeydaBold"
        sx={{
          color: "#0077b6",
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
export default Information;