import React from "react";
import { Container, Typography, Box, useMediaQuery } from "@mui/material";
import iranMap from "./iran.png";
import Grid from "@mui/material/Grid";
import InfoBox from "./InfoBox";
import InfoWithPieChart from "./InfoWithPieChart";
import InfoLineChart from "./InfoLineChart";
import Button from "@mui/material/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import WifiIcon from "@mui/icons-material/Wifi";
import AirplayIcon from "@mui/icons-material/Airplay";
import SpeedIcon from "@mui/icons-material/Speed";

const Dashboard = () => {
  const isXlScreen = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: "#9B9B9B",
      borderColor: "#ececec",
      "&:nth-child(3)": {
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
    // hide border
    "td, th": {
      border: 0,
    },
  }));

  function createData(rank, ISPname, disturbance, pings, speed, desc) {
    return { rank, ISPname, disturbance, pings, speed, desc };
  }

  const ISPdata = [
    createData("#1", "همراه اول", "15%", "49ms", "72Mbps"),
    createData("#2", "ایرانسل", "15%", "49ms", "72Mbps"),
    createData("#3", "همراه اول", "15%", "49ms", "72Mbps"),
    createData("#4", "همراه اول", "15%", "49ms", "72Mbps"),
  ];

  const GpButtons = [
    {
      name: "پینگ",
      icon: WifiIcon,
    },
    {
      name: "اختلال",
      icon: WifiOffIcon,
    },
    {
      name: "سرعت",
      icon: SpeedIcon,
    },
    {
      name: "پکت لاس",
      icon: AirplayIcon,
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ direction: "rtl" }}>
      <div
        style={{
          width: "95%",
          height: isSmScreen ? "" : "53vh",
          background: "#E8E8E8",
          marginInline: "auto",
          marginTop: isSmScreen ? "1rem" : "3rem",
          marginBottom: "1.3rem",
          borderRadius: "1.875rem",
          overflow: "visible",
        }}
      >
        <img
          src={iranMap}
          alt="iran map"
          style={{
            float: "left",
            maxWidth: isSmScreen ? "100%" : "45%",
            marginTop: isSmScreen ? "0" : "18vh",
            padding: isSmScreen ? "1em" : "0",
            marginInline: "2.5%",
          }}
        />
        <div
          style={{
            width: isSmScreen ? "100%" : "50%",
            // width: "50%",
            float: "left",
            padding: "2em",
            // marginTop: "2em",
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

      {/* --- strat-table-ISP --- */}
      <Box
        sx={{
          width: "95%",
          marginInline: "auto",
          marginTop: isSmScreen ? "0" : isXlScreen ? "0" : "18rem",
          borderRadius: "1.875rem",
          background: "#E8E8E8",
          padding: "0 2.5rem",
          paddingTop: "2rem",
        }}
      >
        {/* --- strat-table-Head-ISP --- */}

        <Box
          sx={{
            display: "flex",
            justifyContent: isSmScreen ? "center" : "space-between",
            flexWrap: "wrap",
          }}
        >
          <Typography
            gutterBottom
            sx={{
              color: "#126AED",
              fontWeight: "700",
              fontSize: isSmScreen ? "1.5rem" : "2rem",
            }}
          >
            رتبه بندی ISPها{" "}
            {/* <span style={{ color: "#126AED", fontSize: "2.5rem" }}>
            استان فارس
          </span> */}
          </Typography>
          <Typography
            gutterBottom
            sx={{
              color: "#9B9B9B",
              fontWeight: "700",
              fontSize: isSmScreen ? "0.9rem" : "1.28rem",
            }}
          >
            براساس:{" "}
            <Button
              variant="contained"
              endIcon={<KeyboardArrowDownIcon />}
              sx={{
                marginRight: "0.5rem",
                borderRadius: "0.5rem",
                padding: "0.6rem 1rem",
              }}
            >
              <span style={{ marginLeft: "0.4rem" }}>بیشترین اختلال</span>{" "}
            </Button>
          </Typography>
        </Box>

        {/* --- End-table-Head-ISP --- */}

        {/* --- Start-Table-Info --- */}
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
        {/* --- End-Table-Info --- */}

        {/* <Box
          width="100%"
          marginY="1rem"
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 2fr",
            gap: "16px",
            alignItems: "stretch",
          }}
        >
          <InfoBox
            header="لورم ایپسوم"
            number="32"
            buttonText="لورم ایپسوم متن"
            color="#126AED"
          />
          <InfoBox
            header="تعداد ISP های تحت پوشش"
            number="42"
            buttonText="افزودن ISP جدید"
            color="#14A784"
          />
          <InfoWithPieChart color="#126AED" mainText="میانگین عملکرد ISP ها" />
        </Box> */}
        {/* <Box display="flex">
          <Grid item xs={12} md={6}>
            <InfoLineChart color="#126AED" />
          </Grid>
          <Grid container item xs={12} md={6}>
            <Grid item xs={12}>
              <InfoWithPieChart
                color="#14A784"
                mainText="میانگین پینگ ISP ها"
              />
            </Grid>
            <Grid item xs={12}>
              <InfoWithPieChart
                color="#FF630B"
                mainText="میانگین سرعت ISP ها"
              />
            </Grid>
          </Grid>
        </Box> */}
      </Box>
      {/* --- End-table-ISP --- */}

      {/* --- start-buttonGroups --- */}
      <Box
        sx={{
          width: "95%",
          marginInline: "auto",
          marginTop: "1.3rem",
          marginBottom: "1.3rem",
          borderRadius: "1.875rem",
          background: "#E8E8E8",
          padding: "1rem 2.5rem",
        }}
      >
        <Typography textAlign="center" color="#9B9B9B" fontWeight="600">
          جزئیات فنی
        </Typography>

        <Box
          sx={{
            height: isSmScreen ? "" : "28dvh",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {GpButtons.map((val) => (
            <Button
              variant="contained"
              startIcon={<val.icon style={{ fontSize: "2rem" }} />}
              sx={{
                width: isSmScreen ? "100%" : "49%",
                borderRadius: "1rem",
                padding: "1.5rem",
                fontSize: "1.3rem",
                marginTop: "1rem",
              }}
            >
              <span style={{ marginLeft: "0.4rem", marginRight: "1rem" }}>
                {val.name}
              </span>
            </Button>
          ))}
        </Box>
      </Box>
      {/* --- finish-buttonGroups --- */}
    </Container>
  );
};

export default Dashboard;
