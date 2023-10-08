import React from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  useTheme,
  useMediaQuery,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  styled,
  DialogActions,
} from "@mui/material";
import done from "../assets/image/done.svg";
import CloseIcon from "@mui/icons-material/Close";
import { ContainedButton } from "./ContainedButton";
const DoneReport = ({ handleCloseDialog, openDialog }) => {
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Dialog
      onClose={handleCloseDialog}
      open={openDialog}
      PaperProps={{
        sx: {
          padding: "2em",
          borderRadius: "2rem",

          maxWidth: "900px",
          width: isMdScreen ? "80%" : "90%",
          background:
            theme.palette.mode === "light"
              ? "radial-gradient(157.11% 128.46% at 12.62% 0%, rgba(247, 250, 254, 0.80) 0.01%, #F3F3F3 100%)"
              : "radial-gradient(157.11% 128.46% at 12.62% 0%, rgba(40, 44, 52, 0.80) 0.01%, #2D2D2D 100%)",
          marginRight: "5%",
          gap: "30px",
        },
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h1" component="h4">
          گزارش اختلال
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "start" }}>
          <Button
            color="text"
            endIcon={<CloseIcon sx={{ marginX: "0.5rem" }} />}
            onClick={handleCloseDialog}
          >
            بستن
          </Button>{" "}
        </Box>
      </Box>

      <Box
        gap={5}
        display="flex"
        flexDirection="column"
        textAlign="center"
        alignItems="center"
      >
        <img width={150} src={done} alt="done" />
        <Typography variant="h2" component="h3">
          گزارش شما با موفقیت ثبت شد.
        </Typography>
        <Typography variant="h4">با تشکر از همکاری شما.</Typography>
        <ContainedButton
          onClick={handleCloseDialog}
          variant="contained"
          bgColor="#FF8A35"
          txtHover="#FF8A35"
          sx={{ fontSize: "1rem", width: "50%" }}
        >
          ثبت گزارش جدید{" "}
        </ContainedButton>{" "}
      </Box>
    </Dialog>
  );
};

export default DoneReport;
