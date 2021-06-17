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
      {/* {console.log(rects)} */}
      <div
        className={`menuThing mt-1 absolute rounded-lg bg-pop-850 text-white z-50 max-w-full animate-bounce-in ${
          caller === "right"
            ? "w-72"
            : caller === "middle"
            ? "w-4/5 sm:w-3/5 left-1/10 sm:left-1/5"
            : caller === "file system"
            ? "w-40"
            : ""
        }`}
        style={{
          right: caller === "right" ? "1%" : "",
          left:
            caller === "rename" || caller === "file system" ? rects.left : "",
          top:
            caller === "rename"
              ? rects.top
              : caller === "file system"
              ? rects.bottom + 16
              : rects.bottom + rects.bottom / 2,
          border: "1px solid #252220",
        }}
        role="presentation"
        //stopProp to prevent closing nav on click
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          e.stopPropagation();
        }}
      >
        <span
          className="absolute bg-pop-850 w-4 h-4 transform rotate-45 "
          style={{
            top:
              caller === "rename"
                ? "-10%"
                : caller === "file system"
                ? "-13%"
                : (rects.bottom / 3) * -1,
            right:
              caller === "right"
                ? rects.width / 2
                : caller === "middle"
                ? "49%"
                : "",
            left: caller === "rename" || caller === "file system" ? "9%" : "",
            borderLeft: "1px solid #252220",
            borderTop: "1px solid #252220",
          }}
        ></span>
        <div className="overflow-hidden flex flex-col py-4">{children}</div>{" "}
      </div>
    </>,
    elRef.current
  );
};
export default Dropdown;
