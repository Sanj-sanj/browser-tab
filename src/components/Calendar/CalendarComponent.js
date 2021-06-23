import Calendar from "react-calendar";
import { useState } from "react";

import "./CalendarComponent.modules.css";

const CalendarComponent = () => {
  const today = new Date();
  const [lastActiveDay, setLastActiveDay] = useState(null);

  return (
    <Calendar
      className="text-center text-xs "
      prev2Label={null}
      next2Label={null}
      view="month"
      nextLabel={
        <div className="text-xl p-2 ">
          <span className="hover:bg-gray-600 active:bg-gray-500 flex items-center justify-center w-8 h-8 rounded-md ">
            ▸
          </span>
        </div>
      }
      prevLabel={
        <div className="text-xl p-2">
          <span className="hover:bg-gray-600 active:bg-gray-500 flex items-center justify-center w-8 h-8 rounded-md">
            ◂
          </span>
        </div>
      }
      calendarType="US"
      navigationLabel={({ label }) => {
        // The middle of the arrows where it says month + year, only display month
        return (
          <span className="text-base font-bold">{label.split(" ")[0]}</span>
        );
      }}
      showNeighboringMonth={false}
      tileContent={({ view, date }) => {
        if (view === "month") {
          return (
            <div
              className={`flex justify-center items-center w-full focus:outline-none `}
            >
              <span
                className={`flex justify-center items-center m-px py-2 rounded-full w-8 ${
                  date.getDay() === 0 || date.getDay() === 6
                    ? "text-gray-500"
                    : "text-white"
                } ${
                  date.getDate() === today.getDate() &&
                  date.getMonth() === today.getMonth()
                    ? "bg-yellow-500 hover:bg-yellow-400"
                    : "hover:bg-pop-800 active:bg-pop-900"
                } `}
              >
                {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
              </span>
            </div>
          );
        }
      }}
      onClickDay={(v, e) => {
        e;
        //these classes need to be added by js, they dont work when supplied directly to the span as tailwind focus: state
        const cList = ["hover:bg-pop-900", "bg-pop-900"];
        if (lastActiveDay !== e.target) {
          lastActiveDay //if there is a e.target saved in state, remove > apply cList to new state : apply cList to target
            ? (lastActiveDay.classList.remove(...cList),
              setLastActiveDay(e.target),
              e.target.classList.add(...cList))
            : (setLastActiveDay(e.target), e.target.classList.add(...cList));
        }
      }}
      formatDay={() => {
        //return empty el to overide with our own jsx and styles
        return <span></span>;
      }}
      formatShortWeekday={(locale, date) => {
        return date.toDateString()[0];
      }}
      showFixedNumberOfWeeks={true}
    />
  );
};
export default CalendarComponent;
