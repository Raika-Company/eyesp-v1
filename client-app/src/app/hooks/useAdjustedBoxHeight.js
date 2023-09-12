import { useEffect, useState, useRef } from "react";

/**
 * Custom hook to calculate the box height considering the navbar height.
 */
const useAdjustedBoxHeight = () => {
  const [boxHeight, setBoxHeight] = useState("100dvh");
  const dashboardNavbarRef = useRef(null);

  useEffect(() => {
    if (dashboardNavbarRef.current) {
      const navbarHeight = dashboardNavbarRef.current.offsetHeight;
      setBoxHeight(`calc(100dvh - ${navbarHeight}px)`);
    }
  }, []);

  return { boxHeight, dashboardNavbarRef };
};

export default useAdjustedBoxHeight;