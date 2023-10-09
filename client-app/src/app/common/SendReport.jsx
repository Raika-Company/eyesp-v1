import React, { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import { ContainedButton } from "./ContainedButton";
import DoneReport from "./DoneReport";
const SendReport = ({
  handleCloseDialog,
  openDialog,
  handleDoneReportOpen,
}) => {
  const [openDoneReport, setOpenDoneReport] = useState(false);
  const theme = useTheme();
  const isMdScreen = useMediaQuery(theme.breakpoints.up("md"));
  const reports = [
    { id: 1, label: "فلان اختلال در نقطه ای از شهر", value: "report1" },
    { id: 2, label: "یک اختلال دیگه در یک نقطه دیگه", value: "report2" },
    { id: 3, label: "فلان اختلال در نقطه ای از شهر", value: "report3" },
    { id: 4, label: "فلان اختلال در نقطه ای از شهر", value: "report4" },
  ];
  const StyledTextField = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-root.MuiOutlinedInput-root": {
      borderRadius: "18px",
      backgroundColor: theme.palette.mode === "dark" ? "#272A2F" : "white",
    },
  }));
  const ScrollBox = styled(Box)(({ theme }) => ({
    height: "150px",
    overflowY: "scroll",
    overflowX: "none",
    "&::-webkit-scrollbar": {
      width: "8px",
    },
    "&::-webkit-scrollbar-track-piece": {
      backgroundColor: theme.palette.mode === "dark" ? "#272A2F" : "white",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-track": {
      borderRadius: "4px",
    },
  }));
  return (
    <>
      <Dialog
        onClose={handleCloseDialog}
        open={openDialog}
        PaperProps={{
          sx: {
            padding: { xs: "1em", sm: "2em" },
            borderRadius: "2rem",
            maxWidth: "900px",
            width: isMdScreen ? "80%" : "90%",
            background:
              theme.palette.mode === "light"
                ? "radial-gradient(157.11% 128.46% at 12.62% 0%, rgba(247, 250, 254, 0.80) 0.01%, #F3F3F3 100%)"
                : "radial-gradient(157.11% 128.46% at 12.62% 0%, rgba(40, 44, 52, 0.80) 0.01%, #2D2D2D 100%)",
            marginRight: "5%",
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
        <DialogContent
          sx={{
            display: { xs: "block", sm: "flex" },
            justifyContent: "start",
            gap: "55px",
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            sx={{ maxWidth: { xs: "100%", sm: "60%" } }}
          >
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <div>
                <Typography gutterBottom variant="h4">
                  شماره تلفن همراه
                </Typography>
                <StyledTextField variant="outlined" size="small" />
              </div>
              <div>
                <Typography gutterBottom variant="h4">
                  استان{" "}
                </Typography>
                <StyledTextField variant="outlined" size="small" />
              </div>
            </div>
            <Typography>انتخاب گزارش اختلال خطا</Typography>
            <Box sx={{ height: "150px", overflowY: "auto", overflowX: "none" }}>
              <ScrollBox>
                <FormControl fullWidth>
                  <RadioGroup
                    dir="ltr"
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    {reports.map((report) => (
                      <FormControlLabel
                        key={report.id}
                        sx={{ justifyContent: "space-between", margin: "0" }}
                        value={report.value}
                        control={<Radio />}
                        label={report.label}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </ScrollBox>
            </Box>
            <Typography variant="h4">توضیح بیشتر</Typography>
            <StyledTextField
              variant="outlined"
              size="large"
              inputProps={{
                style: {
                  height: "50px",
                },
              }}
            />
          </Box>
          <Box
            pt={{ xs: "7.25em", sm: "7em" }}
            flexGrow={1}
            maxWidth={{ xs: "100%", sm: "40%" }}
            position={"relative"}
          >
            <Typography variant="h4">توجه</Typography>
            <Typography textAlign="justify" variant="h5">
              کاربر گرامی، اطلاعات موجود در این سایت قبل از استفاده مورد صحت
              سنجی قرار می گیرند. لطفاً با وارد کردن اطلاعات دقیق، ما را در
              تسریع این فرآیند یاری نمایید.
            </Typography>
            <ContainedButton
              onClick={() => {
                handleCloseDialog();
                setTimeout(handleDoneReportOpen, 300);
              }}
              variant="contained"
              bgColor="#FF8A35"
              txtHover="#FF8A35"
              sx={{
                fontSize: "1rem",
                position: "absolute",
                bottom: { xs: "7.5em", sm: "0" },
              }}
            >
              گزارش اختلال
            </ContainedButton>
          </Box>
        </DialogContent>
      </Dialog>
      <DoneReport
        openDialog={openDoneReport}
        handleCloseDialog={() => setOpenDoneReport(false)}
      />
    </>
  );
};

export default SendReport;
