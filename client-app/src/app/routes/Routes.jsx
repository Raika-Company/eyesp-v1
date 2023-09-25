import React, { lazy } from "react";

import SpeedTest from "../../pages/speedtest/SpeedTest";
import NewSpeedTest from "../../pages/speedtest/NewSpeedTest";

const Dashboard = lazy(() =>
  import("../../pages/dashboard/Dashboard")
);
const Information = lazy(() =>
  import("../../pages/information/Information")
);
const OperatorPerformance = lazy(() =>
  import("../../pages/ispPerformance/OperatorPerformance")
);

const TestHistory = lazy(() =>
  import("../../pages/testHistory/TestHistory")
);

const MyISP = lazy(() => import("../../pages/myISP/MyISP"));

const Province = lazy(() =>
  import("../../pages/dashboard/province/Province")
);

export const mainRoutes = [
  {
    path: "/",
    element: <SpeedTest />,
    title: "Speed Test | TIC Radar",
    description:
      "Test your internet speed with our reliable and fast speed testing tool.",
    keywords:
      "speed test, internet speed, broadband speed, download speed, upload speed",
    robots: "index, follow",
  },
  {
    path: "/new-speedtest",
    element: <NewSpeedTest />,
    title: "Speed Test | TIC Radar",
    description:
      "Test your internet speed with our reliable and fast speed testing tool.",
    keywords:
      "speed test, internet speed, broadband speed, download speed, upload speed",
    robots: "index, follow",
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    title: "Dashboard | TIC Radar",
    description: "Admin dashboard to manage and review system metrics.",
    keywords: "dashboard, admin panel, system metrics",
    robots: "noindex, nofollow", // Preventing search engines from indexing admin pages.
  },
  {
    path: "/information",
    element: <Information />,
    description: "Defining concepts related to the Internet and its disorders.",
    title: "Information | TIC Radar",
    keywords:
      "information, internet, internet speed, broadband speed, download speed, upload speed",
    robots: "index, follow",
  },
  {
    path: "/history",
    element: <TestHistory />,
    title: "Test History | TIC Radar",
    description: "Review all your past internet speed tests in one place.",
    keywords: "test history, speed results, past tests",
    robots: "index, follow",
  },
  {
    path: "/my-isp",
    element: <MyISP />,
    title: "My ISP | TIC Radar",
    description: "Review all your past internet speed tests in one place.",
    keywords: "test history, speed results, past tests",
    robots: "index, follow",
  },
  {
    path: "/operator-performance",
    element: <OperatorPerformance />,
    title: "Operator Performance | TIC Radar",
    description: "Review all your past internet speed tests in one place.",
    keywords: "test history, speed results, past tests",
    robots: "index, follow",
  },
  {
    path: "/dashboard/:provinceName",
    element: <Province />,
    title: "Province Details | TIC Radar",
    description: "Detailed insights into specific province metrics and data.",
    keywords: "province, details, insights, metrics",
    robots: "noindex, nofollow",
  },
];