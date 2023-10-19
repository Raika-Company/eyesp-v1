import {useEffect, useState} from "react";
import {styled, keyframes, Box, Typography} from "@mui/material";
import services from "../../../../app/api/index";
import convertToPersian from "../../../../app/utils/convertToPersian";

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
const RowBox = styled(Box)(({delay, gradient}) => ({
  display: "flex",
  alignItems: "center",
  borderRadius: ".5rem",
  background: gradient,
  paddingX: "0.94rem",
  paddingY: "0.5rem",
  height: "2.2rem",
  opacity: delay ? 0 : 1,
  animation: delay ? `${fadeInAnimation} 0.4s forwards ${delay}s` : "none",
  "& > *": {
    flex: 1,
    textAlign: "center",
    fontSize: "1rem",
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
const Table = ({showProvince}) => {
  const [chartData, setChartData] = useState(null);
  const [sortedKeys, setSortedKeys] = useState([]);
  useEffect(() => {
    services.dashboard.getIspMetrics().then((response) => {
      setSortedKeys(
        Object.keys(response.data.data.isp).sort((a, b) => {
          return (
            response.data.data.isp[b].totalQuality -
            response.data.data.isp[a].totalQuality
          );
        })
      );
      setChartData(response.data.data);
    });
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "transparent",
        boxShadow: 0,
        marginBottom: "1rem",
      }}
    >
      <>
        <RowBox>
          <Typography>رتبه</Typography>
          <Typography>نام</Typography>
          <Typography>درصد عملکرد</Typography>
        </RowBox>
        {sortedKeys.map((key, index) => (
          <RowBox
            key={index}
            delay={index * 0.2}
            gradient={gradients[index >= 3 ? 3 : index]}
            marginTop=".3rem"
          >
            <Typography>{index + 1}</Typography>
            <Typography>
              {/* {showProvince */}
              {/* // ? convertToPersian(chartData.isp[key].province) */}:
              {convertToPersian(key)}
              {/* } */}
            </Typography>
            <Typography>{chartData.isp[key].totalQuality}</Typography>
          </RowBox>
        ))}
      </>
    </Box>
  );
};
export default Table;
