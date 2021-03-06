import { useState, useEffect } from "react";

const useTime = () => {
  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const timer = setInterval(() => setTime(getTime), 1000);
    return () => clearInterval(timer);
  }, [time]);

  function getTime() {
    const now = new Date();
    const hour = now.getHours();
    const min = now.getMinutes();
    const meridiem = hour <= 12 ? "AM" : "PM";

    const time = `${hour > 12 ? hour - 12 : hour === 0 ? "12" : hour}:${
      min < 10 ? "0" + min : min
    } ${meridiem}`;
    return time;
  }

  return time;
};
export default useTime;
