import { Alert, Snackbar } from "@mui/material";

const CustomSnackbar = ({ open, message, severity, handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          backgroundColor: severity === "info" ? "#48C237" : undefined,
          width: "100%",
          fontSize: "1.5rem",
          padding: "1rem 2rem",
          ".MuiAlert-icon": {
            fontSize: "2.5rem",
          },
          ".MuiAlert-action": {
            "& .MuiIconButton-root": {
              fontSize: "2rem",
            },
          },
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
