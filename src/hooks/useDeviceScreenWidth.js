import React from "react";

export default function useDeviceScreenWidth() {
  const getWidth = React.useCallback(() => window.innerWidth, []);
  const [width, setWidth] = React.useState(window.innerWidth);

  React.useEffect(() => {

    function handleScreenWidth() {
      setWidth(window.innerWidth);
    };

    function resizeDevice() {
      setTimeout(handleScreenWidth(), 2000);
    };

    window.addEventListener('resize', resizeDevice);
    return () => window.removeEventListener('resize', resizeDevice);
  }, [getWidth]);

  return width;
}