import React from "react";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

const SendReport = ({ handleCloseDialog, openDialog }) => {
  return (
    <Dialog onClose={handleCloseDialog} open={openDialog}>
      <DialogTitle>گزارش اختلال</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          sx={{ marginY: "0.25rem" }}
          id="filled-basic"
          label="نام ISP"
          variant="filled"
        />
        <TextField
          fullWidth
          sx={{ marginY: "0.25rem" }}
          id="filled-basic"
          label="نام استان"
          variant="filled"
        />
        <TextField
          fullWidth
          sx={{ marginY: "0.25rem" }}
          id="filled-basic"
          label="نام شهر"
          variant="filled"
        />
        <TextField
          fullWidth
          sx={{ marginY: "0.25rem" }}
          id="filled-basic"
          label="دلیل اختلال"
          variant="filled"
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="text.main"
          color="success"
          autoFocus
          onClick={handleCloseDialog}
        >
          ارسال گزارش
        </Button>
        <Button
          variant="text.main"
          color="error"
          autoFocus
          onClick={handleCloseDialog}
        >
          لغو
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendReport;
