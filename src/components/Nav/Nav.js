import { useState } from "react";
import useTime from "../../hooks/useTime";
import useDate from "../../hooks/useDate";
import { focusEdgeStyle, blurEdgeStyle } from "../../js/windowTopEdge";
import Dropdown from "../Dropdown/Dropdown";

const Nav = () => {
  const [menu, setMenu] = useState(null);

  function hideMenu() {
    if (menu === null) return;
    setMenu(null);
  }

  function makeMenu(e) {
    const rects = e.currentTarget.getBoundingClientRect();
    setMenu(
      <Dropdown stuff={e} rects={rects} caller={e.target.innerText}>
        {" "}
        <div>{"dsdskdjsadlasjdksaasndskasdasadsdsdsassadasd -"}</div>
        <div>{"dsdskdjsadlasjdksaasndskasd -"}</div>
        <div>{"dsdskdjsadlasjdksaasndskasd -"}</div>
        <div>{"dsdskdjsadlasjdksaasndskasd -"}</div>
        <div>{"dsdskdjsadlasjdksaasndskasd -"}</div>
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
          className="border-b-2  border-transparent focus:border-yellow-400 z-40 hover:text-white focus:text-white"
          onBlur={hideMenu}
          onClick={makeMenu}
        >
          <div className="w-32 z-40 flex justify-evenly items-center font-bold   ">
            <span>{useDate()}</span>
            <span>{useTime()}</span>
          </div>
        </button>
      </div>
      <button
        className="pl-3 pr-4 flex items-stretch z-40 last:items-stretch hover:text-white border-b-2 border-transparent focus:border-yellow-400 focus:text-white"
        onFocus={focusEdgeStyle}
        onBlur={(e) => {
          blurEdgeStyle(e);
          hideMenu();
        }}
        onClick={makeMenu}
      >
        <span className="transform rotate-45" style={{ fontSize: "xx-small" }}>
          ◢
        </span>
      </button>
      {/* Right corner */}
      <div className="absolute top-full right-0 z-0 h-4 w-4 bg-yellow-400 hidden" />
      {/* dropdown menu */}
      {menu === null ? null : menu}
    </div>
  );
};

export default Nav;
