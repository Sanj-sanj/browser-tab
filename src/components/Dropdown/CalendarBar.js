import useDate from "../../hooks/useDate";
import CalendarComponent from "./CalendarComponent";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const CalendarBar = () => {
  const today = new Date();
  const date = useDate();
  let day = days[today.getDay()];
  let year = today.getFullYear();

  return (
    <div className="w-full max-w-xs flex flex-col px-4">
      <div className="w-full mb-6">
        <header className="flex flex-col px-3 w-full text-left ">
          <span className="font-bold ">{day}</span>
          <span className="text-2xl">
            {date} {year}
          </span>
        </header>
      </div>
      <div className="border rounded p-1 border-gray-900 bg-gray-700">
        <CalendarComponent />
      </div>
    </div>
  );
};
export default CalendarBar;
