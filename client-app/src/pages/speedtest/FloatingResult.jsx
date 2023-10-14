import uploadIcon from "../../app/assets/image/uploadIcon.svg";
import downloadIcon from "../../app/assets/image/downloadIcon.svg";
import pingIcon from "../../app/assets/image/clockIcon.svg";
import Instagram from "../../app/assets/image/imgLogoSocialM/instagram.svg";
import PhLink from "../../app/assets/image/imgLogoSocialM/ph_link.svg";
import Linkedin from "../../app/assets/image/imgLogoSocialM/linkedin.svg";
import Facebook from "../../app/assets/image/imgLogoSocialM/facebook.svg";
import SimpleIcon from "../../app/assets/image/imgLogoSocialM/simple-icon.svg";
import React, { useState, useEffect } from "react";

import { Box, Typography, useTheme } from "@mui/material";
import Fade from "@mui/material/Fade";
import { ContainedButton } from "../../app/common/ContainedButton";
import InfoBox from "./InfoBox";
// import ViewDetailsButton from "../../app/common/ViewDetailsButton";
import { useNavigate } from "react-router-dom";
import IconLink from "./IconLInk";

const SOCIAL_ICONS = [
  {
    name: "Simple Icon",
    iconPath: SimpleIcon,
    link: "#",
  },
  {
    name: "Facebook",
    iconPath: Facebook,
    link: "#",
  },
  {
    name: "linkedin",
    iconPath: Linkedin,
    link: "#",
  },
  {
    name: "Instagram",
    iconPath: Instagram,
    link: "#",
  },
  {
    name: "phLink",
    iconPath: PhLink,
    link: "#",
  },
];

const FloatingResult = ({ download, upload, latency, isTestEnds }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const renderInfoBox = (isColumn, iconSrc, title, value, unit) => (
    <InfoBox
      key={title}
      isColumn={isColumn}
      iconSrc={iconSrc}
      title={title}
      value={value}
      isTestEnds={isTestEnds}
      unit={unit}
    />
  );

  return (
    <>
      <Typography sx={{ display: { md: "none" } }}>
        برای انجام تست روی دکمه شروع کلیک کنید.{" "}
      </Typography>
      <Box
        justifyContent="space-evenly"
        width="100%"
        marginY={1}
        sx={{
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {renderInfoBox(true, pingIcon, "پینگ", latency)}
        {renderInfoBox(true, downloadIcon, "سرعت دانلود", download)}
        {renderInfoBox(true, uploadIcon, "سرعت آپلود", upload)}
        <Fade in={isTestEnds}>
          <Box
            sx={{
              position: "absolute",
              transition: "all .25s linear",
              top: "25%",
              left: "25%",
              transform: "translateX(-12.5%)",
              zIndex: "10",
              height: "10rem",
              width: "14rem",
              borderRadius: "2rem",
              backdropFilter: "blur(5px)",
              background: theme.palette.mode === "dark" ? "#262626" : "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ContainedButton
              bgColor="#0C6087"
              txtHover="#0C6087"
              txtColor="#fff"
              onClick={() => navigate(0)}
            >
              تست مجدد
            </ContainedButton>
          </Box>
        </Fade>
      </Box>

      <Box
        borderRadius="2rem"
        sx={{
          display: { xs: "none", md: "flex" },
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          boxShadow: "0px 4px 40px 0px rgba(0, 0, 0, 0.20)",
          position: "absolute",
          bottom: isTestEnds ? "16%" : "-5%",
          left: isTestEnds ? "35.3%" : "30.5%",
          transition: "all .5s linear",
          width: isTestEnds ? "40%" : "50%",
          height: isTestEnds ? "70%" : "25%",
          marginX: "auto",
          marginBottom: "1rem",
          background: theme.palette.mode === "dark" ? "#262626" : "#fff",
          backdropFilter: "blur(10px)",
          zIndex: "5",
          pb: "1.5rem",
        }}
      >
        {isTestEnds && (
          <ContainedButton
            bgColor="#0C6087"
            txtHover="#0C6087"
            txtColor="#fff"
            sx={{
              minWidth: "30%",
              position: "absolute",
              bottom: "4%",
            }}
            onClick={() => navigate(0)}
          >
            تست مجدد
          </ContainedButton>
        )}
        {!isTestEnds && (
          <Typography>برای انجام تست روی دکمه شروع کلیک کنید. </Typography>
        )}
        {/* {!isTestEnds && (
          <Box alignSelf="flex-end" marginLeft="2rem">
            <ViewDetailsButton target="/history" />
          </Box>
        )} */}
        {isTestEnds && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: ".5rem",
            }}
          >
            <Typography sx={{color : theme.palette.mode === "dark" ? "#fff" : "#4E4E4E",}}>به اشتراک بگذارید:</Typography>
            {SOCIAL_ICONS.map(({ iconPath, name, link }) => (
              <IconLink iconPath={iconPath} key={name} link={link} />
            ))}
          </Box>
        )}
        <Box display="flex" justifyContent="space-evenly" width="100%">
          {renderInfoBox(
            isTestEnds ? true : false,
            pingIcon,
            "پینگ",
            latency,
            "ms"
          )}
          {renderInfoBox(
            isTestEnds ? true : false,
            downloadIcon,
            "سرعت دانلود",
            download,
            "mb/s"
          )}
          {renderInfoBox(
            isTestEnds ? true : false,
            uploadIcon,
            "سرعت آپلود",
            upload,
            "mb/s"
          )}
        </Box>
        {isTestEnds && (
          <Box
            sx={{
              width: "40%",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-end",
            }}
          >
            {["آدرسIP", "سرور", "نوع تست"].map((text, index) => (
              <Typography key={index} variant="h4" color="text.main">
                {text}:
                <Typography
                  component="span"
                  variant="h5"
                  color="text"
                  marginX="0.5rem"
                >
                  {text === "آدرس"
                    ? ip === ""
                      ? "در حال پیدا کردن ip"
                      : ip
                    : server === ""
                    ? "در حال انتخاب سرور"
                    : "تهران - زیرساخت"}
                </Typography>
              </Typography>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
};

export default FloatingResult;
