import { forwardRef, useState, useRef } from "react";

// Third-party libraries or components
// Import Material-UI components and styles
import { useLocation, Link } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Snackbar, SnackbarContent } from "@mui/material";

// Assets
// Importing images used in the Result component
import Download from "../../app/assets/image/download.svg";
import Upload from "../../app/assets/image/upload.svg";
import Ping from "../../app/assets/image/ping.svg";
import FaceBook from "../../app/assets/image/imgLogoSocialM/Facebook.webp";
import Twitter from "../../app/assets/image/imgLogoSocialM/twitter.webp";
import Linkedin from "../../app/assets/image/imgLogoSocialM/linkedin.webp";
import Telegram from "../../app/assets/image/imgLogoSocialM/Telegram.webp";
import WhatsApp from "../../app/assets/image/imgLogoSocialM/WhatsApp.webp";
import Eita from "../../app/assets/image/imgLogoSocialM/eita.webp";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SpeedBox = ({ title, iconSrc, altText, value, measure, opacity }) => (
  <Box>
    <Typography
      variant="h4"
      sx={{
        color: "textColor.dark",
        opacity: 0.3,
        textAlign: "center",
        pl: "1.3rem",
      }}
    >
      {title}
    </Typography>
    <Box display="flex" alignItems="center" sx={{ opacity: opacity }}>
      <Box
        sx={{
          display: "flex",
          ml: "0.5rem",
          pt: "0.5rem",
        }}
      >
        <Typography variant="h3" sx={{ color: "textColor.dark" }}>
          {measure}
        </Typography>

        <Typography variant="h3" sx={{ color: "textColor.dark" }}>
          {value !== null ? value : "--"}
        </Typography>
      </Box>
      <img src={iconSrc} alt={altText} height="28px" />
    </Box>
  </Box>
);
/**
 * InformationBox Component for displaying information.
 *
 * @param {object} props - Input properties.
 * @param {string} props.title - Information title.
 * @param {string} props.value - Information value.
 * @param {string} props.iconSrc - Icon image path.
 * @param {string} props.altText - Alternate text for the image.
 * @param {string} [props.buttonLabel] - Optional button label.
 * @returns {JSX.Element}
 */
const InformationBox = ({ title, value, iconSrc, altText, buttonLabel }) => (
  <Box display="flex" alignItems="flex-end" flexDirection="row" gap={1}>
    <img src={iconSrc} alt={altText} height="60px" />
    <Box display="flex" flexDirection="column" textAlign="right">
      <Typography component="h6" variant="h6" color="textColor.dark">
        {title}
      </Typography>
      <Typography component="span" variant="body1" color="textColor.light">
        {value}
      </Typography>
      {buttonLabel ? <Button>{buttonLabel}</Button> : null}
    </Box>
  </Box>
);

