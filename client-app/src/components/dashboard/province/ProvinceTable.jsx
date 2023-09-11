import React from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  tableCellClasses,
  styled,
} from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.mode === 'light' ? "#E8E8E8" : "#171717",
    color: "#999999",
  },
  [`&.${tableCellClasses.body}`]: {
    fontWeight: 600,
    color: theme.palette.mode === 'light' ? "#5E5E5E" : "#A1A1A1",
    fontStyle: "normal",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.mode === 'light' ? "#E8E8E8" : "#171717",
  },
  "&:nth-of-type(even)": {
    backgroundColor: theme.palette.mode === 'light' ? "#DCDCDC" : "#232323",
    borderRadius: "1rem",
  },
}));


const ProvinceTable = ({ rows, page, ROWS_PER_PAGE }) => {
  return (
    <TableContainer
      sx={{ backgroundColor: "transparent", boxShadow: 0 }}
      component={Paper}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">تاریخ</StyledTableCell>
            <StyledTableCell align="center">نام ISP</StyledTableCell>
            <StyledTableCell align="center">نوع اختلال</StyledTableCell>
            <StyledTableCell align="center">دلیل اختلال</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE)
            .map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                <StyledTableCell align="center">{row.ISPName}</StyledTableCell>
                <StyledTableCell align="center">{row.TypeOfDisorder}</StyledTableCell>
                <StyledTableCell align="center" sx={{ width: "290px" }}>
                  {row.Reason}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProvinceTable;