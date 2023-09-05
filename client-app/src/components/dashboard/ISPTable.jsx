import React from "react";
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: "#9B9B9B",
        borderColor: "#ececec",
        "&:nth-of-type(3)": {
          color: "#126AED",
        },
    },    

  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.action.hover,
    borderRadius: "10px",
  },
  "td, th": {
    border: 0,
  },
}));

const ISPTable = ({ ISPdata }) => {
  return (
    <TableContainer
      sx={{ backgroundColor: "transparent", boxShadow: 0 }}
      component={Paper}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <caption
          style={{
            color: "#9B9B9B",
            textAlign: "center",
            marginTop: "1rem",
          }}
        >
          -- مشاهده بیشتر --
        </caption>

        <TableHead>
          <TableRow>
            <StyledTableCell align="center">رتبه</StyledTableCell>
            <StyledTableCell align="center" sx={{ paddingRight: "4rem" }}>
              نام ISP
            </StyledTableCell>
            <StyledTableCell align="left">درصد اختلال</StyledTableCell>
            <StyledTableCell align="left">میانگین پینگ</StyledTableCell>
            <StyledTableCell align="left">میانگین سرعت</StyledTableCell>
            <StyledTableCell align="left">جزئیات</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ISPdata.map((Items) => (
            <StyledTableRow key={Items.rank}>
              <StyledTableCell align="center" component="th" scope="row">
                {Items.rank}
              </StyledTableCell>
              <StyledTableCell
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginRight: "3rem",
                }}
              >
                {Items.ISPname}
              </StyledTableCell>
              <StyledTableCell
                align="left"
                sx={{
                  color: "#126AED",
                  paddingLeft: "42px",
                }}
              >
                {Items.disturbance}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ paddingLeft: "42px" }}>
                {Items.pings}
              </StyledTableCell>
              <StyledTableCell align="left" sx={{ paddingLeft: "39px" }}>
                {Items.speed}
              </StyledTableCell>
              <StyledTableCell align="left">
                <Button
                  variant="contained"
                  startIcon={<KeyboardArrowLeftIcon />}
                  sx={{
                    borderRadius: "0.5rem",
                    paddingLeft: "25px",
                  }}
                ></Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ISPTable;