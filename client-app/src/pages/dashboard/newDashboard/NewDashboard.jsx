import {
  Box,
  Stack,
  MenuItem,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ConflictDetailsCard from "./components/ConflictDetailsCard";
import AllSituationCard from "./components/AllSituationCard";
import CompareTable from "./components/CompareTable";
import {ContainedSelect} from "../../../app/common/ContainedSelect";
import provinces from "../../../../public/data/provinces.json";
import ISPList from "../../../../public/data/RowISPData.json";
import provincesCoords from "../../../../public/data/provincesCoords.json";
import {useState} from "react";
import BackgroundSvg from "../../../app/common/BackgroundSvg";
import SetConflictModal from "./components/SetConflictModal";

const NewDashboard = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [openConflictModal, setOpenConflictModal] = useState(false);
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));

  const [province, setProvince] = useState("");
  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const [selectedISP, setSelectedISP] = useState("");
  const handleISPChange = (event) => {
    setSelectedISP(event.target.value);
  };

  return (
    <div>
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
        <Stack
          zIndex={1}
          direction="column"
          gap="2rem"
          padding="2rem"
          whiteSpace="nowrap"
        >
          <ConflictDetailsCard onOpenModal={() => setOpenConflictModal(true)} />
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
            background: isDark
              ? "rgba(55, 55, 55, 0.40)"
              : "paint0_radial_202_4189",
            padding: "1rem",
            borderRadius: "1rem",
            backdropFilter: "blur(18px)",
            alignItems: "center",
            gap: "1rem",
            zIndex: 2,
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
          <Button
            variant="text.main"
            component={"button"}
            to=""
            sx={{
              borderRadius: "1rem",
              padding: "1rem",
              background: "#0C6087",
              whiteSpace: "nowrap",
              color: "#FFF",
            }}
          >
            مشاهده وضعیت
          </Button>
        </Box>
      </Box>
      <SetConflictModal
        open={openConflictModal}
        onClose={() => setOpenConflictModal(false)}
      />
    </div>
  );
};

export default NewDashboard;
