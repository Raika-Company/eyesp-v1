import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import NewLogo from "../../app/common/NewLogo";
import HistoryCard from "./HistoryCard";
import moment from "moment-jalaali";
import { useNavigate } from "react-router-dom";
import useDynamicMP from "../../app/hooks/useDynamicMP";
import Carousel from "./Carousel";
import { ContainedButton } from "../../app/common/ContainedButton";

const TEST_RESULTS = "testResults";

const categorizeTests = (tests) => {
  const now = moment().startOf("day");

  const categories = {
    last24Hours: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  };

  tests.forEach((test) => {
    const testDate = moment(test.date, "jYYYY/jM/jD").startOf("day");
    const diffDays = now.diff(testDate.convertToEnglishNumbers, "days");

    if (diffDays < 1) {
      categories.last24Hours.push(test);
    } else if (diffDays < 7) {
      categories.lastWeek.push(test);
    } else if (diffDays < 30) {
      categories.lastMonth.push(test);
    } else {
      categories.older.push(test);
    }
  });

  return categories;
};

const CategorySection = ({ title, category }) => {
  if (!category || category.length === 0) return null;

  return (
    <>
      <Typography color="text.textBlack" variant="h2" mt={3} mb={1}>
        {title}
      </Typography>
      <Carousel itemsToShow={4} itemsToShowSm={1}>
        {category &&
          category.map((result, index) => (
            <HistoryCard key={index} {...result} />
          ))}
      </Carousel>
    </>
  );
};

const NewTestHistory = () => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/");
  };
  const theme = useTheme();
  const isMD = useMediaQuery(theme.breakpoints.up("md"));
  const cardContainerPaddingX = useDynamicMP(390, 1440, 1.75, 4);
  const cardContainerPaddingY = useDynamicMP(390, 1440, 1.19, 3.31);

  const [testHistory, setTestHistory] = useState({
    last24Hours: [],
    lastWeek: [],
    lastMonth: [],
    older: [],
  });

  const updateTestHistory = useCallback(() => {
    const existingResults = JSON.parse(
      localStorage.getItem(TEST_RESULTS) || "[]"
    );
    const categorizedTests = categorizeTests(existingResults);
    setTestHistory(categorizedTests);
  }, []);

  useEffect(() => {
    updateTestHistory();
  }, [updateTestHistory]);

  const sections = useMemo(
    () => [
      { title: "امروز", category: testHistory.last24Hours },
      { title: "هفته گذشته", category: testHistory.lastWeek },
      { title: "ماه گذشته", category: testHistory.lastMonth },
      { title: "تست های گذشته", category: testHistory.older },
    ],
    [testHistory]
  );
  return (
    <Box
      borderRadius="2rem"
      marginTop="1rem"
      marginBottom="4rem"
      paddingX={cardContainerPaddingX}
      paddingY={cardContainerPaddingY}
      backgroundColor="#F7FAFD"
      overflowY="auto"
      overflowX="hidden"
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h1" color="text.textBlack" gutterBottom>
          تست های گذشته
        </Typography>
        <Box display="flex" alignItems="center" gap="1.19rem">
          <ContainedButton
            onClick={handleButtonClick}
            variant="contained"
            bgColor=" #259FDA"
            bgHover="white"
            txtHover=" #259FDA"
            sx={{
              fontSize: "1rem",
            }}
          >
            {" "}
            انجام تست
          </ContainedButton>
          {/* <Button
            component={Link}
            to="/"
            sx={{
              borderRadius: "2rem",
              backgroundColor: "#259FDA",
              paddingX: "2.75rem",
              color: "#ffffff",
            }}
          >
            انجام تست
          </Button> */}
          {isMD ? (
            <>
              <Typography variant="h6" color="text.textBlack">
                آدرس IP :
              </Typography>
              <Typography variant="h6" color="text.textBlack">
                192.168.0.129
              </Typography>
            </>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      {isMD ? (
        <></>
      ) : (
        <Typography variant="h6" color="text.textBlack" marginTop="0.88rem">
          آدرس IP: 192.168.0.129
        </Typography>
      )}
      {sections.map((section, index) => (
        <CategorySection key={index} {...section} />
      ))}
    </Box>
  );
};

export default NewTestHistory;
