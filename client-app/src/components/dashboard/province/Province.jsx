import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Container,
  useMediaQuery,
  Box,
  Typography,
  Button,
  Card,
  IconButton,
} from "@mui/material";

import styles from "../map/IranMap.module.css";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import rows from "../../../app/data/provinceTableRows.json";
import "./Province.css";
import ArrowBack from "../../../app/common/ArrowBack";
import ProvinceTable from "./ProvinceTable";

const ROWS_PER_PAGE = 5;

const ProvinceMap = ({ isSmScreen, pathD, color, X, Y, WIDTH, HEIGHT }) => {
  let viewBoxValue = "20 0 970 960";
  if (X != undefined) {
    viewBoxValue = `${X} ${Y} ${WIDTH} ${HEIGHT}`;
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        float: "left",
        width: isSmScreen ? "100%" : "45%",
        marginTop: isSmScreen ? "0" : "12vh",
        padding: isSmScreen ? "1em" : "0",
        marginInline: "2.5%",
      }}
    >
      <svg
        className={styles.provinceSvg}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBoxValue}
      >
        <g className={styles.province}>
          <path d={pathD} fill={color} />
        </g>
      </svg>
    </Box>
  );
};

const DisruptionList = ({ isSmScreen, color, provinceName }) => {
  let items = []
  if (color == "#EE0B0B") {
    items = [
      `اختلال در ${provinceName}`,
      "کندی سرعت",
      "افزایش ping",
      "افزایش jitter",
      "کاهش پهنای باند",
      "اختلال در شبکه",
    ];
  } else if (color == "#14A784") {
    items = [
      `شرایط پایدار در ${provinceName}`,
      "پینگ حالت نرمال است",
      "سرعت حالت نرمال است",
      "میانگین استاندارد رعایت شده است.",
    ];
  } else {
    items = [
      `اختلال جزئی در ${provinceName}`,
      "کندی سرعت",
      "افزایش jitter",
      "کاهش پهنای باند",
    ];
  }
  
  return (
    <Box
      sx={{
        marginTop: isSmScreen ? "" : "11em",
        marginInline: isSmScreen ? "10em" : "",
      }}
    >
      {items.map((item) => (
        <Typography
          sx={{
            fontSize: isSmScreen ? "1rem" : "1.5rem",
            flexWrap: "600",
            color: { color },
          }}
          key={item}
        >
          ● {item}
        </Typography>
      ))}
    </Box>
  );
};

const FastAccessButton = ({ label }) => (
  <Button
    variant="outlined"
    sx={{ color: "#126AED", borderColor: "#126AED", fontWeight: 700 }}
  >
    {label}
  </Button>
);

const Province = () => {
  const location = useLocation();
  const { provinceName, pathD, color, x, y, width, height } = location.state;
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);

  const fastAccessButtons = ["پینگ", "اختلال", "سرعت", "پکت لاس"];

  return (
    <Container maxWidth="xl">
      <Box display="flex" justifyContent="space-between">
        <Typography fontSize="2rem" color="#9B9B9B" gutterBottom sx={{}}>
          میانگین عملکرد ISPهای{" "}
          <span style={{ fontSize: "2.6rem", color: "#126AED" }}>
            استان {provinceName}
          </span>
        </Typography>
        <ArrowBack />
      </Box>
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
        <ProvinceMap
          isSmScreen={isSmScreen}
          pathD={pathD}
          color={color}
          X={x}
          Y={y}
          WIDTH={width}
          HEIGHT={height}
        />
        <div
          style={{
            width: isSmScreen ? "100%" : "45%",
            float: "left",
            fontSize: "10px",
          }}
        >
          <DisruptionList
            isSmScreen={isSmScreen}
            provinceName={provinceName}
            color={color}
          />
        </div>
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
          {fastAccessButtons.map((label) => (
            <FastAccessButton label={label} key={label} />
          ))}
        </Box>
      </Card>
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
      <Card
        sx={{
          backgroundColor: "#E8E8E8",
          width: "100%",
          padding: "3%",
          marginBottom: isSmScreen ? "6rem" : "1.5rem",
        }}
      >
        <ProvinceTable rows={rows} page={page} ROWS_PER_PAGE={ROWS_PER_PAGE} />
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
            <Pagination
              count={Math.ceil(rows.length / ROWS_PER_PAGE)}
              defaultPage={1}
              page={page}
              onChange={(event, newPage) => setPage(newPage)}
              color="primary"
            />
          </Stack>
        </Box>
      </Card>
    </Container>
  );
};

export default Province;
