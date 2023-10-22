import React, {useEffect, useState} from "react";
import {Box, Typography, useMediaQuery, useTheme} from "@mui/material";

/**
 * Generates styles for the XAxisLine component.
 * @param {boolean} isSmScreen A flag indicating if the screen size is small.
 * @returns {Object} The styles object.
 */
const useStyles = (isSmScreen) => {
  const theme = useTheme();

  return {
    container: {
      display: "flex",
      gap: ".5rem",
      position: "absolute",
      right: "-0.7rem",
      bottom: "0.2rem",
    },
    innerContainer: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: ".5rem",
    },
    line: {
      width: isSmScreen ? "15.6rem" : "35.5rem",
      background: theme.palette.mode === "dark" ? "#C9C9C9" : "#aaaa",
      borderRadius: ".5rem",
      height: "0.3rem", // default value; can be overridden by props
    },
    valuesContainer: {
      display: "flex",
      justifyContent: "space-evenly",
      width: "100%",
    },
    valueBox: {
      textAlign: "center",
      color: theme.palette.mode === "dark" ? "#fffa" : "#777",
    },
  };
};

/**
 * Renders a horizontal axis line with associated values.
 *
 * @param {Object} props The component properties.
 * @param {number} props.max The maximum value on the x-axis.
 * @param {string} props.unit The unit of measurement.
 * @param {string} props.height The height of the x-axis line.
 * @returns {React.ReactNode} The XAxisLine component.
 */
const XAxisLine = ({max, unit, height = "0.3rem", selectedIds}) => {
  const [tableData, setTableData] = useState([]);
  const theme = useTheme();
  const isSmScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const styles = useStyles(isSmScreen);

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("testResults") || "[]"
    );
    setTableData(localStorageData);
  }, []);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.innerContainer}>
        <div style={{...styles.line, height}}></div>
        <ValuesDisplay
          data={tableData.filter((item, index) =>
            selectedIds.includes(String(index))
          )}
          styles={styles}
        />
      </Box>
    </Box>
  );
};

const ValuesDisplay = ({data, styles}) => (
  <Box sx={styles.valuesContainer}>
    {data.map((value) => (
      <Box key={value.time + value.date} sx={styles.valueBox}>
        <Typography>{value.time}</Typography>
        <Typography>{value.date}</Typography>
      </Box>
    ))}
  </Box>
);

export default XAxisLine;
