import React, { memo } from "react";
import {
  styled,
  keyframes,
  IconButton,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import WestIcon from "@mui/icons-material/West";

/**
 * @description Keyframes animation for a fade-in effect.
 */
const fadeInAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

/**
 * @description Styled component representing a single row in the ISPTable.
 * Incorporates conditional styling based on delay and gradient properties.
 *
 * @param {object} theme - MUI theme object.
 * @param {number} delay - Animation delay in seconds.
 * @param {string} gradient - Background gradient CSS.
 */
const RowBox = styled(Box)(({ theme, delay, gradient }) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "0.75rem",
  background: gradient,
  paddingX: "0.94rem",
  paddingY: "0.5rem",
  width: "100%",
  height: "3.875rem",
  opacity: delay ? 0 : 1,
  animation: delay ? `${fadeInAnimation} 0.4s forwards ${delay}s` : "none",
  "& > *": {
    flex: 1,
    textAlign: "center",
    fontSize: "1.25rem",
    fontFamily: "PeydaLight",
    // color: "#676767",
  },
}));

/**
 * @description Array of gradient strings for styling the rows in the ISPTable.
 */
const gradients = ["#7D6C41", "#6A6861", "#6F4D25", "#404040"];
const light_gradients = [
  "linear-gradient(180deg, #BDFEAE 0%, #F2EFA5 0.01%, #F9F7EA 100%)",
  "linear-gradient(180deg, #DADADA 0%, #E1E1E1 0.01%, #F6F6F6 100%)",
  "linear-gradient(180deg, #D49A63 0%, #F1CBB0 0.01%, #F8F8F8 100%)",
  "linear-gradient(180deg, #D0E3ED 0%, #D0E2EC 0.01%, #EEF4F9 100%)",
];
/**
 * @function ISPTable
 * @description React component for displaying a table of Internet Service Providers (ISPs).
 * Each row represents details about a particular ISP, including name, rank, disturbance, pings, and speed.
 *
 * @param {Array} ISPdata - Array of objects representing data for each ISP.
 * @returns {JSX.Element}
 */
const ISPTable = ({ ISPdata, isDetail }) => {
  const theme = useTheme(); // Get the current theme
  const isDarkMode = theme.palette.mode === "dark";
  const rowsHead = [
    { unit: "(mb/s)", label: "سرعت میانگین دانلود" },
    { unit: "(mb/s)", label: "سرعت میانگین آپلود" },
    { unit: "(m/s)", label: "پینگ" },
    { unit: "(m/s)", label: "پکت لاس" },
    { unit: "(%)", label: "عملکرد" },
  ];
  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        boxShadow: 0,
        marginBottom: "1rem",
      }}
    >
      {isDetail ? (
        <>
          <RowBox>
            <Typography variant="h4">رتبه</Typography>
            <Typography variant="h4">نام</Typography>
            {rowsHead.map((row) => {
              return (
                <Box
                  key={row.label}
                  display={"flex"}
                  flexDirection={"column"}
                  justifyContent={"center"}
                >
                  <Typography variant="h6">{row.unit}</Typography>
                  <Typography variant="h4">{row.label}</Typography>
                </Box>
              );
            })}
            <Typography variant="h4">جزئیات</Typography>
          </RowBox>
          {ISPdata.map((Items, index) => (
            <RowBox
              key={Items.rank}
              delay={index * 0.2}
              gradient={
                isDarkMode
                  ? gradients[index >= 3 ? 3 : index]
                  : light_gradients[index >= 3 ? 3 : index]
              } // Use the gradient based on the theme
              marginTop="0.75rem"
            >
              <Typography variant="h5">{index + 1}</Typography>
              <Typography variant="h5">{Items.ISPname}</Typography>
              <Typography variant="h5" sx={{ color: "primary" }}>
                {Items.disturbance}
              </Typography>
              <Typography variant="h5">{Items.upload}</Typography>
              <Typography variant="h5">{Items.pings}</Typography>
              <Typography variant="h5">{Items.packet}</Typography>
              <Typography variant="h5">{Items.performance}</Typography>
              <IconButton aria-label={`more info about ${Items.ISPname}`}>
                <WestIcon />
              </IconButton>
            </RowBox>
          ))}
        </>
      ) : (
        <>
          <RowBox>
            <Typography>رتبه</Typography>
            <Typography>نام</Typography>
            <Typography>
              <Typography>%</Typography>اختلال
            </Typography>
            <Typography>
              <Typography>(ms)</Typography>پینگ
            </Typography>
            <Typography>
              <Typography>(mb/s)</Typography>سرعت
            </Typography>
            <Typography>جزئیات</Typography>
          </RowBox>
          {ISPdata.map((Items, index) => (
            <RowBox
              key={Items.rank}
              delay={index * 0.2}
              gradient={
                isDarkMode
                  ? gradients[index >= 3 ? 3 : index]
                  : light_gradients[index >= 3 ? 3 : index]
              } // Use the gradient based on the theme
              marginTop="1rem"
            >
              <Typography>{index + 1}</Typography>
              <Typography>{Items.ISPname}</Typography>
              <Typography sx={{ color: "primary" }}>
                {Items.disturbance}
              </Typography>
              <Typography>{Items.pings}</Typography>
              <Typography>{Items.speed}</Typography>
              <IconButton aria-label={`more info about ${Items.ISPname}`}>
                <WestIcon />
              </IconButton>
            </RowBox>
          ))}
        </>
      )}
    </Box>
  );
};
export default memo(ISPTable);
