import { useState } from "react";

//first timeout there to delay onBlur from closing, this lets user open next menu
//second timeoute there to delay _onClick from closing before state is adjusted by onBlur
const Selections = ({ Component, label, state, _onClick, children }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <div className="flex flex-col justify-between cursor-default">
      <button
        className={`w-full relative px-7   py-1 flex items-center focus:outline-none active:bg-yellow-500 focus:bg-gray-700  
        ${toggle ? "hover:bg-gray-700" : ""}
        ${toggle ? "bg-transparent" : "bg-yellow-500 focus:bg-yellow-500"}`}
        onClick={() => {
          setToggle(!toggle);
        }}
        onBlur={() => {
          setTimeout(() => setToggle(true), 200);
        }}
      >
        <span className="mr-2">
          <Component state={state} />
        </span>
        <span className="text-sm">{label}</span>
        <span
          className="transform -rotate-45 -translate-y-0.5 absolute right-0 mr-8 flex items-center"
          style={{ fontSize: "xx-small" }}
        >
          ◢
        </span>
      </button>
      <div
        className={` border-b border-transparent border-t ease-in transition-all max-h-0 ${
          toggle ? "max-h-0 opacity-0 z-0" : "max-h-24"
        }
         `}
      >
        {children.map((child) => (
          <div
            key={child}
            className={`w-full relative flex-col items-center justify-start text-left ${
              toggle ? "hidden" : "flex"
            }`}
          >
            <button
              className={`w-full pl-14 py-1 text-left focus:outline-none bg-gray-900 focus:bg-gray-700 active:bg-yellow-500 hover:bg-gray-700 text-sm flex`}
              onClick={() => {
                setTimeout(() => _onClick(), 50);
              }}
            >
              <span className="transform -translate-x-1">{child}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Selections;
