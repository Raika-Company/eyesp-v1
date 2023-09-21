import React from "react";
import {
  styled,
  keyframes,
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
  useTheme,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#999",
    fontSize: "1rem",
    borderColor: "#ececec",
    "&:nth-of-type(3)": {
      color: "#126AED",
    },
  },

  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
    fontWeight: 600,
    color: theme.palette.mode === "light" ? "#555" : "#AAAAAA",
    "&:nth-of-type(2)": {
      color: "#126AED",
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme, delay }) => ({
  "&:nth-of-type(1)": {
    // first row
    background: "linear-gradient(180deg, #BDFEAE 0%, #F2EFA5 0.01%, #F9F7EA 100%)",
  },
  "&:nth-of-type(2)": {
    // second row
    background: "linear-gradient(180deg, #DADADA 0%, #E1E1E1 0.01%, #F6F6F6 100%)",
  },
  "&:nth-of-type(3)": {
    // third row
    background: "linear-gradient(180deg, #D49A63 0%, #F1CBB0 0.01%, #F8F8F8 100%)",
  },
  "&:nth-of-type(n+4)": {
    // fourth row and onward
    background: "linear-gradient(180deg, #D0E3ED 0%, #D0E2EC 0.01%, #EEF4F9 100%)",
  },
  "td, th": {
    border: 0,
  },
  opacity: 0,
  animation: `${fadeInAnimation} 0.4s forwards ${delay}s`,
}));

const ISPTable = ({ ISPdata }) => {
  return (
    <TableContainer
      sx={{
        backgroundColor: "transparent",
        boxShadow: 0,
        marginBottom: "1rem",
        overflow: "hidden",
      }}
      component={Paper}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">رتبه</StyledTableCell>
            <StyledTableCell align="center" sx={{ paddingRight: "4rem" }}>
              نام ISP
            </StyledTableCell>
            <StyledTableCell align="center">درصد اختلال</StyledTableCell>
            <StyledTableCell align="center">میانگین پینگ</StyledTableCell>
            <StyledTableCell align="center">میانگین سرعت</StyledTableCell>
            <StyledTableCell align="center">جزئیات</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ISPdata.map((Items, index) => (
            <StyledTableRow key={Items.rank} delay={index * 0.2}>
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
                align="center"
                sx={{
                  color: "primary",
                }}
              >
                {Items.disturbance}
              </StyledTableCell>
              <StyledTableCell align="center">{Items.pings}</StyledTableCell>
              <StyledTableCell align="center">{Items.speed}</StyledTableCell>
              <StyledTableCell align="center">
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
