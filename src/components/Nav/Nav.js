import useTime from "../../hooks/useTime";
import useDate from "../../hooks/useDate";

const Nav = () => {
  function focusEdgeStyle(e) {
    e.target.nextSibling.classList.remove("hidden");
    e.target.nextSibling.classList.add("inline-block");
  }
  function blurEdgeStyle(e) {
    e.target.nextSibling.classList.remove("inline-block");
    e.target.nextSibling.classList.add("hidden");
  }

  return (
    <div className="relative w-full h-7 max-h-7 justify-between text-sm flex font-bold bg-gray-900 text-gray-300 text-center  ">
      <button
        className="flex items-center px-3 font-bold z-40 hover:text-white border-b-2 border-transparent focus:border-yellow-400 focus:text-white"
        onFocus={focusEdgeStyle}
        onBlur={blurEdgeStyle}
      >
        Activities
      </button>
      <div className="absolute top-full z-0 h-4 w-4 bg-yellow-400 hidden "></div>
      <div className="w-full flex absolute justify-center ">
        <button className="w-32 h-7 z-40 flex justify-evenly items-center font-bold hover:text-white border-b-2 border-transparent focus:border-yellow-400 focus:text-white">
          <span>{useDate()}</span>
          <span>{useTime()}</span>
        </button>
      </div>
      <button
        className="pl-3 pr-4 flex items-stretch z-40 last:items-stretch hover:text-white border-b-2 border-transparent focus:border-yellow-400 focus:text-white"
        onFocus={focusEdgeStyle}
        onBlur={blurEdgeStyle}
      >
        <span className="transform rotate-45" style={{ fontSize: "xx-small" }}>
          ◢
        </span>
      </button>
      <div className="absolute top-full right-0 z-0 h-4 w-4 bg-yellow-400 hidden"></div>
    </div>
  );
};

export default Nav;
