import { Container, useMediaQuery, Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import styles from "../map/IranMap.module.css";

const Province = () => {
  const location = useLocation();
  const { provinceName, pathD, color } = location.state;
  const isXlScreen = useMediaQuery((theme) => theme.breakpoints.down("xl"));
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Container maxWidth="xl">
      <Typography fontSize="2rem" color="#9B9B9B" gutterBottom sx={{}}>میانگین عملکرد ISPهای <span style={{fontSize: "2.6rem", color: "#126AED"}}>استان {provinceName}</span></Typography>
      <div
        style={{
          width: "95%",
          height: isSmScreen ? "" : "53vh",
          background: "#E8E8E8",
          marginInline: "auto",
          marginTop: "5rem",
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
    </Container>
  );
};

export default Province;
