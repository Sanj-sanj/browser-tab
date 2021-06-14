import { useEffect, useState } from "react";

const Rename = ({ clickHandler, close }) => {
  const [value, setValue] = useState("");

  const onClick = () => (value ? (clickHandler(value), close()) : null);

  useEffect(() => {
    let focusTimeout = setTimeout(() => {
      document.querySelector("input.renameInput").focus();
    }, 100);
    return () => clearTimeout(focusTimeout);
  });

  return (
    <div className="px-2 flex w-72 flex-col ">
      <span>Rename this</span>
      <span className="flex justify-between mt-1">
        <input
          className="renameInput text-sm py-1 px-2 w-8/12 focus:outline-none border border-transparent focus:border-yellow-300 bg-gray-900"
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => (e.key === "Enter" ? onClick() : null)}
        />
        <button
          className="border py-1 px-2 text-sm bg-gray-800 border-gray-900"
          onClick={onClick}
        >
          Rename
        </button>
      </span>
    </div>
  );
};
export default Rename;
