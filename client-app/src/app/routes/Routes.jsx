import React, { lazy } from 'react';
import SpeedTest from "../../components/speedtest/SpeedTest";
const TestHistory = lazy(() => import("../../components/testHistory/TestHistory"));
const Login = lazy(() => import("../../components/login/Login"));
const Pc = lazy(() => import("../../components/pc/pc"));
const Dashboard = lazy(() => import("../../components/dashboard/Dashboard"));
const Province = lazy(() => import("../../components/dashboard/province/Province"));
const AdminSpeedTest = lazy(() => import("../../components/dashboard/AdminSpeedTest"));
const DetailTest = lazy(() => import("../../components/detailTest/DetailTest"));

export const mainRoutes = [
  {
    path: "/",
    element: <SpeedTest />,
    title: "Speed Test",
    description: "Test your internet speed."
  },
  {
    path: "/test-history",
    element: <TestHistory />,
    title: "Test History",
    description: "View your past test results."
  }
];

export const dashboardRoutes = [
  {
    path: "/",
    element: <Dashboard />,
    title: "Dashboard",
    description: "Admin dashboard."
  },
  {
    path: "/:provinceName",
    element: <Province />,
    title: "Province",
    description: "View province details."
  },
  {
    path: "/speed-test",
    element: <AdminSpeedTest />,
    title: "Admin Speed Test",
    description: "Test speeds as an admin."
  },
  {
    path: "/detail-test",
    element: <DetailTest />,
    title: "Detailed Test",
    description: "Detailed speed test results."
  }
];

export const otherRoutes = [
  {
    path: "/pc",
    element: <Pc />,
    title: "PC Info",
    description: "Information about the PC."
  },
  {
    path: "/login",
    element: <Login />,
    title: "Login",
    description: "Login to the application."
  }
];