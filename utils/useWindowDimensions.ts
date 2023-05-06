import { useEffect, useState } from "react";

// Return windowDimension - object containing current width and height of window
export default function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : 3840;
    const height = hasWindow ? window.innerHeight : 2160;
    return {
      width,
      height,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasWindow]);

  return windowDimensions;
}
