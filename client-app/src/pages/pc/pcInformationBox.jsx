import React, {forwardRef, useEffect, useState} from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Paper,
  Radio,
  Slide,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {useTheme} from "@emotion/react";
import axios from "axios";

/**
 * A React component for displaying information with an optional button.
 *
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title or label for the information.
 * @param {string} props.value - The information value to be displayed.
 * @param {string} props.iconSrc - The source URL for the icon representing the information type.
 * @param {string} props.altText - The alternative text for the icon.
 * @param {string} props.buttonLabel - The label for an optional button.
 * @returns {JSX.Element} - The rendered InformationBox component.
 */
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/**
 * PcInformationBox component displays information with an optional button for selecting a server.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {string} props.title - The title or label for the information.
 * @param {string} props.value - The information value to be displayed.
 * @param {string} props.iconSrc - The source URL for the icon representing the information type.
 * @param {string} props.altText - The alternative text for the icon.
 * @param {string} props.buttonLabel - The label for an optional button.
 * @returns {JSX.Element} - The rendered PcInformationBox component.
 */

const PcInformationBox = ({title, value, iconSrc, altText, buttonLabel}) => {
  const theme = useTheme();
  const [servers, setServers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedServerURL, setSelectedServerURL] = useState("");
  const [openSelectServer, setOpenSelectServer] = useState(false);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleSelectServer = () => {
    setOpenSelectServer(true);
  };
  const handleCloseSelectServer = () => {
    setOpenSelectServer(false);
  };

  useEffect(() => {
    const getServers = async () => {
      const serverData = await fetchServers();
      setServers(serverData);
    };

    getServers();
  }, []);

  /**
   * Fetches server data from the API.
   * @returns {Promise<Array>} - A promise that resolves to an array of server data.
   */

  const fetchServers = async () => {
    try {
      const response = await axios.get("https://server1.eyesp.live/servers");
      return response.data;
    } catch (error) {
      console.error("Error fetching servers:", error);
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
        <Box
          sx={{
            border: "1px solid #FFF",
            borderRadius: "50%",
            p: "1rem",
            width: isMdScreen ? "30px" : "50px",
            height: isMdScreen ? "30px" : "50px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: isMdScreen ? "19px" : "29px",
              height: isMdScreen ? "19px" : "29px",
            }}
            src={iconSrc}
            alt={altText}
          />
        </Box>
        <Box>
          <Typography sx={{color: "#FFF"}} variant="h1">
            {title}
          </Typography>
          <Typography sx={{color: "#8d8d8d"}} variant="h6">
            {value}
          </Typography>
          {buttonLabel ? (
            <Typography
              onClick={handleSelectServer}
              component="button"
              sx={{
                color: "#D81303",
                bgcolor: "transparent",
                outline: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              {buttonLabel}
            </Typography>
          ) : null}
        </Box>
      </Box>
      <Dialog
        open={openSelectServer}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseSelectServer}
        aria-describedby="Change Server"
        PaperProps={{
          sx: {
            borderRadius: "2rem",
            background: "#363636",
            marginRight: "5%",
          },
        }}
      >
        <DialogTitle
          sx={{display: "flex", justifyContent: "space-between", gap: "4rem"}}
        >
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
                borderRadius: "25px",
                bgcolor: "#444",
              }}
            >
              <InputBase
                sx={{mr: 1, color: "#fff", mt: "0.4rem"}}
                placeholder="Search"
                inputProps={{"aria-label": "Search"}}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <IconButton
                type="button"
                sx={{p: "10px", color: "#cfcfcf"}}
                aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          <Button
            sx={{color: "#fff"}}
            onClick={handleCloseSelectServer}
            endIcon={
              <CloseIcon
                sx={{marginX: "0.5rem", color: "#cfcfcf", mb: "0.3rem"}}
              />
            }
          >
            Close
          </Button>
        </DialogTitle>
        <DialogContent>
          {servers.map((server) => (
            <Box
              key={server.id}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              width="100%"
              padding="0.5rem"
              borderRadius="1.4375rem"
              backgroundColor={
                theme.palette.mode === "light" ? "#cfcfcf" : "#000"
              }
            >
              <Typography variant="body1">
                {server.name} - {server.location}
              </Typography>
              <Radio
                value={server.url}
                checked={selectedServerURL === server.url}
                onChange={(e) => setSelectedServerURL(e.target.value)}
              />
            </Box>
          ))}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PcInformationBox;
