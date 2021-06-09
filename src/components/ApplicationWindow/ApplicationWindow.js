import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import Draggable from "react-draggable";
import SettingsApp from "./SettingsApp";
import NewFolderApp from "./NewFolderApp";
import FileSystemApp from "./FileSystemApp";
import IframeApp from "./IframeApp";
import NavAppWindow from "./NavAppWindow";
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
  const [fullscreen, setFullscreen] = useState(false);

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

  //put the nav into each individual component as sub component, right now readability is fucked

  return createPortal(
    <Draggable
      bounds={"parent"}
      cancel=".exit"
      defaultClassName={`${
        toggle ? "animate-pop-out-inside " : "animate-fade-out"
      }`}
      position={fullscreen ? { x: 0, y: 0 } : null}
    >
      <section
        className={`bg-gray-700 border ${
          name === "New Folder" ? "" : "w-80 sm:w-176"
        }  border-gray-900 shadow-2xl transition-h-w z-20 rounded-t-md `}
        style={{
          width: `${fullscreen ? "100%" : ""}`,
          height: `${fullscreen ? "100%" : ""}`,
        }}
        role="presentation"
        onContextMenu={(e) => e.preventDefault()}
      >
        <NavAppWindow
          setToggle={setToggle}
          toggleFullscreen={
            name === "New Folder" ? null : () => setFullscreen(!fullscreen)
          }
          name={name}
        />
        {type === "iframe" ? (
          <IframeApp name={name} src={src} wifi={wifi} />
        ) : type === "Settings" ? (
          <SettingsApp
            dispatch={dispatch}
            backgrounds={backgrounds}
            background={backgrounds[background]}
            fullscreen={fullscreen}
          />
        ) : type === "New Folder" ? (
          <NewFolderApp dispatch={dispatch} setToggle={setToggle} />
        ) : type === "Files" ? (
          <FileSystemApp dispatch={dispatch} id={id} state={state} />
        ) : null}
      </section>
    </Draggable>,
    elRef.current
  );
};
export default ApplicationWindow;
