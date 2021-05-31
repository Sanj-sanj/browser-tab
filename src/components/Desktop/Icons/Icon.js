import { useState } from "react";
import Bell from "../../svg/Bell";

const Icon = ({ title, Svg, handleDoubleClick }) => {
  const [toggle, setToggle] = useState(false);
  return (
    <button
      className={`relative w-full h-full flex flex-col focus:outline-none justify-center items-center overflow-hidden cursor-default ${
        toggle
          ? "border border-blue-500 bg-blue-400"
          : "border border-transparent bg-transparent "
      }`}
      onDoubleClick={handleDoubleClick}
      onMouseDown={() => setToggle(!toggle)}
      onBlur={() => setToggle(false)}
      onFocus={() => setToggle(true)}
    >
      <span className="absolute text-white flex flex-col items-center px-1.5 top-0 min-h-full justify-evenly max-w-full">
        {Svg ? <Svg /> : <Bell />}
        <span
          className="relative overflow-hidden min-h-full"
          title="THis is an app icon ,llo lda.."
        >
          <p
            className="text-white"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: "2",
              WebkitBoxOrient: "vertical",
            }}
          >
            {title}
          </p>
        </span>
      </span>
    </button>
  );
};
export default Icon;
