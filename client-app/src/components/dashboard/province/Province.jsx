import { useLocation } from "react-router-dom";
import {
  Container,
  useMediaQuery,
  Box,
  Typography,
  Button,
  Card,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  tableCellClasses,
  Divider,
} from "@mui/material";

import styles from "../map/IranMap.module.css";
import styled from "@emotion/styled";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E8E8E8",
    color: "#999999",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.65rem",
    fontWeight: 600,
    color: "#5E5E5E",
    fontStyle: "normal",
  },
}));

const StyledTableRow = styled(TableRow)(({}) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#E8E8E8",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#999999",
    borderRadius: "1rem",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(id, date, ISPName, TypeOfDisorder, Reason) {
  return { id, date, ISPName, TypeOfDisorder, Reason };
}

const rows = [
  createData(1, "Frozen yoghurt", 159, 6.0, 24),
  createData(2, "Ice cream sandwich", 237, 9.0, 37),
  createData(3, "Eclair", 262, 16.0, 24),
  createData(4, "Cupcake", 305, 3.7, 67),
  createData(5, "Gingerbread", 356, 16.0, 49),
];

const Province = () => {
  const location = useLocation();
  const { provinceName, pathD, color } = location.state;
  const isXlScreen = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="xl">
      <Typography fontSize="2rem" color="#9B9B9B" gutterBottom sx={{}}>
        میانگین عملکرد ISPهای{" "}
        <span style={{ fontSize: "2.6rem", color: "#126AED" }}>
          استان {provinceName}
        </span>
      </Typography>
      <div
        style={{
          width: "100%",
          height: isSmScreen ? "" : "53vh",
          background: "#E8E8E8",
          marginBottom: "1.3rem",
          borderRadius: "1.875rem",
          overflow: "visible",
        }}
      >
        <Box
          sx={{
            float: "left",
            width: isSmScreen ? "100%" : "45%",
            marginTop: isSmScreen ? "0" : "12vh",
            padding: isSmScreen ? "1em" : "0",
            marginInline: "2.5%",
          }}
        >
          <svg
            className={styles.svg}
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            viewBox="20 0 970 960"
            xmlSpace="preserve"
          >
            <g className={styles.province}>
              <path d={pathD} fill={color} />
            </g>
          </svg>
        </Box>
        <div
          style={{
            width: isSmScreen ? "100%" : "45%",
            float: "left",
            fontSize: "10px",
          }}
        >
          <Typography
            sx={{
              color: "#EE0B0B",
              fontSize: isSmScreen ? "1.8rem" : "2.5rem",
              fontWeight: "700",
            }}
          >
            <span style={{ fontSize: "4rem" }}>4</span> اختلال یافت شده:
          </Typography>
          <Typography
            sx={{
              fontSize: isSmScreen ? "1rem" : "1.5rem",
              flexWrap: "600",
              color: "#9B9B9B",
            }}
          >
            ● اختلال در مازندران
          </Typography>
          <Typography
            sx={{
              fontSize: isSmScreen ? "1rem" : "1.5rem",
              flexWrap: "600",
              color: "#9B9B9B",
            }}
          >
            ● کندی سرعت
          </Typography>
          <Typography
            sx={{
              fontSize: isSmScreen ? "1rem" : "1.5rem",
              flexWrap: "600",
              color: "#9B9B9B",
            }}
          >
            ● اختلال در خراسان رضوی
          </Typography>
          <Typography
            sx={{
              fontSize: isSmScreen ? "1rem" : "1.5rem",
              flexWrap: "600",
              color: "#9B9B9B",
            }}
          >
            ● افزایش jitter
          </Typography>
          <Typography
            sx={{
              fontSize: isSmScreen ? "1rem" : "1.5rem",
              flexWrap: "600",
              color: "#9B9B9B",
            }}
          >
            ● اختلال در فارس
          </Typography>
          <Typography
            sx={{
              fontSize: isSmScreen ? "1rem" : "1.5rem",
              flexWrap: "600",
              color: "#9B9B9B",
            }}
          >
            ● کند شدن سرعت
          </Typography>
        </div>

        {/* Clear the float */}
        <div style={{ clear: "both" }}></div>
      </div>

      <Card
        sx={{
          backgroundColor: "E8E8E8",
          width: isSmScreen ? "100%" : "46%",
          height: isSmScreen ? "16dvh" : "8.5dvh",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        <Typography
          sx={{
            fontSize: isSmScreen ? "1.4rem" : "1.9rem",
          }}
        >
          دسترسی سریع:
        </Typography>
        <Box
          sx={{
            backgroundColor: "E8E8E8",
            width: isSmScreen ? "70%" : "65%",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              color: "#126AED",
              borderColor: "#126AED",
              fontWeight: 700,
              borderRadius: "12px",
              padding: "7px 27px",
              marginTop:"5px"
            }}
          >
            پینگ
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#126AED",
              borderColor: "#126AED",
              fontWeight: 700,
              borderRadius: "12px",
              padding: "7px 27px",
            }}
          >
            اختلال
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#126AED",
              borderColor: "#126AED",
              fontWeight: 700,
              borderRadius: "12px",
              padding: "7px 27px",
            }}
          >
            سرعت
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: "#126AED",
              borderColor: "#126AED",
              fontWeight: 700,
              borderRadius: "12px",
              padding: "7px 27px",
            }}
          >
            پکت لاس
          </Button>
        </Box>
      </Card>

      <Typography
        marginTop="3em"
        gutterBottom
        color="#9B9B9B"
        fontSize="1.789rem"
      >
        تاریخچه اطلاعات
      </Typography>
      <Card sx={{ backgroundColor: "#E8E8E8", width: "100%", padding: "5%" }}>
        <TableContainer>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell align="center">تاریخ</StyledTableCell>
                <StyledTableCell align="center">نام ISP</StyledTableCell>
                <StyledTableCell align="center">نوع اختلال</StyledTableCell>
                <StyledTableCell align="center">دلیل اختلال</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <Divider width="200%" />
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.ISPName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.TypeOfDisorder}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.Reason}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
};

export default Province;
