/**
 * @module HistoryTable
 * @description This module provides a table component to display historical data.
 * @requires react
 * @requires @mui/material
 * @requires @emotion/styled
 * @requires @emotion/react
 */

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import styled from "@emotion/styled";
import { Box } from "@mui/material";
import { useTheme } from "@emotion/react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

/**
 * Creates a structured data object for table rows.
 *
 * @function createData
 * @param {number} id - Unique identifier for the row.
 * @param {string} TestHistory - Time when the test took place.
 * @param {string} testhour - Date when the test occurred.
 * @param {string} operator - Name of the operator.
 * @param {string} server - Server location/name.
 * @param {string} TestType - Type of test conducted.
 * @param {number} download - Download speed recorded.
 * @param {number} upload - Upload speed recorded.
 * @param {number} ping - Ping value recorded.
 * @param {string} [Comparison] - Data for comparison. Optional.
 * @param {string} [share] - Data for sharing. Optional.
 * @returns {Object} Structured data object for the table row.
 */
const createData = (
  id,
  TestHistory,
  testhour,
  operator,
  server,
  TestType,
  download,
  upload,
  ping,
  Comparison,
  share
) => ({
  id,
  TestHistory,
  testhour,
  operator,
  server,
  TestType,
  download,
  upload,
  ping,
  Comparison,
  share,
});

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
  "اپراتور",
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

const HistoryTable = () => {
  const localStorageData = JSON.parse(
    localStorage.getItem("testResults") || "[]"
  );
  const reversedData = [...localStorageData].reverse();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const headerBackground = isDark ? "#434544" : "#C6C6C6";
  const rowBackground = isDark ? "#2D2D2D" : "#DDD";
  const [selectedValues, setSelectedValues] = React.useState([]);
  const [openSnackbar, setOpenSnackbar] = React.useState(false);
  const handleOpenSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleSnackbarToggle = () => setOpenSnackbar((prev) => !prev);

  const handleRadioClick = (event, rowId) => {
    const value = String(rowId);
    setSelectedValues((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          //   height: "62vh",
          height: "430px",
          mt: "0.5rem",
          border: "none",
          boxShadow: "none",
          background: "transparent",
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {reversedData.map((row, index) => (
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
                <TableCell align="center">{row.operator}</TableCell>
                <TableCell align="center">{row.server}</TableCell>
                <TableCell align="center">{row.testType}</TableCell>
                <TableCell align="center">{row.download}</TableCell>
                <TableCell align="center">{row.upload}</TableCell>
                <TableCell align="center">{row.ping}</TableCell>
                <TableCell align="center">
                  <FormControl sx={{ width: "73px" }}>
                    <RadioGroup name="radio-buttons-group">
                      <FormControlLabel
                        value={String(row.id)}
                        control={
                          <Radio
                            onClick={(e) => handleRadioClick(e, row.id)}
                            checked={selectedValues.includes(String(row.id))}
                            disabled={
                              selectedValues.length >= 5 &&
                              !selectedValues.includes(String(row.id))
                            }
                          />
                        }
                      />
                    </RadioGroup>
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
      </TableContainer>
      <Snackbar
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
      </Snackbar>
    </>
  );
};

export default HistoryTable;
