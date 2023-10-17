import { Box, useMediaQuery, Typography } from "@mui/material";

import Charts from "../../app/common/Charts";

import useDynamicMP from "../../app/hooks/useDynamicMP";
import OperatorProfile from "../../app/common/OperatorProfile";
import ISPDetail from "../../app/common/ISPDetail";
import MomentDisruption from "../../app/common/MomentDisruption";
import ProvinceDetail from "./ProvinceDetail";

const ProvinceProfile = () => {
  const mpCardContainers = useDynamicMP(390, 1440, 1.38, 2.38);

  const isMdScreen = useMediaQuery((theme) => theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        maxWidth: "calc(100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1" component="h1">
        استان تهران{" "}
      </Typography>

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
          <ProvinceDetail />
          <MomentDisruption />
        </Box>
        <Charts />
      </Box>
    </Box>
  );
};

export default ProvinceProfile;
