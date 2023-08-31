import React from "react";
import { Card, Typography } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

const Dashboard = () => {
    return (
        <Card component="section" sx={{width: "90%", height: "40dvh", marginY:"5vw", marginX: "auto"}}>
            <Grid container>
                <Grid xs={12} md={6}>

                </Grid>
                <Grid xs={12} md={6}>
                    <Typography>4 اختلال یافت شد</Typography>
                    <Typography>اختلال در فلان‌جا ●</Typography>
                    <Typography>فلان‌ مشکــل ●</Typography>
                    <Typography>اختلال در فلان‌جا ●</Typography>
                    <Typography>فلان‌ مشکــل ●</Typography>
                    <Typography>اختلال در فلان‌جا ●</Typography>
                    <Typography>فلان‌ مشکــل ●</Typography>
                </Grid>
            </Grid>
        </Card>
    )
}

export default Dashboard;