import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import SettingsApp from "./SettingsApp";
import NewFolderApp from "./NewFolderApp";
import FileSystemApp from "./FileSystemApp";
import IframeApp from "./IframeApp";
import "./ApplicationWindow.modules.css";
/* eslint-disable */
import Dragisa from "url:../../images/dragisa-sm.jpeg?as=webp";
import Honeycomb from "url:../../images/Honeycomb-sm.jpeg?as=webp";
import Mountain from "url:../../images/mountains-sm.jpeg?as=webp";
import Robot from "url:../../images/robot-sm.jpeg?as=webp";
import Sunset from "url:../../images/sunset-sm.jpeg?as=webp";
import Minimal1 from "url:../../images/min1-sm.jpeg?as=webp";
import Minimal2 from "url:../../images/min2-sm.jpeg?as=webp";
import Sunrise from "url:../../images/sunrise-painting-sm.jpeg?as=webp";
/* eslint-enable */

const appRoot = document.getElementById("window");
//order effects order in client
const backgrounds = {
  Mountain,
  Honeycomb,
  Robot,
  Dragisa,
  Sunset,
  Sunrise,
  Minimal1,
  Minimal2,
};

const ApplicationWindow = ({
  src,
  name,
  type,
  dispatch,
  id,
  state,
  state: { wifi, background },
}) => {
  //ID gets supplied on creation, use id to alter state.active by filtering.
  const elRef = useRef(null);
  const [toggle, setToggle] = useState(true);

  if (!elRef.current) {
    elRef.current = document.createElement("div");
    elRef.current.className =
      "w-full h-full absolute top-7 flex justify-center items-center";
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
        appRoot.removeChild(elRef.current);
      }, 200);
    }
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
        />
      ) : type === "Settings" ? (
        <SettingsApp
          dispatch={dispatch}
          name={name}
          backgrounds={backgrounds}
          background={backgrounds[background]}
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
          name={name}
        />
      ) : type === "New Folder" ? (
        <NewFolderApp
          dispatch={dispatch}
          name={name}
          setToggle={setToggle}
          toggle={toggle}
        />
      ) : null}
    </>,
    elRef.current
  );
};
export default ApplicationWindow;
