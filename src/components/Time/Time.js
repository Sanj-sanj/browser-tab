import useTime from "../../hooks/useTime";
import greeting from "../../js/greeting";
import useDate from "../../hooks/useDate";

const Time = () => {
  const time = useTime();
  const date = useDate(true);
  return (
    <div className="w-full text-center ">
      <h1 className="text-8xl font-light text-gray-300">{time}</h1>
      <h2 className="text-2xl text-gray-200">{date}</h2>
      {/* <h2 className="text-4xl text-gray-200">{greeting(time)}</h2> */}
    </div>
  );
};
export default Time;
