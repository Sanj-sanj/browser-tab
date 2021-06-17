import { useEffect, useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

import useTime from "../../hooks/useTime";
import useDate from "../../hooks/useDate";
import useMenu from "../../hooks/useMenu";
import Volume from "../svg/Volume";
import Wifi from "../svg/Wifi";
import Battery from "../svg/Battery";

const Nav = () => {
  const [menu, makeMenu] = useMenu(clearAndUnfocusMenu);
  const [focused, setFocused] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    const doc = document.body;
    //the keydown will only exit dropdown as long as no menu items are in focus
    let listner = (e) => {
      if (e.key && e?.key !== "Escape") {
        return;
      }
      clearAndUnfocusMenu();
      return doc.removeEventListener("click", listner);
    };
    if (focused && focused !== "left") {
      setTimeout(() => doc.addEventListener("contextmenu", listner), 500);
      setTimeout(() => doc.addEventListener("click", listner), 500);
      setTimeout(() => doc.addEventListener("keydown", listner), 500);
    }
    if (!focused) {
      doc.removeEventListener("contextMenu", listner);
      doc.removeEventListener("click", listner);
      return doc.removeEventListener("keydown", listner);
    }
    return () => {
      doc.removeEventListener("click", listner);
      doc.removeEventListener("keydown", listner);
      doc.removeEventListener("contextMenu", listner);
    };
  }, [focused]);

  function clearAndUnfocusMenu() {
    setFocused(false);
    makeMenu(null);
  }

  return (
    <nav
      className="relative w-full h-7 max-h-7 justify-between text-sm flex font-bold bg-pop-900 text-gray-300 text-center"
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* Left menu */}
      <button
        className={`flex items-center ml-1 pl-2 pr-3 font-bold z-40  focus:outline-none text-white border-b-2 ${
          state.activeView === "Activities" || focused === "left"
            ? " border-yellow-300"
            : "border-transparent"
        }`}
        onFocus={() =>
          focused === "left"
            ? setFocused("left")
            : (clearAndUnfocusMenu(), setFocused("left"))
        }
        onClick={(e) => {
          e.stopPropagation();
          focused === "left" && e.isTrusted
            ? (clearAndUnfocusMenu(), setFocused(false))
            : (clearAndUnfocusMenu(), setFocused("left"));

          dispatch({
            type: "updateActiveView",
            payload: state.activeView === "Desktop" ? "Activities" : "Desktop",
          });
        }}
        onBlur={() => (clearAndUnfocusMenu(), setFocused(false))}
      >
        <span className="transform translate-y-0.5">Activities</span>
      </button>
      {/* Left corner */}
      <div
        className={`absolute z-0 h-4 w-1.5 ${
          state.activeView === "Activities" || focused === "left"
            ? " bg-yellow-300"
            : "bg-transparent"
        }`}
        style={{ top: "93%", borderTopLeftRadius: "4px" }}
      />
      {/* Middle Menu */}
      <div className="w-full h-full flex absolute justify-center ">
        <button
          className={`border-b-2 transition duration-75 ease-in focus:outline-none  
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
          onMouseDown={() => clearAndUnfocusMenu()}
          onKeyDown={(e) => (e.key === "Tab" ? clearAndUnfocusMenu() : null)}
        >
          <div className="w-28 -mx-1 z-40 flex justify-evenly items-center font-bold transform translate-y-0.5">
            <span>{useDate()}</span>
            <span>{useTime()}</span>
          </div>
        </button>
      </div>
      {/* Right Menu */}
      <button
        className={`pr-3 ml-3 mr-1 flex items-center z-40 focus:outline-none last:items-stretch hover:text-white border-b-2 transition duration-75 ease-in ${
          focused === "right" ? "border-yellow-300" : "border-transparent"
        }  focus:text-white`}
        onFocus={(e) => {
          makeMenu(e.currentTarget, "right", state);
          setFocused("right");
        }}
        onMouseDown={() => clearAndUnfocusMenu()}
        onClick={(e) => {
          e.stopPropagation();
          makeMenu(e.currentTarget, "right", state);
          setFocused("right");
        }}
        onKeyDown={(e) => (e.key === "Tab" ? clearAndUnfocusMenu() : null)}
      >
        <span className="flex w-24 pl-1.5 justify-evenly">
          <Wifi state={state?.wifi} />
          <Volume value={state?.volume} />
          <Battery />
        </span>
        <span
          className="transform rotate-45 -translate-y-0.5  "
          style={{ fontSize: "xx-small" }}
        >
          ◢
        </span>
      </button>
      {/* Right corner */}
      <div
        className={`absolute top-full right-0 z-0 h-4 w-1.5 transition duration-75 ease-linear 
        ${focused === "right" ? "bg-yellow-300" : "bg-transparent"}
          `}
        style={{ top: "93%", borderTopRightRadius: "4px" }}
      />
      {/* dropdown menu */}
      {menu === null ? null : menu}
    </nav>
  );
};

export default Nav;
