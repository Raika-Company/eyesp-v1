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
  IconButton,
} from "@mui/material";

import styles from "../map/IranMap.module.css";
import styled from "@emotion/styled";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import "./Province.css";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#E8E8E8",
    color: "#999999",
  },
  [`&.${tableCellClasses.body}`]: {
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
    backgroundColor: "#DCDCDC",
    borderRadius: "1rem",
  },
}));

function createData(id, date, ISPName, TypeOfDisorder, Reason) {
  return { id, date, ISPName, TypeOfDisorder, Reason };
}

const rows = [
  createData(
    1,
    "1403/06/08",
    "همراه اول",
    "پکت لاس",
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
  ),
  createData(
    2,
    "1403/06/08",
    "همراه اول",
    "پکت لاس",
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
  ),
  createData(
    3,
    "1403/06/08",
    "همراه اول",
    "پکت لاس",
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
  ),
  createData(
    4,
    "1403/06/08",
    "همراه اول",
    "پکت لاس",
    "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ"
  ),
];

const Province = () => {
  const location = useLocation();
  const { provinceName, pathD, color } = location.state;
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
      <Card sx={{ backgroundColor: "#E8E8E8" }}>
        <Box
          display="flex"
          justifyContent="flex-start"
          gap={2}
          padding="1em"
          sx={{ backgroundColor: "#E8E8E8" }}
        >
          <Typography fontSize="1.9rem">دسترسی سریع</Typography>
          <Button
            variant="outlined"
            sx={{ color: "#126AED", borderColor: "#126AED", fontWeight: 700 }}
          >
            پینگ
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "#126AED", borderColor: "#126AED", fontWeight: 700 }}
          >
            اختلال
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "#126AED", borderColor: "#126AED", fontWeight: 700 }}
          >
            سرعت
          </Button>
          <Button
            variant="outlined"
            sx={{ color: "#126AED", borderColor: "#126AED", fontWeight: 700 }}
          >
            پینگ
          </Button>
        </Box>
      </Card>
      {/* --- start --- Information history --- Table ---  */}
      {/* --- start --- Head --- Information history ---  */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "1.5rem",
        }}
      >
        <Typography gutterBottom color="#9B9B9B" fontSize="1.789rem">
          تاریخچه اختلالات
        </Typography>
        <IconButton aria-label="filter">
          <FilterAltIcon
            sx={{
              color: "#126AED",
              border: "1px solid #126AED",
              padding: "3px",
              borderRadius: "5px",
            }}
          />
        </IconButton>
      </Box>
      {/* --- End --- Head --- Information history ---  */}
      {/* --- start --- Table --- Information history ---  */}
      <Card
        sx={{
          backgroundColor: "#E8E8E8",
          width: "100%",
          padding: "3%",
          marginBottom: isSmScreen ? "6rem" : "1.5rem",
        }}
      >
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
              {rows.map((row) => (
                <StyledTableRow key={row.id}>
                  <StyledTableCell align="center">{row.date}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.ISPName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.TypeOfDisorder}
                  </StyledTableCell>
                  <StyledTableCell align="center" sx={{ width: "290px" }}>
                    {row.Reason}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "#5E5E5E",
              display: "flex",
              alignItems: "center",
              fontSize: isSmScreen ? "11px" : "",
            }}
          >
            پرش به تاریخ:
            <span
              style={{
                textAlign: "center",
                userSelect: "none",
                color: "#000",
                marginRight: isSmScreen ? "2px" : "10px",
                opacity: "0.15",
                padding: isSmScreen ? "6px 6px" : "6px 10px",
                backgroundColor: "#999",
                borderRadius: "10px",
              }}
            >
              1403/06/08
            </span>
          </Typography>
          <Stack spacing={2} sx={{ direction: "ltr" }}>
            <Pagination count={3} defaultPage={2} color="primary" />
          </Stack>
        </Box>
      </Card>
      {/* --- End --- Table --- Information history ---  */}
      {/* --- End --- Information history --- Table ---  */}{" "}
    </Container>
  );
};

export default Province;
