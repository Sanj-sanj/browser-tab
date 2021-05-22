import { useState, useEffect } from "react";

const Selections = ({ Component, label, state, _onClick, children }) => {
  const [toggle, setToggle] = useState(true);
  const [previousFocus, setPreviousFocus] = useState(null);

  useEffect(() => {
    const listener = (e) => {
      const currentFocus = e.target?.offsetParent?.parentElement; //wtf
      currentFocus !== previousFocus ? setToggle(true) : null;
    };
    const menu = document.querySelector(".menuThing");
    if (menu) {
      menu.addEventListener("click", listener);
    }
  }, [toggle]);

  return (
    <div className="flex flex-col justify-between cursor-default">
      <button
        className={`w-full relative px-7   py-1 flex items-center focus:outline-none active:bg-yellow-600 focus:bg-gray-700  
        ${toggle ? "hover:bg-gray-700" : ""}
        ${toggle ? "bg-transparent" : "bg-yellow-600 focus:bg-yellow-600"}`}
        onClick={(e) => {
          setToggle(!toggle);
          setPreviousFocus(e.target.parentElement);
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
      {toggle ? null : (
        <div
          className={`w-full relative flex flex-col border-b border-transparent border-t items-center transition-all ease-linear h-full justify-start text-left`}
        >
          <button
            className={`w-full  pl-14 py-1 text-left focus:outline-none bg-gray-900 focus:bg-gray-700 active:bg-yellow-600 hover:bg-gray-700 text-sm flex`}
            onClick={_onClick}
          >
            <span className="transform -translate-x-1">{children}</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Selections;
