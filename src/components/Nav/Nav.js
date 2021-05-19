import { useEffect, useRef, useState } from "react";
import useTime from "../../hooks/useTime";
import useDate from "../../hooks/useDate";
import { focusEdgeStyle, blurEdgeStyle } from "../../js/windowTopEdge";
import Dropdown from "../Dropdown/Dropdown";
import Range from "../Dropdown/Range";
import Volume from "../svg/Volume";
import Display from "../svg/Display";
import Selections from "../Dropdown/Selections";
import Wifi from "../svg/Wifi";
import Battery from "../svg/Battery";
import Power from "../svg/Power";
import Setting from "../svg/Setting";

const Nav = () => {
  const [menu, setMenu] = useState(null);
  // const [focused, setFocused] = useState(false);
  const focused = useRef(false);
  let fTimer;

  useEffect(() => {
    const doc = document.body;
    let listner = (e) => {
      // if (e.target.parentElement.className.includes("middleArea")) {
      // if (focused.current?.v.match(/(time|◢)/g)) {
      //   console.log(e);
      //   console.log(focused.current);
      //   console.log(e.target.parentElement.className);
      //   return;
      // }
      hideMenu();
      // setFocused(false);
      return doc.removeEventListener("click", listner);
    };
    if (focused.current) {
      setTimeout(() => doc.addEventListener("click", listner), 500);
    }
    if (!focused.current) {
      return doc.removeEventListener("click", listner);
    }
    return () => doc.removeEventListener("click", listner);
  }, [focused.current]);

  function hideMenu() {
    if (menu === null) return;
    focused.current = null;
    setMenu(null);
  }

  function makeMenu(e, caller) {
    hideMenu();
    const rects = e.currentTarget.getBoundingClientRect();
    setMenu(
      <Dropdown rects={rects} caller={caller}>
        {" "}
        <Range Component={Volume} label={"volume"} max={"100"} />
        <Range Component={Display} label={"display"} max={"10"} />
        <div className="py-3 px-16 ">
          <hr className="w-full border-gray-900" />
        </div>
        <Selections Component={Wifi} label="Wifi" />
        <Selections Component={Battery} label="Battery" />
        <span className="py-3 px-16 ">
          <hr className="w-full border-gray-900" />
        </span>
        <div className="flex justify-between px-4 py-1 hover:bg-gray-700 ">
          <div className="w-full flex items-center">
            <span className="mr-2">
              <Setting />
            </span>
            <span>Settings</span>
          </div>
        </div>
        <Selections Component={Power} label="Power" />
      </Dropdown>
    );
  }

  return (
    <div className="relative w-full h-7 max-h-7 justify-between text-sm flex font-bold bg-gray-900 text-gray-300 text-center">
      <button className="flex items-center ml-1 pl-2 pr-3 font-bold z-40 text-white border-b-2 border-yellow-400">
        Activities
      </button>
      {/* Left corner */}
      <div
        className="absolute z-0 h-4 w-4 bg-yellow-400 "
        style={{ top: "93%", borderTopLeftRadius: "2px" }}
      />

      <div className="w-full h-full flex absolute justify-center ">
        <button
          className="border-b-2  border-transparent transition ease-in focus:border-yellow-400 z-40 hover:text-white focus:text-white"
          // onBlur=  {hideMenu}
          onClick={(e) => {
            makeMenu(e);
            focused.current = { on: true, v: "time" };
          }}
          onFocus={(e) => {
            makeMenu(e);
            focused.current = { on: true, v: "time" };
          }}
        >
          <div className="middleArea w-32 z-40 flex justify-evenly items-center font-bold   ">
            <span>{useDate()}</span>
            <span>{useTime()}</span>
          </div>
        </button>
      </div>
      <button
        className={`pr-3 ml-3 mr-1 w-32  flex items-stretch z-40 last:items-stretch hover:text-white border-b-2 transition ease-in ${
          focused.current?.v === "◢"
            ? "border-yellow-400"
            : "border-transparent"
        }  focus:text-white`}
        onFocus={(e) => {
          makeMenu(e, "right");
          focused.current = { on: true, v: "◢" };
          // setFocused(true);
          // mFoc();
        }}
        // onBlur={(e) => {
        //   blurEdgeStyle(e);
        //   // mBlur();
        // }}
        onClick={(e) => {
          if (menu || focused.current?.on) {
            return;
          }
          // setFocused(true);
          makeMenu(e, "right");
          focused.current = { on: true, v: "◢" };
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
        className={`absolute top-full right-0 z-0 h-4 w-4 transition ease-linear 
        ${focused.current?.v === "◢" ? "bg-yellow-400" : "bg-transparent"}
          `}
        style={{ top: "93%", borderTopRightRadius: "2px" }}
      />
      {/* dropdown menu */}
      {menu === null ? null : menu}
    </div>
  );
};

export default Nav;
