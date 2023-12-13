import { useEffect, useState } from "react";

export const useCurrentTimestamp = () => {
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return currentTimestamp;
};
