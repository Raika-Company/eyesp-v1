import { Box, Typography } from "@mui/material";
import React from "react";
import CardContainer from "../../app/common/CardContainer";
import CardInformation from "../../app/common/CardInformation";
import CircleChart from "../../app/common/CircleChart";

const ISPSummary = () => {
  return (
    <>
      <Box display="flex" justifyContent="space-between" marginBottom="1.19rem">
        <Typography variant="h1" component="h3" color="text.secondary">
          وضعیت اپراتور ها
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" gap="1.25rem" height="100%">
        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <CardContainer
            display="flex"
            flexDirection="column"
            gap="2.62rem"
            paddingTop="0.88rem"
            paddingBottom="2.5rem"
            paddingX="0.75rem"
          >
            <div>
              <Typography
                textAlign="right"
                variant="h2"
                component="h4"
                marginBottom="0.88rem"
                marginRight="0.75rem"
              >
                وضعیت کلی
              </Typography>
              <CardInformation
                title="تعداد ISP های فعال"
                value={245}
                subTitle="در هفته گذشته"
                subValue={"3+"}
                color="text.number"
              />
            </div>
            <CardInformation
              title="تعداد کاربران فعال"
              value={8437215}
              subTitle="در هفته گذشته"
              subValue={"33145+"}
              color="text.number"
            />
            <CardInformation
              title="تعداد ISP های فعال"
              value={245}
              subTitle="در هفته گذشته"
              subValue={"3+"}
              color="text.number"
            />
          </CardContainer>
          <CardContainer
            display="flex"
            flexDirection="column"
            paddingTop="0.88rem"
            paddingBottom="2.5rem"
            paddingX="0.75rem"
          >
            <Typography
              textAlign="right"
              variant="h2"
              component="h4"
              marginBottom="0.88rem"
              marginRight="0.75rem"
            >
              میانگین ها
            </Typography>
            <CircleChart id={10} finalPercentage={60} />
          </CardContainer>
        </Box>
      </Box>
    </>
  );
};

export default ISPSummary;
