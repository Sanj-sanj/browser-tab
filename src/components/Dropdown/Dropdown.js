import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const menuRoot = document.getElementById("menu");

const Dropdown = ({ children, rects, caller }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }
  useEffect(() => {
    menuRoot.appendChild(elRef.current);
    return () => menuRoot.removeChild(elRef.current);
  }, []);

  function getCenteredAsICanGet() {
    let thisMenu;
    caller === "right" ? (thisMenu = 192) : (thisMenu = -500);
    let left = rects.left + thisMenu / 2;
    left = left - rects.width / 2;
    left = Math.max(rects.width, left);
    return (left = Math.min(
      left,
      document.body.clientWidth - thisMenu - rects.width
    ));
  }
  return createPortal(
    <>
      <div
        className={`menuThing mt-1 absolute rounded-lg bg-gray-800 text-white z-50 ${
          caller === "right" ? "w-72" : "w-3/5"
        }`}
        style={{
          left: caller !== "right" ? "20%" : getCenteredAsICanGet(),
          top: rects.bottom + rects.bottom / 2,
          border: "1px solid #111827",
        }}
        role="presentation"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
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
