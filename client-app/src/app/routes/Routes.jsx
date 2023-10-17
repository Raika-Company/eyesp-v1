import React, {lazy} from "react";

const SpeedTest = lazy(() => import("../../pages/speedtest/SpeedTest"));
const NewDashboard = lazy(() =>
  import("../../pages/dashboard/newDashboard/NewDashboard")
);
const ConflictDetailsPage = lazy(() =>
  import("../../pages/dashboard/conflictDetails/ConflictDetailsPage")
);

const NewSpeedTest = lazy(() => import("../../pages/speedtest/NewSpeedTest"));
const Information = lazy(() => import("../../pages/information/Information"));
const ISPPerformance = lazy(() =>
  import("../../pages/ispPerformance/ISPPerformance")
);

const TestHistory = lazy(() => import("../../pages/testHistory/TestHistory"));

const MyISP = lazy(() => import("../../pages/myISP/MyISP"));

const Province = lazy(() => import("../../pages/dashboard/province/Province"));

const Pc = lazy(() => import("../../pages/pc/pc"));
const ISPSummery = lazy(() => import("../../pages/ispSummary/ISPSummary"));
const SafePage = lazy(() => import("../../pages/safePage/SafePage"));

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
    element: <NewDashboard />,
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
    path: "/dashboard/conflict-details",
    element: <ConflictDetailsPage />,
    title: "Conflict Details",
    description: "Showing the Details off all conflicts",
    keywords: "conflicts, provinces conflicts",
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
    path: "/isp-summary",
    element: <ISPSummery />,
    title: "Operator summery | TIC Radar",
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
  {
    path: "/safe-page",
    element: <SafePage />,
    title: "isp performance | TIC Radar",
    description: "Review all your past internet speed tests in one place.",
    keywords: "test history, speed results, past tests",
    robots: "noindex, nofollow",
  },
];

export const historyRoute = {
  path: "/history",
  element: <TestHistory />,
  title: "Test History | TIC Radar",
  description: "Review all your past internet speed tests in one place.",
  keywords: "test history, speed results, past tests",
  robots: "index, follow",
};

export const mainRoutesPc = [
  {
    path: "/app",
    element: <Pc />,
    title: " pc | TIC Radar",
  },
];
