import React from "react";
import { Card, Grid, Typography } from "@mui/material";
import map from "../../app/assets/image/map.png";
import MainBox from "./MainBox";
import iranMap from "./iran.png"

const Dashboard = () => {
  return (
    <Card sx={{width: "95%", height: "50dvh", background: "#E8E8E8", marginX: "auto", marginTop: "1em"}}>
      <Grid container>
        <Grid md={6}>
          <img src={iranMap} alt="iran map"/>
        </Grid>
        <Grid md={6}>

        </Grid>
      </Grid>
    </Card>
  );
};

export default Dashboard;
