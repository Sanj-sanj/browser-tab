import { useState } from "react";
import appIcon from "url:../../../images/application-x-executable.png";
import Draggable from "react-draggable";
import useMobileEventHandler from "../../../hooks/useMobileEventHandlers";

const Icon = ({
  title,
  Icon,
  handleDoubleClick,
  handleContextMenu,
  makeContextMenu,
  place,
}) => {
  const [toggle, setToggle] = useState(false);

  const onLongPress = (e) => {
    handleContextMenu(e);
    makeContextMenu(e.targetTouches[0]);
  };
  const [onTouchStart] = useMobileEventHandler(handleDoubleClick, onLongPress);

  return (
    <Draggable
      bounds=".desktopScreen"
      grid={[112, 112]}
      disabled={place === "activities" || place === "files" ? true : false}
    >
      <button
        className={` p-1 flex flex-col focus:outline-none items-center overflow-hidden cursor-default ${
          place === "activities" ? "rounded w-20 h-20" : "w-28 h-28"
        }
         ${
           toggle
             ? "border border-blue-500 bg-blue-400 bg-opacity-60"
             : "border border-transparent bg-transparent hover:bg-gray-500 hover:bg-opacity-60 bg-opacity-70"
         }`}
        onDoubleClick={handleDoubleClick}
        onKeyDown={(e) => (e.key === "Enter" ? handleDoubleClick() : null)}
        onClick={() =>
          place === "activities"
            ? handleDoubleClick()
            : toggle
            ? setToggle(true)
            : setToggle(!toggle)
        }
        onBlur={() => setToggle(false)}
        onFocus={() => setToggle(true)}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          makeContextMenu(e);
          handleContextMenu(e);
          //e is passed for context menu to get rects of icon for modals inside of contextMenu
        }}
        title={title}
        onTouchStart={(e) => {
          e.stopPropagation();
          onTouchStart(e);
        }}
      >
        <span className="text-white">
          {Icon ? <Icon /> : <img src={appIcon} alt="icon" />}
        </span>
        <span
          className="flex overflow-hidden justify-center items-center w-full leading-5"
          style={{ height: "inherit" }}
        >
          <p
            className="text-white text-sm leading-none"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {place === "activities" ? null : title}
          </p>
        </span>
      </button>
    </Draggable>
  );
};
export default Icon;
