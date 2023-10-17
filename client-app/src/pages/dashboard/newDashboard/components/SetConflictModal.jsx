import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Button,
  Typography,
  MenuItem,
  useTheme,
  TextField,
} from "@mui/material";
import {useState} from "react";
import CrossIcon from ".././../../../app/assets/image/cross.svg";
import {ContainedSelect} from "../../../../app/common/ContainedSelect";
import provinces from "../../../../../public/data/provinces.json";
import ISPList from "../../../../../public/data/RowISPData.json";

const SetConflictModal = ({open, onClose}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [province, setProvince] = useState("");
  const handleProvinceChange = (event) => {
    setProvince(event.target.value);
  };

  const [selectedISP, setSelectedISP] = useState("");
  const handleISPChange = (event) => {
    setSelectedISP(event.target.value);
  };

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: "1.5rem",
        },
      }}
      open={open}
      onClose={onClose}
      sx={{
        backdropFilter: "blur(2px)",
      }}
    >
      <Box
        sx={{
          background: "#1A1A1A",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <DialogTitle>
            <Typography
              sx={{
                fontWeight: "800",
              }}
            >
              گزارش خطا در اطلاعات
            </Typography>
          </DialogTitle>
          <Button
            variant="text.main"
            component={"button"}
            onClick={onClose}
            sx={{
              borderRadius: "1rem",
              padding: "1rem",
              whiteSpace: "nowrap",
              color: "#FFF",
            }}
          >
            بستن
            <img src={CrossIcon} />
          </Button>
        </Stack>
        <DialogContent
          sx={{
            minWidth: "20rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <ContainedSelect
            labelId="change-province-label"
            id="change-province"
            label="انتخاب استان"
            value={province}
            onChange={handleProvinceChange}
            displayEmpty
            sx={{
              width: "100%",
              minWidth: "10rem",
              background: isDark ? "#313131" : "",
              border: "1.5px solid #767676",
            }}
          >
            <MenuItem value="">انتخاب استان</MenuItem>
            {provinces.map((provinceItem) => (
              <MenuItem key={provinceItem.name} value={provinceItem.name}>
                {provinceItem.name}
              </MenuItem>
            ))}
          </ContainedSelect>
          <ContainedSelect
            labelId="change-province-label"
            id="change-province"
            label="انتخاب اپراتور"
            disabled={!province}
            value={selectedISP}
            onChange={handleISPChange}
            displayEmpty
            sx={{
              width: "100%",
              minWidth: "10rem",
              background: isDark ? (!province ? "#B3B3B3" : "#313131") : "",
              border: "1.5px solid #767676",
            }}
          >
            <MenuItem value="">انتخاب اپراتور</MenuItem>
            {ISPList.map((isp) => (
              <MenuItem key={isp.ISPname} value={isp.ISPname}>
                {isp.ISPname}
              </MenuItem>
            ))}
          </ContainedSelect>
          <TextField
            style={{
              borderRadius: "1rem",
            }}
            variant="outlined"
            multiline
            placeholder="توضیح بیشتر(درصورت تمایل)"
            rows="3"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "15px",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "15px",
              },
              background: isDark
                ? !selectedISP || !province
                  ? "#B3B3B3"
                  : "#313131"
                : "",
              borderRadius: "1rem",
            }}
          />
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
            گزارش خطا
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default SetConflictModal;
