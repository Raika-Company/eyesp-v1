import uploadIcon from "../../app/assets/image/uploadIcon.svg";
import downloadIcon from "../../app/assets/image/downloadIcon.svg";
import pingIcon from "../../app/assets/image/clockIcon.svg";

import { Box, Typography } from "@mui/material";
import InfoBox from "./InfoBox";
import ViewDetailsButton from "../../app/common/ViewDetailsButton";

const FloatingResult = ({ download, upload, latency }) => {

  const renderInfoBox = (isColumn, iconSrc, title, value) => (
    <InfoBox isColumn={isColumn} iconSrc={iconSrc} title={title} value={value} />
  );

  return (
    <>
      <Typography sx={{ display: { md: "none" } }}>
        برای دریافت اطلاعات بر روی دکمه شروع کلیک کنید.
      </Typography>
      <Box
        justifyContent="space-evenly"
        width="100%"
        marginY={1}
        sx={{ display: { xs: "flex", md: "none" } }}
      >
        {renderInfoBox(true, downloadIcon, "سرعت دانلود", download)}
        {renderInfoBox(true, uploadIcon, "سرعت آپلود", upload)}
        {renderInfoBox(true, pingIcon, "پینگ", latency)}
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
          bottom: "-10%",
          left: "10%",
          width: "80%",
          marginX: "auto",
          height: "20%",
          backgroundColor: "#FFF",
          marginBottom: "1rem",
          border: '1px solid #FFF',
          background: 'rgba(255, 255, 255, 0.80)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box display="flex" justifyContent="space-evenly" width="100%">
          {renderInfoBox(false, downloadIcon, "سرعت دانلود", download)}
          {renderInfoBox(false, uploadIcon, "سرعت آپلود", upload)}
          {renderInfoBox(false, pingIcon, "پینگ", latency)}
        </Box>
        <Typography>
          برای دریافت اطلاعات بر روی دکمه شروع کلیک کنید.
        </Typography>
        <Box alignSelf="flex-end" marginLeft="2rem">
          <ViewDetailsButton target="/history" />
        </Box>
      </Box>
    </>
  )
}

export default FloatingResult