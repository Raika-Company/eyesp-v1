import { Box, Button, Typography, useTheme } from "@mui/material";
import leftArrow from "../../../../app/assets/image/leftArrow.svg";
import Danger from "../../../../app/assets/image/danger.svg";
import DangerDark from "../../../../app/assets/image/error_dark.svg";
import { Link } from "react-router-dom";
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
    values: ["افزایش پینگ اپراتور  های وب در تهران"],
    address:
      "http://localhost:3000/chat/get-issue-stats/info/Zitel/download/Tehran",
  },
  {
    id: 2,
    title: "استان‌ها",
    values: ["کاهش سرعت دانلود در اپراتور زیتل"],
    address:
      "http://localhost:3000/chat/get-issue-stats/info/Zitel/download/Tehran",
  },
  {
    id: 3,
    title: "اپراتور‌ها",
    values: ["اختلال و قطعی اینترنت اپراتور مخابرات در شهر تهران"],
    address:
      "http://localhost:3000/chat/get-issue-stats/info/Mokhaberat/packet_loss/Tehran",
  },
];

const ConflictDetailsCard = ({ onOpenModal }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box
      sx={{
        boxShadow: "0px 0px 30px 0px rgba(255, 68, 68, 0.60)",
        borderRadius: "1rem",
        paddingY: "1rem",
        paddingX: "2rem",
        display: "flex",
        flexDirection: "column",
        background: isDark ? "#1A1A1A" : "#FFF",
        gap: "2rem",
        transition: "all .25s",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          textAlign: "center",
        }}
      >
        اختلال‌های موجود{" "}
        <span style={{ color: "#FE4543", fontSize: "2rem" }}>24</span>
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: "1rem",
        }}
      >
        {conflictData.map(({ id, value, title }) => (
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
        {conflictDetailsData.map(({ id, title, values, address }) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
            key={id}
          >
            <Box
              sx={{
                minWidth: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: isDark ? "#404040" : "#F0F4F3",
                border: "1px solid #F0F4F3",
                padding: ".5rem",
                borderRadius: ".8rem",
              }}
            >
              <Typography variant="body1">{values}</Typography>
              <Button
                variant="text.main"
                component={Link}
                to={address}
                sx={{
                  borderRadius: ".5rem",
                  padding: ".2rem",
                  fontSize: ".8rem !important",
                  background: isDark ? "#1B1B1B" : "#FFF",
                }}
              >
                کمک از هوش مصنوعی
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
          onClick={onOpenModal}
          sx={{
            fontSize: ".8rem !important",
            background: "",
            display: "flex",
            alignItems: "center",
          }}
        >
          گزارش خطا در اطلاعات
          <img src={isDark ? Danger : DangerDark} alt="leftArrow" />
        </Button>
      </Box>
    </Box>
  );
};

export default ConflictDetailsCard;
