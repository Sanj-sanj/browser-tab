import { useState, useEffect } from "react";

const Selections = ({ Component, label, close }) => {
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
        className={`w-full relative px-4 py-1 flex items-center focus:outline-none active:bg-yellow-600 focus:bg-gray-700  ${
          toggle ? "hover:bg-gray-700" : ""
        } ${toggle ? "bg-transparent" : "bg-yellow-600 focus:bg-yellow-600"}`}
        onClick={(e) => {
          setToggle(!toggle);
          setPreviousFocus(e.target.parentElement);
        }}
      >
        <span className="mr-2">
          <Component state={toggle} />
        </span>
        <span>{label}</span>
        <span
          className="transform -rotate-45 absolute right-0 mr-4 flex items-center"
          style={{ fontSize: "xx-small" }}
        >
          ◢
        </span>
      </button>
      <div
        className={`w-full relative flex flex-col border-b border-transparent border-t items-center transition-all ease-linear h-0 ${
          toggle ? "h-0" : "h-full border-gray-900"
        }  justify-start text-left`}
      >
        <button
          className={`w-full pl-10 py-1 text-left focus:outline-none bg-gray-900 focus:bg-gray-800 active:bg-yellow-600 hover:bg-gray-800 ${
            toggle ? "hidden" : "flex "
          }`}
          onClick={(e) => {
            e.target.parentNode.childNodes.forEach((node) => {
              e.target === node ? console.log("match") : null;
              close();
            });
          }}
        >
          Some stuff
        </button>
        <button
          className={`w-full pl-10 py-1 text-left focus:outline-none bg-gray-900 focus:bg-gray-800 active:bg-yellow-600 hover:bg-gray-800 ${
            toggle ? "hidden" : "flex "
          }`}
          onClick={(e) => {
            e.target.parentNode.childNodes.forEach((node) => {
              e.target === node ? console.log("match") : null;
              close();
            });
          }}
        >
          Some stuff
        </button>
        <button
          className={`w-full pl-10 py-1 text-left focus:outline-none bg-gray-900 focus:bg-gray-800 active:bg-yellow-600 hover:bg-gray-800 ${
            toggle ? "hidden" : "flex "
          }`}
          onClick={(e) => {
            e.target.parentNode.childNodes.forEach((node) => {
              e.target === node ? console.log("match") : null;
              close();
            });
          }}
        >
          Some stuff
        </button>
      </div>
    </div>
  );
};

export default Selections;
