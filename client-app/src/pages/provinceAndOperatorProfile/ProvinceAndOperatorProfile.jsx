import {
  Box,
  useMediaQuery,
  Typography,
  useTheme,
  MenuItem,
} from "@mui/material";

import Charts from "../../app/common/Charts";
import { useState } from "react";
import useDynamicMP from "../../app/hooks/useDynamicMP";
import MomentDisruption from "../../app/common/MomentDisruption";
import ProvinceAndOperatorDetail from "./ProvinceAndOperatorDetail";
import { ContainedSelect } from "../../app/common/ContainedSelect";
import provinces from "../../../public/data/provinces.json";
import ISPList from "../../../public/data/RowISPData.json";

const ProvinceAndOperatorProfile = () => {
  const theme = useTheme();

  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);
  const isDark = theme.palette.mode === "dark";

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [province, setProvince] = useState("");
  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };
  const [selectedISP, setSelectedISP] = useState("");
  const handleISPChange = (event) => {
    setSelectedISP(event.target.value);
  };
  return (
    <Box
      sx={{
        maxWidth: "calc(100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          justifySelf: isMdScreen ? "self-end" : "center",
          alignSelf: "self-start",
          display: "flex",
          // background: isDark
          //   ? "rgba(55, 55, 55, 0.40)"
          //   : "paint0_radial_202_4189",
          // padding: "1rem",
          borderRadius: "1rem",
          // backdropFilter: "blur(18px)",
          alignItems: "center",
        }}
      >
        <Box>
          <ContainedSelect
            labelId="change-province-label"
            id="change-province"
            label="انتخاب استان"
            value={province}
            onChange={handleProvinceChange}
            displayEmpty
            sx={{
              paddingLeft: "2rem",
              minWidth: "10rem",
              background: isDark ? "" : "#FFF",
              border: "none", // Add this line
              "& .MuiOutlinedInput-root": {
                // Add these lines
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          >
            <MenuItem value="">انتخاب استان</MenuItem>
            {provinces.map((provinceItem) => (
              <MenuItem key={provinceItem.name} value={provinceItem.name}>
                {provinceItem.name}
              </MenuItem>
            ))}
          </ContainedSelect>
        </Box>
        <Box
          sx={{
            width: "2px",
            height: "30px",
            background: isDark ? "#FFF" : "#000",
          }}
        />

        <Box>
          <ContainedSelect
            labelId="change-province-label"
            id="change-province"
            label="انتخاب اپراتور"
            value={selectedISP}
            onChange={handleISPChange}
            displayEmpty
            sx={{
              paddingLeft: "2rem",
              minWidth: "10rem",
              background: isDark ? "" : "#FFF",
              border: "none", // Add this line
              "& .MuiOutlinedInput-root": {
                // Add these lines
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                },
              },
            }}
          >
            <MenuItem value="">انتخاب اپراتور</MenuItem>
            {ISPList.map((isp) => (
              <MenuItem key={isp.ISPname} value={isp.ISPname}>
                {isp.ISPname}
              </MenuItem>
            ))}
          </ContainedSelect>
        </Box>
      </Box>

      <Box
        display="flex"
        sx={{
          width: "100%",
          gap: "1.19rem",
          flexWrap: isMdScreen ? "wrap" : "",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2.5}
          flexBasis={isMdScreen ? "100%" : "50%"}
        >
          {" "}
          <ProvinceAndOperatorDetail />
          <MomentDisruption />
        </Box>
        <Charts />
      </Box>
    </Box>
  );
};

export default ProvinceAndOperatorProfile;
