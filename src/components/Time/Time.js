import useTime from "../../hooks/useTime";
import greeting from "../../js/greeting";

const Time = () => {
  const time = useTime();
  return (
    <div className="w-full text-center ">
      <h1 className="text-9xl font-extrabold text-gray-300">{time}</h1>
      <h2 className="text-6xl text-gray-200">{greeting(time)}</h2>
    </div>
  );
};
export default Time;
