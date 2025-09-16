import { useEffect, useState } from "react";

const useDimensions = (containerRef: React.RefObject<HTMLElement | null>) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const currentRef = containerRef.current;

    function getDimensions() {
      return {
        height: currentRef?.offsetHeight || 0,
        width: currentRef?.offsetWidth || 0,
      };
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions(getDimensions());
      }
    });

    if (currentRef) {
      resizeObserver.observe(currentRef);
      setDimensions(getDimensions());
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }

      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return dimensions;
};

export default useDimensions;
