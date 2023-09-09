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
  IconButton,
  SvgIcon,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

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
                <IconButton aria-label="more info">
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="41"
                      height="41"
                      viewBox="0 0 41 41"
                      fill="none"
                    >
                      <rect
                        x="1"
                        y="1"
                        width="39"
                        height="39"
                        rx="14"
                        stroke="#126AED"
                        strokeWidth="2"
                      />
                      <path
                        d="M23.8883 25.6211L19.1642 20.8868L23.8883 16.1525L22.4339 14.6981L16.2452 20.8868L22.4339 27.0755L23.8883 25.6211Z"
                        fill="#126AED"
                      />
                    </svg>
                  </SvgIcon>
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ISPTable;
