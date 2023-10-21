/**
 * @module HistoryTable
 * @description This module provides a table component to display historical data.
 * @requires react
 * @requires @mui/material
 * @requires @emotion/styled
 * @requires @emotion/react
 */
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { Checkbox } from "@mui/material";

/**
 * Styled component representing each row in the table.
 * @constant
 */
const RowBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "1rem",
  paddingX: "0.94rem",
  paddingY: "0.5rem",
  marginTop: "0.7rem",
  "& > *": {
    flex: 1,
    fontFamily: "PeydaLight",
  },
  "& > *:nth-of-type(1)": {
    flex: 0.2,
  },
}));

/**
 * Array containing headers for the table columns.
 */
const cellHeaders = [
  "",
  "تاریخ تست",
  "سرور",
  "نوع تست",
  "دانلود",
  "آپلود",
  "پینگ",
  "مقایسه",
  "",
];

/**
 * `HistoryTable` component that displays a table showcasing historical test speeds.
 *
 * This component provides an overview of various tests conducted in the past,
 * with details like operator name, server location, test type, and the
 * recorded download, upload, and ping speeds. Each row of the table represents a single
 * test instance.
 *
 * @function
 * @returns {JSX.Element} Returns the HistoryTable component.
 */

const HistoryTable = (props) => {
  const setSelectedIds = props.setSelectedIds;
  const onRadioClick = props.onRadioClick;
  const initialSelectedIds = props.initialSelectedIds;
  const localStorageData = JSON.parse(
    localStorage.getItem("testResults") || "[]"
  ).reverse();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const headerBackground = isDark ? "#434544" : "#C6C6C6";
  const rowBackground = isDark ? "#2D2D2D" : "#DDD";
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [selectedRadios, setSelectedRadios] = useState(
    initialSelectedIds || []
  );
  const [errorSnackbar, setErrorSnackbar] = useState(false);

  useEffect(() => {
    if (initialSelectedIds) {
      setSelectedIds(initialSelectedIds);
      setSelectedRadios(initialSelectedIds);
    } else {
      // Select the first four items by default
      const firstFourIds = localStorageData
        .slice(0, 4)
        .map((item, idx) => String(idx));
      setSelectedRadios(firstFourIds);
      setSelectedIds(firstFourIds);
    }
  }, [initialSelectedIds, localStorageData, setSelectedIds]);

  const handleSnackbarToggle = () => setOpenSnackbar((prev) => !prev);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrorSnackbar(false);
  };

  const handleCheckboxChange = (value, isSixthItem = false) => {
    if (selectedRadios.includes(value)) {
      setSelectedRadios((prev) => prev.filter((radio) => radio !== value));
      setSelectedIds((pre) => pre.filter((radio) => radio !== value));
    } else {
      if (selectedRadios.length >= 5 && !isSixthItem) {
        setErrorSnackbar(true); // Show the snackbar error
        return; // Don't allow more selections
      }
      setSelectedRadios((prev) => [...prev, value]);
      setSelectedIds((pre) => [...pre, value]);
    }
  };

  return (
    <>
      <Box
        component={Paper}
        sx={{
          //   height: "62vh",
          maxHeight: "430px",
          overflowY: "auto",
          mt: "0.5rem",
          border: "none",
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <Table aria-label="simple table">
          <TableHead
            sx={{
              ".css-2s229y-MuiTableCell-root,.css-lt8975-MuiTableCell-root, .css-167oed0-MuiTableCell-root,.css-o4v5rt-MuiTableCell-root,.css-gsxlzn-MuiTableCell-root,.css-10kadzj-MuiTableCell-root":
                { border: "none" },
            }}
          >
            <RowBox sx={{ background: headerBackground }}>
              {cellHeaders.map((header, idx) => (
                <TableCell
                  align={
                    idx === 0 || idx === cellHeaders.length - 1
                      ? "center"
                      : "center"
                  }
                  component="th"
                  scope="row"
                  key={idx}
                >
                  {header}
                </TableCell>
              ))}
            </RowBox>
          </TableHead>
          <TableBody>
            {localStorageData.map((row, index) => (
              <RowBox
                key={index}
                sx={{
                  "td, th": { border: 0 },
                  background: rowBackground,
                  height: "70px",
                }}
              >
                <TableCell align="center">{row.id}</TableCell>
                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                    }}
                  >
                    <span>{row.date}</span>
                    <span>{row.time}</span>
                  </Box>
                </TableCell>
                {/* <TableCell align="center">{row.operator}</TableCell> */}
                <TableCell align="center">{row.server}</TableCell>
                <TableCell align="center">{row.testType}</TableCell>
                <TableCell align="center">{row.download}</TableCell>
                <TableCell align="center">{row.upload}</TableCell>
                <TableCell align="center">{row.ping}</TableCell>
                <TableCell align="center">
                  <FormControl sx={{ width: "73px" }}>
                    <FormControlLabel
                      value={String(index)}
                      control={
                        <Checkbox
                          checked={selectedRadios.includes(String(index))}
                          onChange={
                            () =>
                              handleCheckboxChange(String(index), index === 4) // Add this condition
                          }
                          onClick={() => {
                            if (
                              selectedRadios.length >= 5 &&
                              !selectedRadios.includes(String(index))
                            ) {
                              setErrorSnackbar(true);
                            }
                          }}
                        />
                      }
                    />
                  </FormControl>
                </TableCell>
                <TableCell align="center">
                  <ShareOutlinedIcon
                    sx={{ cursor: "pointer" }}
                    onClick={handleSnackbarToggle}
                  />
                </TableCell>
              </RowBox>
            ))}
          </TableBody>
        </Table>
      </Box>
      {/* <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleSnackbarToggle}
      >
        <Alert
          sx={{ background: "#70FF00", color: "#000" }}
          onClose={handleSnackbarToggle}
        >
          لینک شما کپی شد !
        </Alert>
      </Snackbar> */}
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Add this prop
      >
        <Alert onClose={handleClose} severity="error">
          شما نمیتوانید بیشتر از ۵ تا مورد انتخاب بکنید
        </Alert>
      </Snackbar>
    </>
  );
};

export default HistoryTable;
