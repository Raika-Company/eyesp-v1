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
import { useEffect, useState } from "react";
import services from "../../app/api/index";
import ISPs from "../../../public/data/ISPs.json";

const MyISP = () => {
  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));
  const [operator, setOperator] = useState("Irancell");
  const [operatorData, setOperatorData] = useState(null);

  const handleChangeOperator = (event) => {
    const selectedValue = event.target.value;
    setOperator(selectedValue);
  };

  useEffect(() => {
    services.myISP
      .GetOperatorDetails(operator)
      .then((response) => {
        console.log("Received Data: ", response.data);
        setOperatorData(response.data.data.clients);
      })
      .catch((error) => {
        console.log("خطا در بارگذاری اطلاعات", error);
      });
  }, [operator]);

  return (
    <Box sx={{ maxWidth: "calc(100%)", flexDirection: "column" }}>
      <Header
        isMdScreen={isMdScreen}
        operator={operator}
        handleChangeOperator={handleChangeOperator}
      />
      <Body
        isMdScreen={isMdScreen}
        operator={operator}
        operatorData={operatorData}
      />
    </Box>
  );
};

const Header = ({ isMdScreen, operator, handleChangeOperator }) => (
  <Box sx={{ display: "flex" }}>
    <Typography
      variant="h1"
      component="h1"
      mt={isMdScreen ? "0.6rem" : "0.2rem"}
    >
      وضعیت اپراتور
    </Typography>
    <FormControl sx={{ width: "10rem", mr: "1rem", height: "60px" }}>
      <ContainedSelect
        onChange={handleChangeOperator}
        value={operator}
        displayEmpty
      >
        <MenuItem disabled>
          <span>انتخاب اپراتور</span>
        </MenuItem>
        {ISPs.map((option, index) => (
          <MenuItem key={index} value={option.internationalName}>
            {option.localName}
          </MenuItem>
        ))}
      </ContainedSelect>
    </FormControl>
  </Box>
);

const Body = ({ isMdScreen, operator, operatorData }) => (
  <Box
    display="flex"
    sx={{
      width: "100%",
      gap: "1.19rem",
      flexWrap: isMdScreen ? "wrap" : "nowrap",
    }}
  >
    <Box
      display="flex"
      flexDirection="column"
      gap={2.5}
      flexBasis={isMdScreen ? "100%" : "50%"}
    >
      <ISPDetail operator={operator} data={operatorData} />
      <MomentDisruption data={operatorData} key={operator} />
    </Box>
    <Charts isp={operator}/>
  </Box>
);

export default MyISP;
