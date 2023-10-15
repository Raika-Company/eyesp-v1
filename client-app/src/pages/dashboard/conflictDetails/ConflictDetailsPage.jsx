import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {useState} from "react";
import {Box, Button, ButtonGroup, Divider, Typography} from "@mui/material";
import ConflictBox from "./ConflictBox";

const conflicts = [
  "کاهش سرعت دانلود",
  "کاهش سرعت آپلود",
  "قطعی سرویس",
  "افزایش پکت لاس",
];
const mockDataConflict = {
  "کاهش سرعت دانلود": {
    اصفهان: ["شاتل", "پارس آنلاین", "های وب"],
    فارس: ["شاتل", "پارس آنلاین", "های وب", "زیتل", "آسیاتک"],
    تهران: ["شاتل", "پارس آنلاین", "های وب", "زیتل", "آسیاتک"],
    سمنان: [
      "شاتل",
      "پارس آنلاین",
      "های وب",
      "زیتل",
      "آسیاتک",
      "سمنت",
      "مخابرات",
      "زیکسل",
    ],
    مرکزی: [
      "شاتل",
      "پارس آنلاین",
      "های وب",
      "زیتل",
      "آسیاتک",
      "مخابرات",
      "زیکسل",
    ],
  },
  "کاهش سرعت آپلود": {
    مرکزی: ["شاتل", "زیتل", "آسیاتک", "سمنت", "مخابرات", "زیکسل"],
    کهگیلویه‌و‌بویراحمد: ["شاتل", "پارس آنلاین", "های وب", "زیتل", "آسیاتک"],
  },
  "قطعی سرویس": {
    سمنان: ["شاتل"],
  },

  "افزایش پکت لاس": {
    بوشهر: ["شاتل", "پارس آنلاین", "های وب", "زیتل", "آسیاتک"],
    "خراسان رضوی": [
      "شاتل",
      "پارس آنلاین",
      "های وب",
      "زیتل",
      "آسیاتک",
      "سمنت",
      "مخابرات",
      "زیکسل",
    ],
    خوزستان: [
      "شاتل",
      "پارس آنلاین",
      "های وب",
      "زیتل",
      "آسیاتک",
      "مخابرات",
      "زیکسل",
    ],
  },
};

const ConflictDetailsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSort, setSelectedSort] = useState("conflict");

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: ".5rem",
            borderRadius: "1rem",
            background: "#393939",
            gap: "1rem",
          }}
        >
          <Typography>چینش بر اساس:</Typography>
          <ButtonGroup
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <Button
              variant="text"
              sx={{
                color: selectedSort === "conflict" ? "#00A4FF" : "#FFF",
              }}
              onClick={() => setSelectedSort("conflict")}
            >
              نوع اختلاف
            </Button>
            <Divider
              orientation="vertical"
              sx={{
                height: "1.5rem",
              }}
            />
            <Button
              variant="text"
              onClick={() => setSelectedSort("province")}
              sx={{
                color: selectedSort === "province" ? "#00A4FF" : "#FFF",
              }}
            >
              استان
            </Button>
            <Divider
              orientation="vertical"
              sx={{
                height: "1.5rem",
              }}
            />
            <Button
              variant="text"
              onClick={() => setSelectedSort("ISP")}
              sx={{
                color: selectedSort === "ISP" ? "#00A4FF" : "#FFF",
              }}
            >
              اپراتور
            </Button>
          </ButtonGroup>
        </Box>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            border: " 1px solid #676767",
            background: "#393939",
            // width: isSmScreen ? 160 : 200,
            borderRadius: "1rem",
          }}
        >
          <InputBase
            sx={{mr: 1, flex: 1}}
            placeholder="جست و جو"
            inputProps={{"aria-label": "جست و جو"}}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton type="button" sx={{p: "10px"}} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </Box>
      <Box
        sx={{
          maxWidth: "100%",
          display: "grid",
          gap: "1rem",
          marginTop: "2rem",
          gridTemplateColumns: "repeat(6, auto)",
          gridTemplateRows: "repeat(auto, 10rem)",
          gridAutoFlow: "dense",
          justifyItems: "start",
          justifyContent: "start",
        }}
      >
        {conflicts.map((conflict, index) => (
          <ConflictBox
            key={conflict}
            title={conflict}
            data={mockDataConflict[conflict]}
          />
        ))}
      </Box>
    </Box>
  );
};

export default ConflictDetailsPage;
