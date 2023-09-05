export const mainRoutes = [
    {
      path: "/",
      element: <SpeedTest />,
      title: "Speed Test | My App",
      description: "Test your internet speed with our reliable and fast speed testing tool.",
      keywords: "speed test, internet speed, broadband speed, download speed, upload speed",
      robots: "index, follow"
    },
    {
      path: "/test-history",
      element: <TestHistory />,
      title: "Test History | My App",
      description: "Review all your past internet speed tests in one place.",
      keywords: "test history, speed results, past tests",
      robots: "index, follow"
    }
  ];
  
  export const dashboardRoutes = [
    {
      path: "/",
      element: <Dashboard />,
      title: "Dashboard | Admin",
      description: "Admin dashboard to manage and review system metrics.",
      keywords: "dashboard, admin panel, system metrics",
      robots: "noindex, nofollow" // Preventing search engines from indexing admin pages.
    },
    {
      path: "/:provinceName",
      element: <Province />,
      title: "Province Details | Admin",
      description: "Detailed insights into specific province metrics and data.",
      keywords: "province, details, insights, metrics",
      robots: "noindex, nofollow"
    },
    {
      path: "/speed-test",
      element: <AdminSpeedTest />,
      title: "Admin Speed Test | Admin",
      description: "Admin tool for testing internet speeds.",
      keywords: "admin, speed test, tools",
      robots: "noindex, nofollow"
    },
    {
      path: "/detail-test",
      element: <DetailTest />,
      title: "Detailed Test | Admin",
      description: "In-depth analysis of specific speed tests.",
      keywords: "detailed test, speed analysis, admin tools",
      robots: "noindex, nofollow"
    }
  ];
  
  export const otherRoutes = [
    {
      path: "/pc",
      element: <Pc />,
      title: "PC Info | My App",
      description: "Get insights into your PC's configurations and details.",
      keywords: "PC info, system details, configurations",
      robots: "index, follow"
    },
    {
      path: "/login",
      element: <Login />,
      title: "Login | My App",
      description: "Securely login to access your personalized features and data.",
      keywords: "login, user access, secure login",
      robots: "noindex, nofollow" // You typically don't want your login page to be indexed.
    }
  ];
  