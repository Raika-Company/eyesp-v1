/**
 * @file CustomAccordion.js
 * This file contains the `CustomAccordion` component which renders an accordion
 * tailored for displaying specific network-related details.
 */

// External dependencies
import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

/**
 * CustomAccordion Component
 *
 * This component renders a customized accordion designed to display information
 * regarding the user's network connection and chosen server.
 *
 * It primarily makes use of the Material-UI components for structure and styling.
 *
 * Props:
 * @param {boolean} expanded - State to track if the accordion is expanded or collapsed.
 * @param {Function} setExpanded - Function to set the state of the accordion (expanded/collapsed).
 * @param {string} Person - Source URL for the 'person' image.
 * @param {string} Globe - Source URL for the 'globe' image.
 *
 * @returns {React.Element} Rendered CustomAccordion component.
 */
const CustomAccordion = ({ expanded, setExpanded, Person, Globe }) => {
  return (
    <Accordion
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{
        display: { xs: "block", md: "none" },
        position: "fixed",
        bottom: 0,
        width: "100%",
        zIndex: 2,
      }}
    >
      <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          gap={3}
          width="100%"
        >
          <Box display="flex" flexDirection="column">
            <Typography variant="h4" component="h6" color="textColor.dark">
              همراه اول
            </Typography>
            <Typography variant="h3" color="textColor.light">
              51.15.57.153
            </Typography>
          </Box>
          <ExpandMoreIcon
            fontSize="large"
            sx={{
              transform: expanded ? "rotate(0deg)" : "rotate(-180deg)",
              transition: "transform 0.3s",
              marginLeft: "42px",
            }}
          />
          <img src={Person} alt="Person Icon" width="64px" />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          gap={3}
          width="100%"
        >
          <Box display="flex" flexDirection="column">
            <Typography component="h6" variant="h4" color="textColor.dark">
              سرور مقصد
            </Typography>
            <Typography variant="h3" color="textColor.light">
              تهران - امام
            </Typography>
            <Button variant="overline" sx={{ color: "info.main" }}>
              تغییر سرور
            </Button>
          </Box>
          <img src={Globe} alt="Globe Icon" width="64px" />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
