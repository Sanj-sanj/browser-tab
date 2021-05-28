import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const menuRoot = document.getElementById("menu");

const Dropdown = ({ children, rects, caller }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    const focus = (e) => {
      if (e.key === "ArrowDown") {
        let menu = document.querySelector(".menuThing");
        //this lets us focus the div by faking text editing, focusing text, then removing editing
        menu.contentEditable = true;
        menu.focus();
        menu.contentEditable = false;
      }
    };
    document.addEventListener("keydown", focus);

    menuRoot.appendChild(elRef.current);
    return () => {
      document.removeEventListener("keydown", focus);

      menuRoot.removeChild(elRef.current);
    };
  }, []);

  return createPortal(
    <>
      <div
        className={`menuThing mt-1 absolute rounded-lg bg-gray-800 text-white z-50 max-w-full animate-bounce-in ${
          caller === "right" ? "w-72" : "w-4/5 sm:w-3/5 left-1/10 sm:left-1/5"
        }`}
        style={{
          right: caller === "right" ? "1%" : "",
          top: rects.bottom + rects.bottom / 2,
          border: "1px solid #111827",
        }}
        role="presentation"
        //stopProp to prevent closing nav on click
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
      >
        <span
          className="absolute bg-gray-800 w-4 h-4 transform rotate-45 "
          style={{
            top: (rects.bottom / 3) * -1,
            right: caller === "right" ? rects.width / 2 : "49%",
            borderLeft: "1px solid #111827",
            borderTop: "1px solid #111827",
          }}
        ></span>
        <div className="overflow-hidden flex flex-col py-4">{children}</div>{" "}
      </div>
    </>,
    elRef.current
  );
};
export default Dropdown;
