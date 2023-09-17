import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Paper,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const StyledAccordion = styled(Accordion)({
  boxShadow: 0,
  '&.MuiAccordion-root': {
    borderRadius: '1.875rem',
    '&:before': {
      display: 'none'  // Removes the default divider
    }
  }
});

const NewDashboard = () => {
  return (
    <Container maxWidth="xl">
      <Grid
        container
        component={Paper}
        elevation={8}
        marginY="1rem"
        borderRadius="2rem"
        paddingTop="3.5rem"
        paddingBottom="2.25rem"
        paddingX="5%"
        sx={{
          background:
            "radial-gradient(232.71% 140.09% at 3.96% 11.02%, rgba(255, 255, 255, 0.71) 0%, rgba(255, 255, 255, 0.80) 43.38%, rgba(255, 255, 255, 0.51) 100%)",
        }}
      >
        <Grid item xs={12} md={6}>
          <Typography gutterBottom>وضعیت اینترنت</Typography>
          <Typography gutterBottom>سراسر کشور</Typography>
          <Typography gutterBottom>اختلالات موجود (3 مورد)</Typography>
          <Box>
            <StyledAccordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>اختلال در برقراری با سرور های خارج</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  توضیحات مربوط به اختلال در برقراری با سرور های خارج می تواند
                  در این قسمت قرار گیرد. ممکن است شما بخواهید جزئیات بیشتری در
                  مورد این اختلال، دلایل آن یا راه حل های پیشنهادی را در این
                  قسمت ارائه دهید.
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
            <StyledAccordion >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>اختلال در برقراری با سرور های خارج</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  توضیحات مربوط به اختلال در برقراری با سرور های خارج می تواند
                  در این قسمت قرار گیرد. ممکن است شما بخواهید جزئیات بیشتری در
                  مورد این اختلال، دلایل آن یا راه حل های پیشنهادی را در این
                  قسمت ارائه دهید.
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
            <StyledAccordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>اختلال در برقراری با سرور های خارج</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  توضیحات مربوط به اختلال در برقراری با سرور های خارج می تواند
                  در این قسمت قرار گیرد. ممکن است شما بخواهید جزئیات بیشتری در
                  مورد این اختلال، دلایل آن یا راه حل های پیشنهادی را در این
                  قسمت ارائه دهید.
                </Typography>
              </AccordionDetails>
            </StyledAccordion>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}></Grid>
      </Grid>
    </Container>
  );
};

export default NewDashboard;
