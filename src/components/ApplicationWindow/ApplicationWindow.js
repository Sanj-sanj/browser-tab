import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import SettingsApp from "./SettingsApp";
import NewFolderApp from "./NewFolderApp";
import FileSystemApp from "./FileSystemApp";
import IframeApp from "./IframeApp";
import "./ApplicationWindow.modules.css";

const appRoot = document.getElementById("window");

const ApplicationWindow = ({
  src,
  name,
  type,
  dispatch,
  id,
  clearDesktopContext,
  state,
  state: { wifi, background, apps },
}) => {
  //ID gets supplied on creation, use id to alter state.active by filtering.
  const elRef = useRef(null);
  const [toggle, setToggle] = useState(true);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.className =
      "w-full h-full absolute flex justify-center items-center";
    elRef.current.style.top = "1.7rem";
    elRef.current.onclick = clearDesktopContext;
  }

  useEffect(() => {
    appRoot.appendChild(elRef.current);
    if (!toggle) {
      elRef.current.firstChild.style.transform += " scale(0.8)";
      setTimeout(() => {
        dispatch({
          type: "closeApp",
          payload: {
            id: id,
          },
        });
      }, 200);
    }
    return () => {
      appRoot.removeChild(elRef.current);
    };
  }, [toggle]);

  return createPortal(
    <>
      {type === "iframe" ? (
        <IframeApp
          name={name}
          src={src}
          wifi={wifi}
          toggle={toggle}
          setToggle={setToggle}
          clearDesktopContext={clearDesktopContext}
        />
      ) : type === "Settings" ? (
        <SettingsApp
          dispatch={dispatch}
          name={name}
          currentBackground={background}
          toggle={toggle}
          setToggle={setToggle}
        />
      ) : type === "Files" ? (
        <FileSystemApp
          dispatch={dispatch}
          id={id}
          state={state}
          toggle={toggle}
          setToggle={setToggle}
        />
      ) : type === "New Folder" ? (
        <NewFolderApp
          dispatch={dispatch}
          name={name}
          setToggle={setToggle}
          toggle={toggle}
          whichDir={apps.find((app) => app.id === id)?.dir}
        />
      ) : null}
    </>,
    elRef.current
  );
};
export default ApplicationWindow;
