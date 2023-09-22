import React, { lazy } from "react";

const NewSpeedTest = lazy(() =>
  import("../../pages/newSpeedtest/NewSpeedTest")
);

const Dashboard = lazy(() =>
  import("../../pages/dashboard/Dashboard")
);
const NewInformation = lazy(() =>
  import("../../pages/information/NewInformation")
);
const NewOperatorPerformance = lazy(() =>
  import("../../pages/ispPerformance/NewOperatorPerformance")
);

const TestHistory = lazy(() =>
  import("../../pages/testHistory/TestHistory")
);

const MyISP = lazy(() => import("../../pages/myISP/MyISP"));

const NewProvince = lazy(() =>
  import("../../pages/dashboard/province/NewProvince")
);

// import SpeedTestWorker from "../../pages/newSpeedtest/SpeedTestWorker";

export const mainRoutes = [
  {
    path: "/",
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
    element: <NewInformation />,
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
    element: <NewOperatorPerformance />,
    title: "Operator Performance | TIC Radar",
    description: "Review all your past internet speed tests in one place.",
    keywords: "test history, speed results, past tests",
    robots: "index, follow",
  },
  {
    path: "/dashboard/:provinceName",
    element: <NewProvince />,
    title: "Province Details | TIC Radar",
    description: "Detailed insights into specific province metrics and data.",
    keywords: "province, details, insights, metrics",
    robots: "noindex, nofollow",
  },
  // {
  //   path: "/test",
  //   element: <SpeedTestWorker />
  // }
];