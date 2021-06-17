import { useEffect, useState } from "react";

// const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const useDate = (fullFormat) => {
  const [date, setDate] = useState(calcDate);

  useEffect(() => {
    const timer = setInterval(setDate(calcDate), 1000);
    return () => clearInterval(timer);
  });

  function calcDate() {
    const now = new Date();
    const month = fullFormat
      ? months[now.getMonth()]
      : months[now.getMonth()].slice(0, 3);
    const date = now.getDate();
    return `${month} ${date}`;
  }
  if (fullFormat) {
    const today = new Date();
    const day = days[today.getDay()];
    return `${day} ${date}`;
  }
  return date;
};
export default useDate;
