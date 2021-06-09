import { useState } from "react";
import appIcon from "url:../../../images/application-x-executable.png";
import Draggable from "react-draggable";

const Icon = ({
  title,
  Icon,
  handleDoubleClick,
  handleContextMenu,
  makeContextMenu,
  place,
}) => {
  const [toggle, setToggle] = useState(false);
  // console.log(handleContextMenu);
  return (
    <Draggable
      bounds="parent"
      grid={[112, 112]}
      disabled={place === "activities" || place === "files" ? true : false}
    >
      <button
        className={` p-1 flex flex-col focus:outline-none items-center overflow-hidden cursor-default ${
          place === "activities" ? "rounded w-20 h-20" : "w-28 h-28"
        }
         ${
           toggle
             ? "border border-blue-500 bg-blue-400 hover:bg-blue-400"
             : "border border-transparent bg-transparent hover:bg-gray-500"
         }`}
        onDoubleClick={handleDoubleClick}
        // onTouchEnd={console.log} make a custom event, firsst tap record time stamp, setTimeout > 700ms, after timeout reset timestamp record, before timeout end, execute dblclick
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
          handleContextMenu();
        }}
        title={title}
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
