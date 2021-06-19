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
  }
  const setFocus = (fsID) => {
    dispatch({
      type: "isFocused",
      payload: { id: state.apps.find((obj) => obj.id === fsID).id },
    });
  };
  useEffect(() => {
    appRoot.appendChild(elRef.current);
    if (!toggle) {
      // elRef.current.firstChild.style.transform += " scale(0.8)";
      // elRef.current.firstChild.classList.add("animate-pop-in-outside");
      setTimeout(() => {
        dispatch({
          type: "closeApp",
          payload: {
            id: id,
          },
        });
      }, 100);
    }
    return () => {
      appRoot.removeChild(elRef.current);
    };
  }, [toggle]);

  return createPortal(
    <>
      {type === "iframe" ? (
        <IframeApp
          state={state}
          id={id}
          name={name}
          src={src}
          wifi={wifi}
          toggle={toggle}
          setToggle={setToggle}
          clearDesktopContext={clearDesktopContext}
          setFocus={() => setFocus(id)}
        />
      ) : type === "Settings" ? (
        <SettingsApp
          dispatch={dispatch}
          state={state}
          id={id}
          name={name}
          currentBackground={background}
          toggle={toggle}
          setToggle={setToggle}
          setFocus={() => setFocus(id)}
        />
      ) : type === "Files" ? (
        <FileSystemApp
          dispatch={dispatch}
          state={state}
          id={id}
          toggle={toggle}
          setToggle={setToggle}
          setFocus={() => setFocus(id)}
          clearDesktopMenu={clearDesktopContext}
        />
      ) : type === "New Folder" ? (
        <NewFolderApp
          dispatch={dispatch}
          state={state}
          id={id}
          name={name}
          setToggle={setToggle}
          toggle={toggle}
          whichDir={apps.find((app) => app.id === id)?.dir}
          setFocus={() => setFocus(id)}
        />
      ) : null}
    </>,
    elRef.current
  );
};
export default ApplicationWindow;
