import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { mkdir } from "../../js/dispatch";
import NavAppWindow from "./NavAppWindow";

const NewFolderApp = ({ dispatch, toggle, setToggle, name, whichDir }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    //autofocus on jsx doesnt work, perhaps component is made before injected into the dom via portal?
    // this timeout is here as a workaround to this
    const delayFocus = setTimeout(() => {
      document.querySelector("input.newFolder").focus();
    }, 100);
    return () => clearTimeout(delayFocus);
  }, [dispatch]);

  return (
    <Draggable
      bounds={"parent"}
      cancel=".exit"
      defaultClassName={`${
        toggle ? "animate-pop-out-inside " : "animate-fade-out"
      }`}
    >
      <section
        className={`bg-gray-700 border flex flex-col  border-gray-900 shadow-2xl transition-h-w z-20 rounded-t-md `}
        role="presentation"
        onContextMenu={(e) => e.preventDefault()}
      >
        <NavAppWindow setToggle={setToggle} name={name} thickBar={true} />
        <button
          className={`absolute border border-gray-800 top-1 left-1 rounded py-1 px-3  ${
            value
              ? "bg-gray-600 hover:bg-gray-700 text-white"
              : "bg-gray-700 text-gray-500"
          } `}
          onClick={() => {
            mkdir(dispatch, value, whichDir, () => console.log("customaswell")),
              setToggle(false);
          }}
          disabled={value ? false : true}
        >
          Create
        </button>
        <div className="w-72 py-4 px-0.5 flex justify-center items-center bg-gray-800">
          <input
            className="newFolder w-full text-white px-2 rounded focus:outline-none bg-gray-700 border-2 border-transparent focus:border-yellow-500"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && e.target.value
                ? (mkdir(dispatch, value, whichDir, () =>
                    console.log("custom")
                  ),
                  setToggle(false))
                : null
            }
          />
        </div>
      </section>
    </Draggable>
  );
};
export default NewFolderApp;
