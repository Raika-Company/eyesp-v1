import { Box, Card, Pagination, Stack, Typography, useMediaQuery } from "@mui/material";
import ProvinceNavbar from "./ProvinceNavbar";
import ArrowBack from "../../app/common/ArrowBack";
import ProvinceTable from "../dashboard/province/ProvinceTable";
import { useState } from "react";

const ROWS_PER_PAGE = 8;
import provinces from "../../app/data/provinceISPsDetails.json";

const ProvinceISP = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState(null);

  const rows = selectedProvince
    ? provinces.find((p) => p.name === selectedProvince).rows
    : []; // default to an empty array if no province is selected

  return (
    <Box display="flex">
      <ProvinceNavbar onProvinceSelected={setSelectedProvince} />
      <Box width="100%" padding="max(1rem, 2.5vw)">
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom>میانگین عملکرد ISPهای <Typography component="span" variant="h1" color="primary.main">استان {selectedProvince}</Typography></Typography>
          <ArrowBack />
        </Box>
        <Card
          sx={{
            width: "100%",
            padding: "clamp(1rem, 2.5vw, 3rem)",
            marginBottom: isSmScreen ? "6rem" : "1.5rem",
          }}
        >
          <ProvinceTable
            rows={rows}
            page={page}
            ROWS_PER_PAGE={ROWS_PER_PAGE}
          />
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
              variant="overline"
              sx={{
                color: "textColor.dark",
                display: "flex",
                alignItems: "center",
              }}
            >
              پرش به تاریخ:
              <Typography
                variant="overline"
                component="span"
                sx={{
                  textAlign: "center",
                  userSelect: "none",
                  color: "textColor.main",
                  backgroundColor: "textColor.subTitle",
                  marginRight: isSmScreen ? "2px" : "10px",
                  padding: isSmScreen ? "6px 6px" : "6px 10px",
                  borderRadius: "10px",
                }}
              >
                1403/06/08
              </Typography>
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
      </Box>
    </Box>
  );
};

export default ProvinceISP;
