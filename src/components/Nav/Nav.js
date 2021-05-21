import { useEffect, useState } from "react";
import useTime from "../../hooks/useTime";
import useDate from "../../hooks/useDate";
import Volume from "../svg/Volume";
import Wifi from "../svg/Wifi";
import Battery from "../svg/Battery";
import useMenu from "../../hooks/useMenu";

const Nav = () => {
  const [menu, makeMenu] = useMenu();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const doc = document.body;
    let listner = () => {
      clearAndUnfocusMenu();
      return doc.removeEventListener("click", listner);
    };
    if (focused) {
      setTimeout(() => doc.addEventListener("click", listner), 500);
    }
    if (!focused) {
      return doc.removeEventListener("click", listner);
    }
    return () => doc.removeEventListener("click", listner);
  }, [focused]);

  function clearAndUnfocusMenu() {
    setFocused(false);
    makeMenu(null);
  }

  return (
    <div className="relative w-full h-7 max-h-7 justify-between text-sm flex font-bold bg-gray-900 text-gray-300 text-center">
      {/* Left menu */}
      <button
        className={`flex items-center ml-1 pl-2 pr-3 font-bold z-40 text-white border-b-2 ${
          focused === "left" ? " border-yellow-300" : "border-transparent"
        }`}
        onFocus={() => {
          clearAndUnfocusMenu();
          setFocused("left");
        }}
        onClick={() => {
          clearAndUnfocusMenu();
          setFocused("left");
        }}
        onBlur={clearAndUnfocusMenu}
      >
        Activities
      </button>
      {/* Left corner */}
      <div
        className={`absolute z-0 h-4 w-4 ${
          focused === "left" ? " bg-yellow-300" : "bg-transparent"
        }`}
        style={{ top: "93%", borderTopLeftRadius: "4px" }}
      />
      {/* Middle Menu */}
      <div className="w-full h-full flex absolute justify-center ">
        <button
          className={`border-b-2 transition duration-75 ease-in 
          ${
            focused === "middle" ? "border-yellow-300" : "border-transparent"
          } z-40 hover:text-white focus:text-white`}
          onClick={(e) => {
            e.stopPropagation();
            makeMenu(e.currentTarget, "middle");
            setFocused("middle");
          }}
          onFocus={(e) => {
            makeMenu(e.currentTarget, "middle");
            setFocused("middle");
          }}
        >
          <div className="middleArea w-32 z-40 flex justify-evenly items-center font-bold">
            <span>{useDate()}</span>
            <span>{useTime()}</span>
          </div>
        </button>
      </div>
      {/* Right Menu */}
      <button
        className={`pr-3 ml-3 mr-1 w-32  flex items-stretch z-40 last:items-stretch hover:text-white border-b-2 transition duration-75 ease-in ${
          focused === "right" ? "border-yellow-300" : "border-transparent"
        }  focus:text-white`}
        onFocus={(e) => {
          makeMenu(e.currentTarget, "right");
          setFocused("right");
        }}
        onClick={(e) => {
          e.stopPropagation();
          makeMenu(e.currentTarget, "right");
          setFocused("right");
        }}
      >
        <span className="flex w-full justify-evenly items-center">
          <Wifi />
          <Volume />
          <Battery />
        </span>
        <span className="transform rotate-45" style={{ fontSize: "xx-small" }}>
          ◢
        </span>
      </button>
      {/* Right corner */}
      <div
        className={`absolute top-full right-0 z-0 h-4 w-4 transition duration-75 ease-linear 
        ${focused === "◢" ? "bg-yellow-300" : "bg-transparent"}
          `}
        style={{ top: "93%", borderTopRightRadius: "4px" }}
      />
      {/* dropdown menu */}
      {menu === null ? null : menu}
    </div>
  );
};

export default Nav;
