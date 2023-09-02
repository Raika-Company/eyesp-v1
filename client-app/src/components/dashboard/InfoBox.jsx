import React from "react";
import { Box, Button, Card, Typography } from "@mui/material";
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
const InfoBox = ({header, number, buttonText, color}) => {
    return (
        <Card sx={{backgroundColor: "$E8E8E8", padding: "1rem"}}>
            <Box display="flex" justifyContent="space-between">
                <Typography fontSize="1.15rem" color="#9B9B9B" fontWeight="700">{header}</Typography>
                <WifiOutlinedIcon/>
            </Box>
            <Typography color={color} fontSize="3rem" sx={{marginY: "0.5rem"}}>{number} عدد</Typography>
            <Button sx={{backgroundColor: color, color: "white", borderRadius: "1.8rem", width: "80%", marginX: "10%"}}>{buttonText}</Button>
        </Card>
    )
};

export default InfoBox;