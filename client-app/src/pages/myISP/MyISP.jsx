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
import {
  Box,
  useMediaQuery,
  Typography,
  MenuItem,
  FormControl,
} from "@mui/material";

// Import Local components
import Charts from "../../app/common/Charts";
import ISPDetail from "../../app/common/ISPDetail";
import MomentDisruption from "../../app/common/MomentDisruption";
import { ContainedSelect } from "../../app/common/ContainedSelect";
import { useState } from "react";

const MyISP = () => {
  /**
   * Check if the screen size matches the medium breakpoint.
   *
   * @function
   * @name useMediaQuery
   * @param {function} query - The media query function to check against the screen size.
   * @returns {boolean} - True if the screen size matches the medium breakpoint, false otherwise.
   */
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [operator, setOperator] = useState("ایرانسل");
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setOperator(selectedValue);
  };
  const operatorOptions = [
    // "انتخاب اپراتور",
    "ایرانسل",
    "همراه اول",
    "زی تل",
    "مخابرات",
    "مبین نت",
  ];
  return (
    <Box
      sx={{
        maxWidth: "calc(100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Typography
          variant="h1"
          component="h1"
          mt={isMdScreen ? "0.6rem" : "0.2rem"}
        >
          وضعیت اپراتور
        </Typography>
        <FormControl sx={{ width: "10rem", mr: "1rem", height: "60px" }}>
          <ContainedSelect
            onChange={handleChange}
            value={operator}
            displayEmpty
          >
            <MenuItem disabled>
              <span>انتخاب اپراتور</span>
            </MenuItem>
            {operatorOptions.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </ContainedSelect>
        </FormControl>
      </Box>

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
          <ISPDetail operator={operator} />
          <MomentDisruption />
        </Box>
        <Charts />
      </Box>
    </Box>
  );
};

export default MyISP;
