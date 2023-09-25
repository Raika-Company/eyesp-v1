import React, { lazy } from "react";

/**
 * Utility function to lazy load components based on the given path.
 * @param {string} path - The path to the component.
 * @returns {React.LazyExoticComponent} - A lazy-loaded component.
 */

// Utility function to lazy load components
const lazyLoad = (path) => lazy(() => import(`../../pages/${path}`));

const SpeedTest = lazyLoad("speedtest/SpeedTest");
const Dashboard = lazyLoad("dashboard/Dashboard");
const Information = lazyLoad("information/Information");
const OperatorPerformance = lazyLoad("ispPerformance/OperatorPerformance");
const TestHistory = lazyLoad("testHistory/TestHistory");
const MyISP = lazyLoad("myISP/MyISP");
const Province = lazyLoad("dashboard/province/Province");

/**
 * Creates a route object for use within the routing system.
 * @param {string} path - The URL path for the route.
 * @param {React.ComponentType} component - The component to render at this path.
 * @param {string} title - The title for the route.
 * @param {string} description - The description for the route.
 * @param {string} keywords - The SEO keywords for the route.
 * @param {string} robots - The robots meta tag content for the route.
 * @returns {Object} - A route object.
 */
const createRoute = (
  path,
  component,
  title,
  description,
  keywords,
  robots
) => ({
  path,
  element: React.createElement(component),
  title: `${title} | TIC Radar`,
  description,
  keywords,
  robots,
});

/**
 * An array of main routes for the application.
 * @type {Array<Object>}
 */
export const mainRoutes = [
  createRoute(
    "/",
    SpeedTest,
    "Speed Test",
    "Test your internet speed with our reliable and fast speed testing tool.",
    "speed test, internet speed, broadband speed, download speed, upload speed",
    "index, follow"
  ),
  createRoute(
    "/dashboard",
    Dashboard,
    "Dashboard",
    "Admin dashboard to manage and review system metrics.",
    "dashboard, admin panel, system metrics",
    "noindex, nofollow"
  ),
  createRoute(
    "/information",
    Information,
    "Information",
    "Defining concepts related to the Internet and its disorders.",
    "information, internet, internet speed, broadband speed, download speed, upload speed",
    "index, follow"
  ),
  createRoute(
    "/history",
    TestHistory,
    "Test History",
    "Review all your past internet speed tests in one place.",
    "test history, speed results, past tests",
    "index, follow"
  ),
  createRoute(
    "/my-isp",
    MyISP,
    "My ISP",
    "Review all your past internet speed tests in one place.",
    "test history, speed results, past tests",
    "index, follow"
  ),
  createRoute(
    "/operator-performance",
    OperatorPerformance,
    "Operator Performance",
    "Review all your past internet speed tests in one place.",
    "test history, speed results, past tests",
    "index, follow"
  ),
  createRoute(
    "/dashboard/:provinceName",
    Province,
    "Province Details",
    "Detailed insights into specific province metrics and data.",
    "province, details, insights, metrics",
    "noindex, nofollow"
  ),
];