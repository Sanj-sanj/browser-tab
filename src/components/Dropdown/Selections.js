import { useState } from "react";

const Selections = ({ Component, label }) => {
  const [toggle, setToggle] = useState(true);

  return (
    <button
      className="flex justify-between px-4 cursor-default py-1 hover:bg-gray-700"
      onClick={(e) => {
        setToggle(!toggle);
      }}
    >
      <div className="w-full flex items-center">
        <span className="mr-2">
          <Component state={toggle} />
        </span>
        <span>{label}</span>
      </div>
      <span
        className="transform -rotate-45 flex items-center"
        style={{ fontSize: "xx-small" }}
      >
        ◢
      </span>
    </button>
  );
};

export default Selections;