const ShowResult = ({ handleCloseDialog, openDialog, ping, download, upload }) => {
  //State and variable declarations here

  /**
   * Snackbar open state.
   *
   * State variable to manage the open state of the snackbar.
   *
   * @type {boolean}
   */
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  /**
   * ShareDialog data.
   *
   * An array of social media platforms for sharing the results.
   *
   * @type {object[]}
   * @property {string} name - The name of the social media platform.
   * @property {string} avatar - The URL of the platform's avatar.
   */
  const ShareDialog = [
    {
      name: "فیسبوک",
      avatar: FaceBook,
    },
    {
      name: "توییتر",
      avatar: Twitter,
    },
    {
      name: "تلگرام",
      avatar: Telegram,
    },
    {
      name: "واتساپ",
      avatar: WhatsApp,
    },
    {
      name: "لینکدین",
      avatar: Linkedin,
    },
    {
      name: "ایتا",
      avatar: Eita,
    },
  ];

  /**
   * Location data.
   *
   * The location object from the React Router.
   *
   * @type {object}
   */
  const location = useLocation();

  /**
   * Text reference.
   *
   * A reference to the text element used for copying the link.
   *
   * @type {object}
   */
  const textRef = useRef(null);

  /**
   * Query parameters.
   *
   * Parsed query parameters from the URL.
   *
   * @type {object}
   */
  const queryParams = new URLSearchParams(location.search);

  /**
   * Expanded state.
   *
   * State variable to manage the expanded state of a component.
   *
   * @type {boolean}
   */
  const [expanded, setExpanded] = useState(false);

  /**
   * Dialog open state.
   *
   * State variable to manage the open state of a dialog.
   *
   * @type {boolean}
   */
  const [open, setOpen] = useState(false);

  /**
   * Handle opening the dialog.
   *
   * Function to open the sharing dialog.
   */
  const handleClickOpen = () => {
    setOpen(true);
  };

  /**
   * Handle closing the dialog.
   *
   * Function to close the sharing dialog.
   */
  const handleClose = () => {
    setOpen(false);
  };

  /**
   * Handle copying the link.
   *
   * Function to copy the result link to the clipboard.
   */
  const handleCopyLink = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.innerText).then(() => {
        setSnackbarOpen(true);
      });
    }
    setOpen(false);
  };

  /**
   * Theme.
   *
   * Material-UI theme object.
   *
   * @type {object}
   */
  const theme = useTheme();
  return (
    <Dialog onClose={handleCloseDialog} open={openDialog}>
      <DialogContent>
        <>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            padding="2rem"
            width="90%"
            marginX="auto"
            alignItems="center"
            textAlign="center"
            gap={10}
            sx={{
              borderRadius: "1.2rem",
              border: "1.468px solid rgba(0, 0, 0, 0.10)",
              background: "transparent",
              display: { xs: "none", md: "flex" },
            }} //Main content section
          >
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-evenly"
              width="100%"
            >
              <SpeedBox
                title="پینگ"
                iconSrc={Ping}
                altText="ping icon"
                value={ping}
                measure="ms"
                opacity={1}
                //Display ping, download, and upload speeds
              />
              <SpeedBox
                title="سرعت آپلود"
                iconSrc={Upload}
                altText="ping icon"
                value={upload}
                measure="Mbps"
                opacity={1}
              />
              <SpeedBox
                title="سرعت دانلود"
                iconSrc={Download}
                altText="ping icon"
                value={download}
                measure="Mbps"
                opacity={1}
              />
            </Box>
          </Box>
          <Box
            gap={4}
            display="flex"
            justifyContent="space-evenly"
            width="55%"
            marginTop="1rem"
            marginX="auto"
            alignItems="center"
            textAlign="center"
            sx={{
              background: "transparent",
              display: { xs: "none", md: "flex" },
            }}
          >
            <Button
              component={Link}
              to="/"
              variant="outlined"
              onClick={() => window.location.reload()}
              sx={{
                backgroundColor: "#1F75A6",
                color: "white",
                fontSize: "1.2rem",
                borderRadius: "1.3rem",
                border: 0,
                width: "16rem",
                p: "0.7rem",
                textAlign: "center",
                ":hover": {
                  bgcolor: "primary.light",
                  color: "white",
                  border: "none",
                },
              }}
              //Share and retry buttons
            >
              تست مجدد
            </Button>
            <Button
              onClick={handleClickOpen}
              variant="text"
              sx={{
                color: "#1F75A6",
                fontSize: "1.2rem",
                width: "19rem",
                p: "0.7rem",
              }}
            >
              اشتراک گذاری
            </Button>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-evenly"
            padding="1rem"
            width="88%"
            height="38.5dvh"
            marginTop="5dvh"
            marginX="auto"
            alignItems="center"
            textAlign="center"
            sx={{
              borderRadius: "1.2rem",
              border: "1.468px solid rgba(0, 0, 0, 0.10)",
              background: "transparent",
              display: { xs: "flex", md: "none" },
            }}
          >
            <SpeedBox
              title="پینگ"
              iconSrc={Ping}
              altText="ping icon"
              value={ping}
              measure="ms"
              opacity={1}
            />
            <SpeedBox
              title="سرعت آپلود"
              iconSrc={Upload}
              altText="ping icon"
              value={upload}
              measure="Mbps"
              opacity={1}
            />
            <SpeedBox
              title="سرعت دانلود"
              iconSrc={Download}
              altText="ping icon"
              value={download}
              measure="Mbps"
              opacity={1}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            justifyContent="space-evenly"
            width="70%"
            marginTop="2dvh"
            marginX="auto"
            alignItems="center"
            textAlign="center"
            sx={{
              background: "transparent",
              display: { xs: "flex", md: "none" },
            }}
          >
            <Button
              component={Link}
              to="/"
              variant="outlined"
              sx={{
                backgroundColor: "#126AED",
                color: "white",
                fontSize: "1.8rem",
                borderRadius: "1.625rem",
                border: 0,
                p: "1rem",
                width: "95%",
                ":hover": {
                  bgcolor: "primary.light",
                  color: "white",
                  border: "none",
                },
              }}
            >
              تست مجدد
            </Button>
            <Button
              onClick={handleClickOpen}
              variant="text"
              sx={{
                color: "#1F75A6",
                fontSize: "1.8rem",
                width: "95%",
                ":hover": {
                  bgcolor: "warning.main",
                  color: "white",
                  border: "none",
                },
              }}
            >
              اشتراک گذاری
            </Button>
          </Box>
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
          >
            <List
              sx={{
                display: "flex",
                fontSize: "10px",
                justifyContent: "center",
                alignItems: "center",
                overflow: "auto",
              }}
              //List of social media options for share link
            >
              {ShareDialog.map((item, index) => (
                <ListItem key={index}>
                  <ListItemButton
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "50px",
                    }}
                  >
                    <ListItemAvatar
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      <img
                        src={item.avatar}
                        alt="LogoSocialMedia"
                        height="45px"
                        width="45px"
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </ListItemAvatar>
                    <DialogContentText
                      sx={{ fontSize: theme.typography.h6, pt: "0.4rem" }}
                    >
                      {item.name}
                    </DialogContentText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <DialogContent
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.5em",
                gap: 1,
              }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={handleCopyLink}
              >
                کپی
              </Button>
              <Card
                sx={{ height: "50px", display: "flex", alignItems: "center" }}
              >
                <DialogContentText
                  sx={{
                    fontSize: theme.typography.h6,
                    color: "textColor.main",
                    whiteSpace: "nowrap",
                    overflow: "auto",
                  }}
                  id="alert-dialog-slide-description"
                  ref={textRef}
                  //Speed Test sharing link0660
                >
                  {`http://eyesp.live/result?ping=${ping}&download=${download}&upload=${upload}`}
                </DialogContentText>
              </Card>
            </DialogContent>
          </Dialog>
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert severity="success" sx={{ width: "100%" }}>
              لینک شما با موفقیت کپی شد.
            </Alert>
          </Snackbar>
        </>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          color="info"
          autoFocus
          onClick={handleCloseDialog}
          sx={{color: "#1F75A6"}}
        >
          مشاهده صفحه
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShowResult;
