import useTime from "../../hooks/useTime";
import greeting from "../../js/greeting";
import { UserContext } from "../../context/UserContext";

const Time = () => {
  const time = useTime();
  return (
    <UserContext.Consumer>
      {({ state }) => (
        <div className="w-full text-center ">
          <h1 className="text-9xl font-extrabold text-gray-300">{time}</h1>
          <p>{state.user}</p>
          <h2 className="text-6xl text-gray-200">{greeting(time)}</h2>
        </div>
      )}
    </UserContext.Consumer>
  );
};
export default Time;
