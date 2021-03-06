import { useRef, useState } from "react";
import AppButton from "./WindowComponents/AppButton";
import createThumbnails from "../../js/createThumbnails";
import NavAppWindow from "./NavAppWindow";
import Draggable from "react-draggable";
/* eslint-disable */
import Dragisa from "url:../../images/dragisa-sm.jpeg?as=webp";
import Honeycomb from "url:../../images/Honeycomb-sm.jpeg?as=webp";
import Mountain from "url:../../images/mountains-sm.jpeg?as=webp";
import Robot from "url:../../images/robot-sm.jpeg?as=webp";
import Sunset from "url:../../images/sunset-sm.jpeg?as=webp";
import Minimal1 from "url:../../images/min1-sm.jpeg?as=webp";
import Minimal2 from "url:../../images/min2-sm.jpeg?as=webp";
import Sunrise from "url:../../images/sunrise-painting-sm.jpeg?as=webp";
import Pop_Horizon from "url:../../images/pop-horizon-sm.jpeg?as=webp";
/* eslint-enable */

//order effects order in client
const backgrounds = {
  Mountain,
  Honeycomb,
  Pop_Horizon,
  Robot,
  Dragisa,
  Sunset,
  Sunrise,
  Minimal1,
  Minimal2,
};

const SettingsApp = ({
  dispatch,
  name,
  currentBackground,
  setToggle,
  toggle,
  id,
  setFocus,
  state: { isFocused },
}) => {
  const bgsRef = useRef(createThumbnails(dispatch, backgrounds));
  const [fullscreen, setFullscreen] = useState(false);
  return (
    <Draggable
      bounds={"parent"}
      cancel=".exit, button"
      defaultClassName={`${
        toggle ? "animate-pop-out-inside " : "animate-fade-out"
      }`}
      position={fullscreen ? { x: 0, y: 0 } : null}
    >
      <section
        className={`bg-pop-700 flex flex-col border border-pop-900 w-80 sm:w-176 shadow-2xl transition-h-w z-20 rounded-t-md ${
          !toggle ? "opacity-100" : ""
        }`}
        style={{
          width: fullscreen ? "100%" : "  ",
          height: fullscreen ? "100%" : "37rem",
          zIndex: isFocused.id === id ? "30" : "20",
        }}
        role="presentation"
        onContextMenu={(e) => e.preventDefault()}
        onClick={() => setFocus(id)}
      >
        <NavAppWindow
          setToggle={setToggle}
          toggleFullscreen={() => setFullscreen(!fullscreen)}
          name={name}
          thickBar={true}
        />
        <div className="flex flex-col sm:flex-row sm:overflow-auto w-full h-full">
          <section
            className={`flex flex-row overflow-y-hidden overflow-x-scroll sm:overflow-x-hidden ${
              fullscreen ? "w-auto sm:w-60" : "w-auto sm:w-60"
            } sm:flex-col h-auto py-1 bg-pop-850 border-r border-pop-900`}
            style={{ minHeight: "4em" }}
          >
            <AppButton onClick={() => console.log("wip")}>Trash</AppButton>
            <hr className="w-full border-pop-900" />

            <AppButton>Other Locations</AppButton>
          </section>
          <section className="flex flex-col w-full h-full justify-around">
            {" "}
            {/* main view area */}
            <>
              <div className="h-auto p-4   sm:h-72 flex flex-col items-center justify-center">
                <div className="w-52 sm:w-full sm:max-w-sm">
                  <span className="w-auto block bg-pop-900 h-2 text-xs"></span>
                  <img
                    src={backgrounds[currentBackground]}
                    alt="thumbnail of current bg"
                    className="w-52 sm:w-full sm:max-w-sm h-36 sm:h-56"
                  />
                </div>
              </div>
              <div className=" bg-pop-900 h-72 max-h-full overflow-y-scroll ">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 place-items-center">
                  {bgsRef.current}
                </div>
              </div>
            </>
          </section>
        </div>
      </section>
    </Draggable>
  );
};
export default SettingsApp;
