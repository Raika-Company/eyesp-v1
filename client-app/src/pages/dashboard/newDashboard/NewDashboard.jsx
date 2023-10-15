import {
  Box,
  Stack,
  MenuItem,
  Button,
  useMediaQuery,
  keyframes,
} from "@mui/material";
import ConflictDetailsCard from "./components/ConflictDetailsCard";
import AllSituationCard from "./components/AllSituationCard";
import CompareTable from "./components/CompareTable";
import {ContainedSelect} from "../../../app/common/ContainedSelect";
import provinces from "../../../../public/data/provinces.json";
import provincesCoords from "../../../../public/data/provincesCoords.json";
import ISPList from "../../../../public/data/RowISPData.json";
import {useState} from "react";
import BackgroundSvg from "../../../app/common/BackgroundSvg";

const NewDashboard = () => {
  const [province, setProvince] = useState("");
  const [selectedISP, setSelectedISP] = useState("");
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };
  const handleISPChange = (event) => {
    setSelectedISP(event.target.value);
  };

  return (
    <>
      <BackgroundSvg
        provinces={
          province
            ? [provincesCoords[province]]
            : [
                provincesCoords["تهران"],
                provincesCoords["خوزستان"],
                provincesCoords["قم"],
                provincesCoords["یزد"],
              ]
        }
      />
      <Box
        sx={{
          width: "100%",
          marginTop: "1rem",
          display: "grid",
          gridTemplateColumns: isMdScreen ? "repeat(2, 1fr)" : "1fr",
        }}
      >
        <Stack direction="column" gap="2rem" padding="2rem" whiteSpace="nowrap">
          <ConflictDetailsCard />
          <AllSituationCard />
          <Stack direction="row" gap="2rem">
            <CompareTable title="اپراتور‌های برتر" />
            <CompareTable title="استان‌های برتر" showProvince />
          </Stack>
        </Stack>
        <Box
          sx={{
            justifySelf: isMdScreen ? "self-end" : "center",
            alignSelf: "self-start",
            display: "flex",
            background: "rgba(55, 55, 55, 0.40)",
            padding: "1rem",
            borderRadius: "1rem",
            backdropFilter: "blur(18px)",
            alignItems: "center",
            gap: "1rem",
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
              sx={{paddingLeft: "2rem", minWidth: "10rem"}}
            >
              <MenuItem value="">انتخاب استان</MenuItem>
              {provinces.map((provinceItem) => (
                <MenuItem key={provinceItem.name} value={provinceItem.name}>
                  {provinceItem.name}
                </MenuItem>
              ))}
            </ContainedSelect>
          </Box>
          <Box>
            <ContainedSelect
              labelId="change-province-label"
              id="change-province"
              label="انتخاب اپراتور"
              value={selectedISP}
              onChange={handleISPChange}
              displayEmpty
              sx={{paddingLeft: "2rem", minWidth: "10rem"}}
            >
              <MenuItem value="">انتخاب اپراتور</MenuItem>
              {ISPList.map((isp) => (
                <MenuItem key={isp.ISPname} value={isp.ISPname}>
                  {isp.ISPname}
                </MenuItem>
              ))}
            </ContainedSelect>
          </Box>
          <Button
            variant="text.main"
            component={"button"}
            to=""
            sx={{
              borderRadius: "1rem",
              padding: "1rem",
              background: "#0C6087",
              whiteSpace: "nowrap",
            }}
          >
            مشاهده وضعیت
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NewDashboard;
