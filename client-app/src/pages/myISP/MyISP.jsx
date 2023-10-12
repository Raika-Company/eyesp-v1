/**
 * @file MyISP.jsx
 * This component represents the MyISP section of your application. It displays
 * MyService, UserSatisfaction, and SoloChartPerformance components.
 *
 * @component
 * @example
 * // Usage inside another component or JSX
 * import MyISP from './MyISP';
 * // ...
 * <MyISP />
 */

// Import Material-UI components and styles
import { Box, useMediaQuery } from "@mui/material";

// Import Local components
import Charts from "../../app/common/Charts";
import SoloChartPerformance from "./SoloChartPerformance";

import useDynamicMP from "../../app/hooks/useDynamicMP";
import OperatorProfile from "../../app/common/OperatorProfile";
import ISPDetail from "../../app/common/ISPDetail";
import MomentDisruption from "../../app/common/MomentDisruption";

const MyISP = () => {
  /**
   * Calculate the dynamic margin and padding values for card containers based on screen width.
   *
   * @function
   * @name useDynamicMP
   * @param {number} minWidth - The minimum width for which the calculation is valid.
   * @param {number} maxWidth - The maximum width for which the calculation is valid.
   * @param {number} minMargin - The minimum margin value.
   * @param {number} maxMargin - The maximum margin value.
   * @returns {number} - The calculated margin and padding value.
   */
  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);

  /**
   * Check if the screen size matches the medium breakpoint.
   *
   * @function
   * @name useMediaQuery
   * @param {function} query - The media query function to check against the screen size.
   * @returns {boolean} - True if the screen size matches the medium breakpoint, false otherwise.
   */
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        maxWidth: "calc(100%)",
      }}
    >
      <Box
        display="flex"
        sx={{
          width: "100%",
          gap: "1.19rem",
          flexWrap: isMdScreen ? "wrap" : "",
        }}
      >
        <Box
          display="flex"
          flexDirection="column"
          gap={2.5}
          flexBasis={isMdScreen ? "100%" : "50%"}
        >
          {" "}
          <ISPDetail />
          <MomentDisruption />
        </Box>
        <Charts />
      </Box>
    </Box>
  );
};

export default MyISP;
