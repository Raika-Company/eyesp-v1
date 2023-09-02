import React from "react";
import {
  Box,
  Grid,
  Card,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { PieChart, Pie } from "recharts";

const InfoWithPieChart = ({ color, mainText }) => {
  return (
    <Card sx={{ backgroundColor: "#E8E8E8", padding: "1rem" }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <PieChart width={100} height={100}>
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={50}
              innerRadius={42}
              startAngle={90}
              endAngle={450}
              fill="#FFFFFF"
              paddingAngle={0}
            />
            <Pie
              data={[{ value: 100 }]}
              dataKey="value"
              cx="50%"
              cy="50%"
              startAngle={90}
              endAngle={300}
              outerRadius={50}
              innerRadius={42}
              fill={color}
              paddingAngle={0}
              cornerRadius={40}
            />
          </PieChart>
        </Grid>
        <Grid item xs={9}>
          <Box display="flex" flexDirection="column" alignItems="flex-start">
            <Box display="flex" gap={2}>
              <Select
                value="test"
                size="small"
                sx={{
                  bgcolor: color,
                  color: "white",
                  borderRadius: "1.8rem",
                  border: "none",
                  py: 0,

                  "& fieldset": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value="test">همه</MenuItem>
              </Select>
              <Select
                value="test"
                size="small"
                sx={{
                  bgcolor: color,
                  color: "white",
                  borderRadius: "1.8rem",
                  border: "none",
                  py: 0,

                  "& fieldset": {
                    border: "none",
                  },
                }}
              >
                <MenuItem value="test">سالیانه</MenuItem>
              </Select>
            </Box>
            <Typography color={color} fontSize="2rem">
              {mainText}
            </Typography>
            <Button sx={{ fontSize: "1rem", color: "#9B9B9B" }}>
              مشاهده جزئیات
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default InfoWithPieChart;
