import { useState } from "react";

//timeout there to delay _onClick from closing before state is adjusted by onBlur
const Selections = ({ Component, label, state, _onClick, children }) => {
  const [toggle, setToggle] = useState(false);
  const [innerFocus, setInnerFocus] = useState(false);

  return (
    <div className="flex flex-col w-100 justify-between cursor-default">
      <button
        className={`w-full relative px-7   py-1 flex items-center focus:outline-none active:bg-yellow-500 focus:bg-gray-700  
        ${!toggle ? "hover:bg-gray-700" : ""}
        ${!toggle ? "bg-transparent" : "bg-yellow-500 focus:bg-yellow-500"}`}
        onClick={() => setToggle(!toggle)}
        onBlur={() => (!innerFocus ? setToggle(false) : null)}
        onKeyDown={(e) => {
          if (e.shiftKey && e.key === "Tab" && !innerFocus) {
            return setToggle(false), setInnerFocus(false);
          }
          e.key === "Tab" && toggle ? setInnerFocus(true) : null;
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
          !toggle ? "max-h-0 opacity-0 z-0" : "max-h-24"
        }
         `}
        onBlur={(e) => {
          if (
            e.target.parentElement.parentElement !==
            e.relatedTarget?.parentElement?.parentElement
          ) {
            setInnerFocus(false);
            setToggle(false);
          }
        }}
      >
        {children.map((child) => (
          <div
            key={child}
            className={`w-full relative flex-col items-center justify-start text-left ${
              !toggle ? "hidden" : "flex"
            }`}
          >
            <button
              className={`w-full pl-14 py-1 text-left focus:outline-none bg-gray-900 focus:bg-gray-700 active:bg-yellow-500 hover:bg-gray-700 text-sm flex`}
              onClick={() => setTimeout(() => _onClick(), 100)}
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
