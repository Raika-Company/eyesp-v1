import {Box, Button, Typography, useTheme} from "@mui/material";
import leftArrow from "../../../../app/assets/image/leftArrow.svg";
import Danger from "../../../../app/assets/image/danger.svg";
import DangerDark from "../../../../app/assets/image/error_dark.svg";
import {Link} from "react-router-dom";
import Square from "./Square";
import ViewDetailsButton from "../../../../app/common/ViewDetailsButton";

const conflictData = [
  {
    id: 1,
    value: 24,
    title: "مورد",
  },
  {
    id: 2,
    value: 16,
    title: "استان",
  },
  {
    id: 3,
    value: 18,
    title: "ISP",
  },
];

const conflictDetailsData = [
  {
    id: 1,
    title: "موراد اختلاف",
    values: ["افزایش پینگ", "کاهش میانگین آپلود و دانلود"],
  },
  {
    id: 2,
    title: "استان‌ها",
    values: ["تهران", "فارس", "خراسان رضوی", "خوزستان"],
  },
  {
    id: 3,
    title: "اپراتور‌ها",
    values: ["ایرانسل", "همراه‌اول", "رایتل", "آسیاتک", "شاتل"],
  },
];

const ConflictDetailsCard = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        boxShadow: "0px 0px 30px 0px rgba(255, 68, 68, 0.60)",
        borderRadius: "1rem",
        paddingY: "1rem",
        paddingX: "2rem",
        display: "flex",
        flexDirection: "column",
        background: theme.palette.mode === "dark" ? "#1A1A1A" : "#FFF",
        gap: "2rem",
        transition: "all .25s",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          textAlign: "center",
        }}
      >
        اختلال‌های موجود{" "}
        <span style={{color: "#FE4543", fontSize: "2rem"}}>24</span>
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
        }}
      >
        {conflictData.map(({id, value, title}) => (
          <Square
            value={value}
            title={title}
            key={id}
            background="radial-gradient(140.09% 140.09% at 18.63% 0%, #B40000 0%, #5D0000 100%)"
            color="#FFF"
          />
        ))}

        <Button
          variant="text.main"
          component={Link}
          to="/dashboard/conflict-details"
          sx={{
            textDecoration: "underline",
            marginRight: "auto",
          }}
        >
          مشاهده همه
          <img src={leftArrow} alt="leftArrow" />
        </Button>
      </Box>
      <div
        style={{
          background: "#F0F4F3",
          height: ".1rem",
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        {conflictDetailsData.map(({id, title, values}) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={id}
          >
            <Typography>{title}</Typography>
            <Box
              sx={{
                minWidth: "80%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background:
                  theme.palette.mode === "dark" ? "#404040" : "#F0F4F3",
                border: "1px solid #F0F4F3",
                padding: ".5rem",
                borderRadius: ".8rem",
              }}
            >
              <Typography>{values.join("،")}، و...</Typography>
              <Button
                variant="text.main"
                component={Link}
                to=""
                sx={{
                  borderRadius: ".5rem",
                  padding: ".2rem",
                  fontSize: ".8rem !important",
                  background:
                    theme.palette.mode === "dark" ? "#1B1B1B" : "#FFF",
                }}
              >
                مشاهده همه
              </Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ViewDetailsButton
          backgroundColor="#0C6087"
          target="/isp-performance"
        />

        <Button
          variant="text.main"
          component={Link}
          to=""
          sx={{
            fontSize: ".8rem !important",
            background: "",
            display: "flex",
            alignItems: "center",
          }}
        >
          گزارش خطا در اطلاعات
          <img
            src={theme.palette.mode === "dark" ? Danger : DangerDark}
            alt="leftArrow"
          />
        </Button>
      </Box>
    </Box>
  );
};

export default ConflictDetailsCard;
