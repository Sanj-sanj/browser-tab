import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { mkdir, openFiles } from "../../js/dispatch";
import NavAppWindow from "./NavAppWindow";

const NewFolderApp = ({
  dispatch,
  toggle,
  setToggle,
  name,
  whichDir,
  id,
  setFocus,
  state,
}) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    //autofocus on jsx doesnt work, perhaps component is made before injected into the dom via portal?
    // this timeout is here as a workaround to this
    const delayFocus = setTimeout(() => {
      document.querySelector("input.newFolder").focus();
    }, 100);
    return () => clearTimeout(delayFocus);
  }, [dispatch]);

  const handleMakeDir = () => {
    const onDoubleClick = () =>
      openFiles(dispatch, `${whichDir}/${value.replace(/\//g, "_")}`);
    mkdir(dispatch, value.replace(/\//g, "_"), whichDir, onDoubleClick),
      setToggle(false);
  };

  return (
    <Draggable
      bounds={"parent"}
      cancel=".exit"
      defaultClassName={`${
        toggle ? "animate-pop-out-inside " : "animate-fade-out"
      }`}
    >
      <section
        className={`newFolder bg-pop-700 flex flex-col shadow-2xl transition-h-w z-30 rounded-t-md ${
          state.isFocused === id
            ? "border-2 border-yellow-300"
            : "border border-pop-900"
        }`}
        role="presentation"
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => setFocus(id)}
      >
        <NavAppWindow setToggle={setToggle} name={name} thickBar={true} />
        <button
          className={`absolute border border-pop-800 top-1 left-1 rounded py-1 px-3  ${
            value
              ? "bg-pop-700 hover:bg-pop-850 text-white"
              : "bg-pop-700 text-gray-500"
          } `}
          onClick={() => {
            handleMakeDir();
          }}
          disabled={value ? false : true}
        >
          Create
        </button>
        <div className="w-72 py-4 px-0.5 flex justify-center items-center bg-pop-850">
          <input
            className="newFolder w-full text-white px-2 rounded focus:outline-none bg-pop-900 border-2 border-transparent focus:border-yellow-500"
            type="text"
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && e.target.value ? handleMakeDir() : null
            }
          />
        </div>
      </section>
    </Draggable>
  );
};
export default NewFolderApp;
