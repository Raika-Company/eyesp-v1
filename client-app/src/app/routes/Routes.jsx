import React, {lazy} from "react";

import SpeedTest from "../../pages/speedtest/SpeedTest";

const NewSpeedTest = lazy(() => import("../../pages/speedtest/NewSpeedTest"));
const Dashboard = lazy(() => import("../../pages/dashboard/Dashboard"));
const Information = lazy(() => import("../../pages/information/Information"));
const OperatorCompare = lazy(() =>
  import("../../pages/ispCompare/OperatorCompare")
);
const ISPPerformance = lazy(() =>
  import("../../pages/ispPerformance/ISPPerformance")
);

const TestHistory = lazy(() => import("../../pages/testHistory/TestHistory"));

const MyISP = lazy(() => import("../../pages/myISP/MyISP"));

const Province = lazy(() => import("../../pages/dashboard/province/Province"));

const Pc = lazy(() => import("../../pages/pc/pc"));

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
    path: "/new-speed-test",
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
    path: "/operator-compare",
    element: <OperatorCompare />,
    title: "Operator compare | TIC Radar",
    description: "Review all your past internet speed tests in one place.",
    keywords: "test history, speed results, past tests",
    robots: "index, follow",
  },
  {
    path: "/isp-performance",
    element: <ISPPerformance />,
    title: "isp performance | TIC Radar",
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

export const mainRoutesPc = [
  {
    path: "/pc",
    element: <Pc />,
    title: " pc | TIC Radar",
  },
];
