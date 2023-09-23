import { useState, useEffect } from 'react';

/**
 * useDynamicMP
 *
 * @param {number} minScreen Minimum screen size (in pixels).
 * @param {number} maxScreen Maximum screen size (in pixels).
 * @param {number} minRem Minimum padding value (in rem).
 * @param {number} maxRem Maximum padding value (in rem).
 * @returns {string} Calculated padding value (in pixels).
 */
const useDynamicMP = (minScreen, maxScreen, minRem, maxRem) => {
  const [padding, setPadding] = useState(`${minRem}rem`);

  useEffect(() => {
    const updatePadding = () => {
      let vw = window.innerWidth;

      if (vw <= minScreen) {
        setPadding(`${minRem}rem`);
      } else if (vw >= maxScreen) {
        setPadding(`${maxRem}rem`);
      } else {
        let dynamicValue = minRem + (maxRem - minRem) * (vw - minScreen) / (maxScreen - minScreen);
        setPadding(`${dynamicValue}rem`);
      }
    }

    // Initial calculation
    updatePadding();

    // Add event listener for window resize
    window.addEventListener('resize', updatePadding);

    // Cleanup - remove the listener when the component unmounts
    return () => window.removeEventListener('resize', updatePadding);
  }, [minScreen, maxScreen, minRem, maxRem]);

  return padding;
}

export default useDynamicMP;
