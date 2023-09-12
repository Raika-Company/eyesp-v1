import { forwardRef, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  Slide,
  Typography,
  useTheme,
} from "@mui/material";

import { Snackbar, SnackbarContent } from "@mui/material";

import Download from "../../app/assets/image/download.svg";
import Upload from "../../app/assets/image/upload.svg";
import Ping from "../../app/assets/image/ping.svg";
import Globe from "../../app/assets/image/globe.svg";
import Person from "../../app/assets/image/person.svg";

import FaceBook from "../../app/assets/image/imgLogoSocialM/Facebook.webp";
import Twitter from "../../app/assets/image/imgLogoSocialM/twitter.webp";
import Linkedin from "../../app/assets/image/imgLogoSocialM/linkedin.webp";
import Telegram from "../../app/assets/image/imgLogoSocialM/Telegram.webp";
import WhatsApp from "../../app/assets/image/imgLogoSocialM/WhatsApp.webp";
import Eita from "../../app/assets/image/imgLogoSocialM/eita.webp";

import CustomAccordion from "./CustomAccordion";

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
        <Typography variant="h2" sx={{ color: "textColor.dark" }}>
          {measure}
        </Typography>

        <Typography variant="h2" sx={{ color: "textColor.dark" }}>
          {value !== null ? value : "--"}
        </Typography>
      </Box>
      <img src={iconSrc} alt={altText} height="28px" />
    </Box>
  </Box>
);

const InformationBox = ({ title, value, iconSrc, altText, buttonLabel }) => (
  <Box display="flex" alignItems="flex-end" flexDirection="row" gap={1}>
    <img src={iconSrc} alt={altText} height="60px" />
    <Box display="flex" flexDirection="column" textAlign="right">
      <Typography component="h6" variant="h2" color="textColor.dark">
        {title}
      </Typography>
      <Typography component="span" variant="h3" color="textColor.light">
        {value}
      </Typography>
      {buttonLabel ? <Button>{buttonLabel}</Button> : null}
    </Box>
  </Box>
);

const Result = () => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);

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
  const location = useLocation();
  const textRef = useRef(null);
  const queryParams = new URLSearchParams(location.search);

  const ping = queryParams.get("ping");
  const download = queryParams.get("download");
  const upload = queryParams.get("upload");

  const [expanded, setExpanded] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCopyLink = () => {
    if (textRef.current) {
      navigator.clipboard.writeText(textRef.current.innerText).then(() => {
        handleClose();
        setSnackbarOpen(true);
      });
    }
  };
  const theme = useTheme();

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-evenly"
        padding="2rem"
        width="60%"
        marginTop="18dvh"
        marginX="auto"
        alignItems="center"
        textAlign="center"
        gap={10}
        sx={{
          borderRadius: "1.2rem",
          border: "1.468px solid rgba(0, 0, 0, 0.10)",
          background: "transparent",
          display: { xs: "none", md: "flex" },
        }}
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
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          gap={10}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          <InformationBox
            title="سرور مقصد"
            value="تهران - امام"
            iconSrc={Globe}
            altText="Globe Icon"
          />
          <InformationBox
            title="همراه اول"
            value="51.15.57.153"
            iconSrc={Person}
            altText="Person Icon"
          />
        </Box>
      </Box>
      <Box
        gap={4}
        display="flex"
        justifyContent="space-evenly"
        width="35%"
        marginTop="5dvh"
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
          sx={{
            backgroundColor: "#126AED",
            color: "white",
            fontSize: "1.8rem",
            borderRadius: "1.3rem",
            border: 0,
            width: "24rem",
            p: "0.7rem",
            textAlign: "center",
          }}
        >
          تست مجدد
        </Button>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          sx={{
            backgroundColor: "#DB7F12",
            color: "white",
            fontSize: "1.8rem",
            borderRadius: "1.3rem",
            border: 0,
            width: "15rem",
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
            width: "90%",
          }}
        >
          تست مجدد
        </Button>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          sx={{
            backgroundColor: "#DB7F12",
            color: "white",
            fontSize: "1.8rem",
            borderRadius: "1.625rem",
            border: 0,
            p: "1rem",
            width: "90%",
          }}
        >
          اشتراک گذاری
        </Button>
      </Box>
      <CustomAccordion
        expanded={expanded}
        setExpanded={setExpanded}
        Person={Person}
        Globe={Globe}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"اشتراک گذاری تست سرعت شما"}</DialogTitle>

        <List
          sx={{
            display: "flex",
            fontSize: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {ShareDialog.map((item, index) => (
            <ListItem sx={{}} key={index}>
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

        <DialogContent>
          <DialogContentText
            sx={{
              fontSize: theme.typography.h6,
              p: "1.5rem 0.5rem",
              border: "1px solid",
              color: "textColor.main",
              borderColor: "border.main",
              borderRadius: "0.6rem",
            }}
            id="alert-dialog-slide-description"
            ref={textRef}
          >
            {`http://185.11.89.101:6530/result?ping=${ping}&download=${download}&upload=${upload}`}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCopyLink}>کپی کردن لینک</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <SnackbarContent
          message="لینک کپی شد"
          action={
            <Button
              color="primary"
              size="small"
              onClick={() => setSnackbarOpen(false)}
            >
              بستن
            </Button>
          }
        />
      </Snackbar>
    </>
  );
};
export default Result;
