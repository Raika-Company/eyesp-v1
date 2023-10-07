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
import MyService from "../../app/common/MyService,";
import UserSatisfaction from "../../app/common/UserSatisfaction";
import SoloChartPerformance from "./SoloChartPerformance";

import useDynamicMP from "../../app/hooks/useDynamicMP";

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
    <>
      <Box
        display="flex"
        sx={{ gap: mpCardContainers, flexWrap: isMdScreen ? "wrap" : "" }}
      >
        <MyService qualityPercentage={78} />
        <UserSatisfaction />
      </Box>
      <SoloChartPerformance />
    </>
  );
};

export default MyISP;
