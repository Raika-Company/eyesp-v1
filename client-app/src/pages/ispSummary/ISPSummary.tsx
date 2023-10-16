import { Box, Typography } from "@mui/material";
import React from "react";
import CardContainer from "../../app/common/CardContainer";

const ISPSummary = () => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom="1.19rem">
        <Typography variant="h1" component="h3" color="text.secondary">وضعیت اپراتور ها</Typography>
      </Box>
      <Box display="flex" flexDirection="row" gap="1.25rem">
        <CardContainer display="flex" flexDirection="column" gap="1.25rem" paddingY="0.88rem" paddingX="0.75rem">
          <Typography textAlign="right" variant="h2" component="h4">وضعیت کلی</Typography>
        </CardContainer>
      </Box>
    </>
  );
};

export default ISPSummary;
