import { useState } from "react";
import { mkdir } from "../../js/dispatch";

const NewFolderApp = ({ dispatch, setToggle }) => {
  const [value, setValue] = useState("");

  return (
    <>
      <button
        className={`absolute border border-gray-800 top-0.5 left-1 rounded py-1 px-3  ${
          value
            ? "bg-gray-600 hover:bg-gray-700 text-white"
            : "bg-gray-700 text-gray-500"
        } `}
        onClick={() => {
          mkdir(dispatch, value, () => console.log("customaswell")),
            setToggle(false);
        }}
        disabled={value ? false : true}
      >
        Create
      </button>
      <div className="w-72 py-4 px-0.5 flex justify-center items-center bg-gray-800">
        <input
          className="w-full text-white px-2 rounded focus:outline-none bg-gray-700 border-2 border-transparent focus:border-yellow-500"
          type="text"
          //eslint-disable-next-line
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && e.target.value
              ? (mkdir(dispatch, value, () => console.log("custom")),
                setToggle(false))
              : null
          }
        />
      </div>
    </>
  );
};
export default NewFolderApp;
