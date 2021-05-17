import useTime from "../../hooks/useTime";
import useDate from "../../hooks/useDate";

const Nav = () => {
  return (
    <div className=" w-full h-7 max-h-7 justify-between text-sm z-30 flex  font-bold bg-gray-900 text-gray-300 text-center  ">
      <button className="flex items-center px-3 font-bold z-40 hover:text-white border-b-2 border-transparent focus:border-yellow-400 focus:text-white">
        Activities
      </button>
      <div className="w-full flex absolute justify-center ">
        <button className="w-32 h-7 z-40 flex justify-evenly items-center font-bold hover:text-white border-b-2 border-transparent focus:border-yellow-400 focus:text-white">
          <span>{useDate()}</span>
          <span>{useTime()}</span>
        </button>
      </div>
      <button className="pl-3 pr-4 flex items-center  z-40 last:items-stretch hover:text-white border-b-2 border-transparent focus:border-yellow-400 focus:text-white ">
        <span className="transform rotate-45 text-xs">◢</span>
      </button>
    </div>
  );
};

export default Nav;
