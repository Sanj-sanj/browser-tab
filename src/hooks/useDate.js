import { useEffect, useState } from "react";

// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const useDate = () => {
  const [date, setDate] = useState(calcDate);

  useEffect(() => {
    const timer = setInterval(setDate(calcDate), 1000);
    return () => clearInterval(timer);
  });

  function calcDate() {
    const now = new Date();
    const month = months[now.getMonth()];
    const date = now.getDate();
    return `${month} ${date}`;
  }
  return date;
};
export default useDate;
