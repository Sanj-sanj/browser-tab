import useDate from "../../hooks/useDate";
import CalendarComponent from "../Calendar/CalendarComponent";
import Weather from "../Weather/Weather";

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
    <div className="relative w-full flex flex-col max-w-xs px-4">
      <section className="flex flex-col items-end text-right">
        <div className="w-full mb-2 sm:mb-6">
          <header className="flex flex-col px-3 w-full text-left">
            <span className="font-bold">{day}</span>
            <span className="text-2xl">
              {date} {year}
            </span>
          </header>
        </div>
        <div className="border rounded-md p-1 border-pop-900  bg-pop-700">
          <CalendarComponent />
        </div>
      </section>
      <Weather />
    </div>
  );
};
export default CalendarBar;
